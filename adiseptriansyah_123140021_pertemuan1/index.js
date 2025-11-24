var taskForm = document.getElementById('task-form');
var taskNameInput = document.getElementById("task-name");
var taskCourseInput = document.getElementById('task-course');
var taskDeadlineInput = document.getElementById('task-deadline');
var deadlinePreview = document.getElementById('deadline-format-preview');
var taskList = document.getElementById('task-list');
var filterStatusSelect = document.getElementById('filter-status');
var incompleteCountSpan = document.getElementById('incomplete-count');
var toggleCourseListBtn = document.getElementById('toggle-course-list-btn');
var courseSuggestions = document.getElementById('course-suggestions');
var courseListDropdown = document.getElementById('course-list-dropdown');
var searchCourseInput = document.getElementById('search-course-input');
var toggleSearchListBtn = document.getElementById('toggle-search-list-btn');
var searchCourseDropdown = document.getElementById('search-course-dropdown');
var monthYearDisplay = document.getElementById('month-year-display');
var calendarGrid = document.getElementById('calendar-grid');
var prevMonthBtn = document.getElementById('prev-month-btn');
var nextMonthBtn = document.getElementById('next-month-btn');
var filterInfo = document.getElementById('filter-info');
var clearDateFilterBtn = document.getElementById('clear-date-filter-btn');

var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
var currentDate = new Date();
var selectedDateFilter = null;
var selectedCourseFilter = 'all';

function formatDate(dateString) {
    if (!dateString) return '';
    var parts = dateString.split('-');
    var year = parts[0];
    var month = parts[1];
    var day = parts[2];
    var shortYear = year.substring(2);
    return day + '/' + month + '/' + shortYear;
}

function saveDataAndRefreshUI() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    updateCourseSuggestions();
    updateSearchCourseDropdown();
    renderCalendar();
}

function getUniqueCourses() {
    var uniqueCourses = [];
    for (var i = 0; i < tasks.length; i++) {
        var course = tasks[i].course;
        if (uniqueCourses.indexOf(course) === -1) {
            uniqueCourses.push(course);
        }
    }
    return uniqueCourses;
}

function updateCourseSuggestions() {
    courseSuggestions.innerHTML = '';
    courseListDropdown.innerHTML = '';
    var uniqueCourses = getUniqueCourses();

    if (uniqueCourses.length === 0) {
        courseListDropdown.innerHTML = '<div>Belum ada mata kuliah.</div>';
    }

    for (var i = 0; i < uniqueCourses.length; i++) {
        var course = uniqueCourses[i];
        var option = document.createElement('option');
        option.value = course;
        courseSuggestions.appendChild(option);

        var div = document.createElement('div');
        div.textContent = course;
        div.addEventListener('click', function(e) {
            taskCourseInput.value = e.target.textContent;
            courseListDropdown.classList.remove('show');
        });
        courseListDropdown.appendChild(div);
    }
}

function updateSearchCourseDropdown() {
    searchCourseDropdown.innerHTML = '';
    var uniqueCourses = getUniqueCourses();

    var allOption = document.createElement('div');
    allOption.textContent = 'Semua Mata Kuliah';
    allOption.addEventListener('click', function() {
        selectedCourseFilter = 'all';
        searchCourseInput.value = 'Semua Mata Kuliah';
        searchCourseDropdown.classList.remove('show');
        renderTasks();
    });
    searchCourseDropdown.appendChild(allOption);

    for (var i = 0; i < uniqueCourses.length; i++) {
        var course = uniqueCourses[i];
        var div = document.createElement('div');
        div.textContent = course;
        div.addEventListener('click', function(e) {
            selectedCourseFilter = e.target.textContent;
            searchCourseInput.value = e.target.textContent;
            searchCourseDropdown.classList.remove('show');
            renderTasks();
        });
        searchCourseDropdown.appendChild(div);
    }
}

function renderTasks() {
    taskList.innerHTML = '';

    // --- BARIS YANG DITAMBAHKAN ---
    // Mengurutkan array 'tasks' berdasarkan tanggal deadline
    tasks.sort(function(a, b) {
        return a.deadline.localeCompare(b.deadline);
    });
    // -----------------------------

    var filterStatus = filterStatusSelect.value;
    var filteredTasks = [];
    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        var matchesCourse = (selectedCourseFilter === 'all' || task.course === selectedCourseFilter);
        var matchesStatus = (filterStatus === 'all') || (filterStatus === 'complete' && task.isComplete) || (filterStatus === 'incomplete' && !task.isComplete);
        var matchesDate = !selectedDateFilter || (task.deadline === selectedDateFilter);
        if (matchesCourse && matchesStatus && matchesDate) {
            filteredTasks.push(task);
        }
    }

    if (selectedDateFilter) {
        filterInfo.textContent = '(Tugas untuk ' + formatDate(selectedDateFilter) + ')';
        clearDateFilterBtn.classList.remove('hidden');
    } else {
        filterInfo.textContent = '';
        clearDateFilterBtn.classList.add('hidden');
    }

    var groupedTasks = {};
    for (var i = 0; i < filteredTasks.length; i++) {
        var task = filteredTasks[i];
        if (!groupedTasks[task.course]) {
            groupedTasks[task.course] = [];
        }
        groupedTasks[task.course].push(task);
    }

    var courses = Object.keys(groupedTasks);
    if (courses.length === 0) {
        taskList.innerHTML = '<li>Tidak ada tugas.</li>';
    } else {
        for (var i = 0; i < courses.length; i++) {
            var courseName = courses[i];
            var tasksInGroup = groupedTasks[courseName];
            var groupContainer = document.createElement('li');
            groupContainer.className = 'course-group-item';
            groupContainer.innerHTML = '<div class="course-header">' + courseName + '</div>';
            var innerList = document.createElement('ul');

            for (var j = 0; j < tasksInGroup.length; j++) {
                var task = tasksInGroup[j];
                var li = document.createElement('li');
                li.className = 'task-item ' + (task.isComplete ? 'complete' : '');
                li.setAttribute('data-id', task.id);
                li.innerHTML =
                    '<div class="task-details">' +
                    '<h3>' + task.name + '</h3>' +
                    '<p><strong>Deadline:</strong> ' + formatDate(task.deadline) + '</p>' +
                    '</div>' +
                    '<div class="task-actions">' +
                    '<button class="complete-btn">' + (task.isComplete ? 'Batal' : 'Selesai') + '</button>' +
                    '<button class="delete-btn">Hapus</button>' +
                    '</div>';
                innerList.appendChild(li);
            }
            groupContainer.appendChild(innerList);
            taskList.appendChild(groupContainer);
        }
    }
    updateIncompleteCount();
}

function updateIncompleteCount() {
    var count = 0;
    for (var i = 0; i < tasks.length; i++) {
        if (!tasks[i].isComplete) {
            count++;
        }
    }
    incompleteCountSpan.textContent = count;
}

function addTask(e) {
    e.preventDefault();
    var name = taskNameInput.value.trim();
    var course = taskCourseInput.value.trim();
    var deadline = taskDeadlineInput.value;

    if (!name || !course || !deadline) {
        return alert('Semua kolom wajib diisi!');
    }
    tasks.push({ id: Date.now(), name: name, course: course, deadline: deadline, isComplete: false });
    saveDataAndRefreshUI();
    taskForm.reset();
    deadlinePreview.textContent = '';
}

function handleTaskAction(e) {
    var target = e.target;
    var taskItem = target;
    while (taskItem && !taskItem.classList.contains('task-item')) {
        taskItem = taskItem.parentElement;
    }
    if (!taskItem) return;

    var taskId = Number(taskItem.getAttribute('data-id'));
    
    if (target.classList.contains('complete-btn')) {
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].id === taskId) {
                tasks[i].isComplete = !tasks[i].isComplete;
                break;
            }
        }
    }
    
    if (target.classList.contains('delete-btn')) {
        if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
            var newTasksArray = [];
            for (var i = 0; i < tasks.length; i++) {
                if (tasks[i].id !== taskId) {
                    newTasksArray.push(tasks[i]);
                }
            }
            tasks = newTasksArray;
        }
    }
    saveDataAndRefreshUI();
}

function renderCalendar() {
    calendarGrid.innerHTML = '';
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth();
    var monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    monthYearDisplay.textContent = monthNames[month] + ' ' + year;

    var firstDayOfMonth = new Date(year, month, 1).getDay();
    var lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    var today = new Date();

    var dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    for (var i = 0; i < dayNames.length; i++) {
        var dayEl = document.createElement('div');
        dayEl.className = 'day-name';
        dayEl.textContent = dayNames[i];
        calendarGrid.appendChild(dayEl);
    }
    
    for (var i = 0; i < firstDayOfMonth; i++) {
        var emptyCell = document.createElement('div');
        emptyCell.className = 'date-cell empty';
        calendarGrid.appendChild(emptyCell);
    }

    for (var i = 1; i <= lastDateOfMonth; i++) {
        var dateCell = document.createElement('div');
        dateCell.className = 'date-cell';
        dateCell.textContent = i;
        var monthString = String(month + 1).padStart(2, '0');
        var dayString = String(i).padStart(2, '0');
        var dateString = year + '-' + monthString + '-' + dayString;
        dateCell.setAttribute('data-date', dateString);

        if (year === today.getFullYear() && month === today.getMonth() && i === today.getDate()) {
            dateCell.classList.add('today');
        }
        if (dateString === selectedDateFilter) {
            dateCell.classList.add('selected');
        }

        var tasksOnDate = [];
        for (var j = 0; j < tasks.length; j++) {
            if (tasks[j].deadline === dateString) {
                tasksOnDate.push(tasks[j]);
            }
        }
        
        if (tasksOnDate.length > 0) {
            var allTasksComplete = true;
            for (var k = 0; k < tasksOnDate.length; k++) {
                if (!tasksOnDate[k].isComplete) {
                    allTasksComplete = false;
                    break;
                }
            }
            dateCell.classList.add(allTasksComplete ? 'task-complete' : 'task-due');
        }
        calendarGrid.appendChild(dateCell);
    }
}

taskForm.addEventListener('submit', addTask);

taskDeadlineInput.addEventListener('input', function(e) {
    deadlinePreview.textContent = e.target.value ? 'Format: ' + formatDate(e.target.value) : '';
});

taskList.addEventListener('click', handleTaskAction);
filterStatusSelect.addEventListener('change', renderTasks);

toggleSearchListBtn.addEventListener('click', function() { searchCourseDropdown.classList.toggle('show'); });
searchCourseInput.addEventListener('click', function() { searchCourseDropdown.classList.toggle('show'); });
toggleCourseListBtn.addEventListener('click', function() { courseListDropdown.classList.toggle('show'); });

prevMonthBtn.addEventListener('click', function() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});
nextMonthBtn.addEventListener('click', function() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});
calendarGrid.addEventListener('click', function(e) {
    var target = e.target;
    if (target.classList.contains('date-cell') && !target.classList.contains('empty')) {
        var clickedDate = target.getAttribute('data-date');
        selectedDateFilter = selectedDateFilter === clickedDate ? null : clickedDate;
        renderCalendar();
        renderTasks();
    }
});
clearDateFilterBtn.addEventListener('click', function() {
    selectedDateFilter = null;
    renderCalendar();
    renderTasks();
});

saveDataAndRefreshUI();