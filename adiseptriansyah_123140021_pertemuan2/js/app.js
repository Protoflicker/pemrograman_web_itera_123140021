//  Modules, Classes
export class TaskManager {
  
  constructor() {
    //  Const/Let 
    this.taskForm = document.getElementById('task-form');
    this.taskNameInput = document.getElementById("task-name");
    this.taskCourseInput = document.getElementById('task-course');
    this.taskDeadlineInput = document.getElementById('task-deadline');
    this.deadlinePreview = document.getElementById('deadline-format-preview');
    this.taskList = document.getElementById('task-list');
    this.filterStatusSelect = document.getElementById('filter-status');
    this.incompleteCountSpan = document.getElementById('incomplete-count');
    this.toggleCourseListBtn = document.getElementById('toggle-course-list-btn');
    this.courseSuggestions = document.getElementById('course-suggestions');
    this.courseListDropdown = document.getElementById('course-list-dropdown');
    this.searchCourseInput = document.getElementById('search-course-input');
    this.toggleSearchListBtn = document.getElementById('toggle-search-list-btn');
    this.searchCourseDropdown = document.getElementById('search-course-dropdown');
    this.monthYearDisplay = document.getElementById('month-year-display');
    this.calendarGrid = document.getElementById('calendar-grid');
    this.prevMonthBtn = document.getElementById('prev-month-btn');
    this.nextMonthBtn = document.getElementById('next-month-btn');
    this.filterInfo = document.getElementById('filter-info');
    this.clearDateFilterBtn = document.getElementById('clear-date-filter-btn');

    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    this.currentDate = new Date();
    this.selectedDateFilter = null;
    this.selectedCourseFilter = 'all';
  }

  //  Async/Await
  async initialize() {
    this.taskList.innerHTML = '<li>Memuat tugas Anda...</li>';

    //  Arrow Function
    await new Promise(resolve => setTimeout(resolve, 500)); 

    this.setupEventListeners();
    this.saveDataAndRefreshUI(); 
  }

  setupEventListeners() {
    //  Arrow Functions 
    this.taskForm.addEventListener('submit', (e) => this.addTask(e));
    this.taskDeadlineInput.addEventListener('input', (e) => {
      this.deadlinePreview.textContent = e.target.value ? 'Format: ' + this.formatDate(e.target.value) : '';
    });
    this.taskList.addEventListener('click', (e) => this.handleTaskAction(e));
    this.filterStatusSelect.addEventListener('change', () => this.renderTasks());
    this.toggleSearchListBtn.addEventListener('click', () => { this.searchCourseDropdown.classList.toggle('show'); });
    this.searchCourseInput.addEventListener('click', () => { this.searchCourseDropdown.classList.toggle('show'); });
    this.toggleCourseListBtn.addEventListener('click', () => { this.courseListDropdown.classList.toggle('show'); });
    this.prevMonthBtn.addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.renderCalendar();
    });
    this.nextMonthBtn.addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.renderCalendar();
    });
    this.calendarGrid.addEventListener('click', (e) => {
      const target = e.target;
      if (target.classList.contains('date-cell') && !target.classList.contains('empty')) {
        const clickedDate = target.getAttribute('data-date');
        this.selectedDateFilter = this.selectedDateFilter === clickedDate ? null : clickedDate;
        this.renderCalendar();
        this.renderTasks();
      }
    });
    this.clearDateFilterBtn.addEventListener('click', () => {
      this.selectedDateFilter = null;
      this.renderCalendar();
      this.renderTasks();
    });
  }


  formatDate(dateString) {
    if (!dateString) return '';
    
    //  Array Destructuring
    const [year, month, day] = dateString.split('-'); 
    
    const shortYear = year.substring(2);
    //  Template Literals
    return `${day}/${month}/${shortYear}`; 
  }

  saveDataAndRefreshUI() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.renderTasks();
    this.updateCourseSuggestions();
    this.updateSearchCourseDropdown();
    this.renderCalendar();
  }

  getUniqueCourses() {
    let uniqueCourses = []; 
    for (let i = 0; i < this.tasks.length; i++) { 
      const course = this.tasks[i].course; 
      if (uniqueCourses.indexOf(course) === -1) {
        uniqueCourses.push(course);
      }
    }
    return uniqueCourses;
  }

  updateCourseSuggestions() {
    this.courseSuggestions.innerHTML = '';
    this.courseListDropdown.innerHTML = '';
    const uniqueCourses = this.getUniqueCourses(); 

    if (uniqueCourses.length === 0) {
      this.courseListDropdown.innerHTML = '<div>Belum ada mata kuliah.</div>';
    }

    for (let i = 0; i < uniqueCourses.length; i++) { 
      const course = uniqueCourses[i]; 
      const option = document.createElement('option'); 
      option.value = course;
      this.courseSuggestions.appendChild(option);

      const div = document.createElement('div'); 
      div.textContent = course;
      //  Arrow Function
      div.addEventListener('click', (e) => {
        this.taskCourseInput.value = e.target.textContent;
        this.courseListDropdown.classList.remove('show');
      });
      this.courseListDropdown.appendChild(div);
    }
  }

  updateSearchCourseDropdown() {
    this.searchCourseDropdown.innerHTML = '';
    const uniqueCourses = this.getUniqueCourses();

    const allOption = document.createElement('div');
    allOption.textContent = 'Semua Mata Kuliah';
    //  Arrow Function
    allOption.addEventListener('click', () => {
      this.selectedCourseFilter = 'all';
      this.searchCourseInput.value = 'Semua Mata Kuliah';
      this.searchCourseDropdown.classList.remove('show');
      this.renderTasks();
    });
    this.searchCourseDropdown.appendChild(allOption);

    for (let i = 0; i < uniqueCourses.length; i++) {
      const course = uniqueCourses[i];
      const div = document.createElement('div');
      div.textContent = course;
      //  Arrow Function
      div.addEventListener('click', (e) => {
        this.selectedCourseFilter = e.target.textContent;
        this.searchCourseInput.value = e.target.textContent;
        this.searchCourseDropdown.classList.remove('show');
        this.renderTasks();
      });
      this.searchCourseDropdown.appendChild(div);
    }
  }

  renderTasks() {
    this.taskList.innerHTML = '';
    //  Arrow Function
    this.tasks.sort((a, b) => a.deadline.localeCompare(b.deadline));
    const filterStatus = this.filterStatusSelect.value;
    
    //  Array.filter
    const filteredTasks = this.tasks.filter(task => {
      const matchesCourse = (this.selectedCourseFilter === 'all' || task.course === this.selectedCourseFilter);
      const matchesStatus = (filterStatus === 'all') || (filterStatus === 'complete' && task.isComplete) || (filterStatus === 'incomplete' && !task.isComplete);
      const matchesDate = !this.selectedDateFilter || (task.deadline === this.selectedDateFilter);
      return matchesCourse && matchesStatus && matchesDate;
    });

    if (this.selectedDateFilter) {
      //  Template Literals
      this.filterInfo.textContent = `(Tugas untuk ${this.formatDate(this.selectedDateFilter)})`;
      this.clearDateFilterBtn.classList.remove('hidden');
    } else {
      this.filterInfo.textContent = '';
      this.clearDateFilterBtn.classList.add('hidden');
    }

    //  Array.reduce
    const groupedTasks = filteredTasks.reduce((acc, task) => {
      const course = task.course; 
      if (!acc[course]) {
        acc[course] = []; 
      }
      acc[course].push(task); 
      return acc; 
    }, {}); 

    const courses = Object.keys(groupedTasks);
    if (courses.length === 0) {
      this.taskList.innerHTML = '<li>Tidak ada tugas.</li>';
    } else {
      //  For...of
      for (const courseName of courses) { 
        const tasksInGroup = groupedTasks[courseName];
        const groupContainer = document.createElement('li');
        groupContainer.className = 'course-group-item';
        groupContainer.innerHTML = `<div class="course-header">${courseName}</div>`;
        
        const innerList = document.createElement('ul');

        for (const task of tasksInGroup) { 
          //  Object Destructuring
          const { id, name, deadline, isComplete } = task;

          const li = document.createElement('li');
          li.className = `task-item ${isComplete ? 'complete' : ''}`;
          li.setAttribute('data-id', id);

          li.innerHTML = `
            <div class="task-details">
              <h3>${name}</h3>
              <p><strong>Deadline:</strong> ${this.formatDate(deadline)}</p>
            </div>
            <div class="task-actions">
              <button class="complete-btn">${isComplete ? 'Batal' : 'Selesai'}</button>
              <button class="delete-btn">Hapus</button>
            </div>
          `;
          innerList.appendChild(li);
        }
        groupContainer.appendChild(innerList);
        this.taskList.appendChild(groupContainer);
      }
    }
    this.updateIncompleteCount();
  }

  updateIncompleteCount() {
    //  Array.reduce
    const count = this.tasks.reduce((total, task) => {
      return task.isComplete ? total : total + 1;
    }, 0); 
    
    this.incompleteCountSpan.textContent = count;
  }

  addTask(e) {
    e.preventDefault();
    const name = this.taskNameInput.value.trim();
    const course = this.taskCourseInput.value.trim();
    const deadline = this.taskDeadlineInput.value;

    if (!name || !course || !deadline) {
      return alert('Semua kolom wajib diisi!');
    }
    
    //  Object Property Shorthand
    const newTask = { 
      id: Date.now(), 
      name, 
      course, 
      deadline, 
      isComplete: false 
    };
    
    this.tasks.push(newTask);
    this.saveDataAndRefreshUI();
    this.taskForm.reset();
    this.deadlinePreview.textContent = '';
  }

  handleTaskAction(e) {
    const target = e.target;
    const taskItem = target.closest('.task-item');
    
    if (!taskItem) return;

    const taskId = Number(taskItem.getAttribute('data-id'));
    
    if (target.classList.contains('complete-btn')) {
      //  Array.find
      const taskToToggle = this.tasks.find(task => task.id === taskId);
      if (taskToToggle) {
        taskToToggle.isComplete = !taskToToggle.isComplete;
      }
    }
    
    if (target.classList.contains('delete-btn')) {
      if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
        //  Array.filter
        this.tasks = this.tasks.filter(task => task.id !== taskId);
      }
    }
    this.saveDataAndRefreshUI();
  }

  renderCalendar() {
    this.calendarGrid.innerHTML = '';
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    this.monthYearDisplay.textContent = `${monthNames[month]} ${year}`; 

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    //  For...of
    for (const dayName of dayNames) { 
      const dayEl = document.createElement('div');
      dayEl.className = 'day-name';
      dayEl.textContent = dayName;
      this.calendarGrid.appendChild(dayEl);
    }
    
    for (let i = 0; i < firstDayOfMonth; i++) { 
      const emptyCell = document.createElement('div');
      emptyCell.className = 'date-cell empty';
      this.calendarGrid.appendChild(emptyCell);
    }

    for (let i = 1; i <= lastDateOfMonth; i++) { 
      const dateCell = document.createElement('div');
      dateCell.className = 'date-cell';
      dateCell.textContent = i;
      const monthString = String(month + 1).padStart(2, '0');
      const dayString = String(i).padStart(2, '0');
      const dateString = `${year}-${monthString}-${dayString}`; 
      dateCell.setAttribute('data-date', dateString);

      if (year === today.getFullYear() && month === today.getMonth() && i === today.getDate()) {
        dateCell.classList.add('today');
      }
      if (dateString === this.selectedDateFilter) {
        dateCell.classList.add('selected');
      }
      
      //  Array.filter
      const tasksOnDate = this.tasks.filter(task => task.deadline === dateString);
      
      if (tasksOnDate.length > 0) {
        //  Array.every
        const allTasksComplete = tasksOnDate.every(task => task.isComplete);
        dateCell.classList.add(allTasksComplete ? 'task-complete' : 'task-due');
      }
      this.calendarGrid.appendChild(dateCell);
    }
  }
}
