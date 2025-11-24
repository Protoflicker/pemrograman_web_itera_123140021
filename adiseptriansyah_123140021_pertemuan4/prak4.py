def calculate_final_score(student: dict) -> float:
    """Menghitung nilai akhir berdasarkan bobot."""
    midterm = student['midterm_score']
    finals = student['final_exam_score']
    assignment = student['assignment_score']
    
    # Bobot: 30% UTS + 40% UAS + 30% Tugas
    final_score = (0.30 * midterm) + (0.40 * finals) + (0.30 * assignment)
    return final_score

def determine_grade(final_score: float) -> str:
    """Menentukan grade berdasarkan nilai akhir."""
    if final_score >= 80:
        return 'A'
    elif final_score >= 70:
        return 'B'
    elif final_score >= 60:
        return 'C'
    elif final_score >= 50:
        return 'D'
    else:
        return 'E'

def process_student_data(student_list: list):
    """
    Fungsi helper untuk memperbarui setiap dictionary mahasiswa
    dengan 'final_score' dan 'grade'.
    """
    for student in student_list:
        score = calculate_final_score(student)
        student['final_score'] = score
        student['grade'] = determine_grade(score)

def display_data(student_list: list):
    """Menampilkan data mahasiswa dalam format tabel."""
    if not student_list:
        print("No data to display.")
        return

    print("\n" + "=" * 84)
    print(f"{'No':<3} | {'Name':<20} | {'NIM':<12} | {'Midterm':<7} | {'Finals':<7} | {'Assign.':<7} | {'Score':<6} | {'Grade':<5}")
    print("-" * 84)
    
    for i, student in enumerate(student_list, 1):
        midterm = student.get('midterm_score', 0)
        finals = student.get('final_exam_score', 0)
        assign = student.get('assignment_score', 0)
        score = student.get('final_score', 0.0)
        grade = student.get('grade', 'N/A')

        print(f"{i:<3} | {student['name']:<20} | {student['NIM']:<12} | {midterm:<7} | {finals:<7} | {assign:<7} | {score:<6.2f} | {grade:<5}")
    print("=" * 84)

def find_highest_score(student_list: list) -> dict:
    """Mencari mahasiswa dengan nilai akhir tertinggi."""
    if not student_list:
        return None
    # Gunakan fungsi lambda sebagai 'key' untuk fungsi max()
    highest_student = max(student_list, key=lambda student: student.get('final_score', 0))
    return highest_student

def find_lowest_score(student_list: list) -> dict:
    """Mencari mahasiswa dengan nilai akhir terendah."""
    if not student_list:
        return None
    # Gunakan fungsi lambda sebagai 'key' untuk fungsi min()
    lowest_student = min(student_list, key=lambda student: student.get('final_score', 0))
    return lowest_student

def add_student() -> dict:
    """Meminta input dari user untuk menambah data mahasiswa baru."""
    print("\n--- Add New Student Data ---")
    name = input("Name: ")
    student_nim = input("NIM: ")
    
    # Validasi input nilai agar berupa angka
    while True:
        try:
            midterm = int(input("Midterm Score: "))
            finals = int(input("Final Exam Score: "))
            assignment = int(input("Assignment Score: "))
            break # Keluar loop jika semua input valid
        except ValueError:
            print("Invalid input! Please enter numbers for scores.")

    new_student = {
        'name': name,
        'NIM': student_nim,
        'midterm_score': midterm,
        'final_exam_score': finals,
        'assignment_score': assignment
    }
    return new_student

def filter_by_grade(student_list: list):
    """Menampilkan mahasiswa berdasarkan filter grade."""
    if not student_list:
        print("Data is empty.")
        return

    grade_to_find = input("Enter Grade to filter (A/B/C/D/E): ").upper()
    if grade_to_find not in ['A', 'B', 'C', 'D', 'E']:
        print("Invalid grade. Please enter A, B, C, D, or E.")
        return
    
    # List comprehension untuk filter data
    filtered_results = [student for student in student_list if student.get('grade') == grade_to_find]

    if not filtered_results:
        print(f"No students found with grade {grade_to_find}.")
    else:
        print(f"\n--- Students with Grade {grade_to_find} ---")
        display_data(filtered_results) 

def calculate_class_average(student_list: list) -> float:
    """Menghitung rata-rata nilai akhir seluruh kelas."""
    if not student_list:
        return 0.0
    
    total_score = sum(student.get('final_score', 0) for student in student_list)
    return total_score / len(student_list)

def main():
    """Fungsi utama untuk menjalankan program."""
    
    student_data = [
        {'name': 'Cahya Nashiruddin', 'NIM': '5435234', 'midterm_score': 85, 'final_exam_score': 90, 'assignment_score': 88},
        {'name': 'Dirja Prabowo', 'NIM': '1532524', 'midterm_score': 72, 'final_exam_score': 65, 'assignment_score': 78},
        {'name': 'Eka Wijayanti', 'NIM': '64334321', 'midterm_score': 92, 'final_exam_score': 88, 'assignment_score': 95},
        {'name': 'Rama Tampubolon', 'NIM': '154654456', 'midterm_score': 60, 'final_exam_score': 55, 'assignment_score': 62},
        {'name': 'Dian Hariyah', 'NIM': '9876984', 'midterm_score': 78, 'final_exam_score': 82, 'assignment_score': 80},
    ]

    while True:
        # Proses data setiap kali menu ditampilkan.
        process_student_data(student_data)

        print("\n--- Student Grade Management Program ---")
        print("1. Display Student Data")
        print("2. Add New Student")
        print("3. Find Highest Score")
        print("4. Find Lowest Score")
        print("5. Filter by Grade")
        print("6. Show Class Average")
        print("0. Exit")
        
        choice = input("Select menu (0-6): ")

        if choice == '1':
            display_data(student_data)
        
        elif choice == '2':
            new_data = add_student()
            student_data.append(new_data)
            print("Data added successfully!")
        
        elif choice == '3':
            highest = find_highest_score(student_data)
            if highest:
                print("\n--- Student with Highest Score ---")
                display_data([highest]) # Tampilkan sebagai list berisi satu item
            else:
                print("Data is empty.")
        
        elif choice == '4':
            lowest = find_lowest_score(student_data)
            if lowest:
                print("\n--- Student with Lowest Score ---")
                display_data([lowest])
            else:
                print("Data is empty.")
        
        elif choice == '5':
            filter_by_grade(student_data)
        
        elif choice == '6':
            average = calculate_class_average(student_data)
            print(f"\nThe class average score is: {average:.2f}")
        
        elif choice == '0':
            print("Thank you! Exiting program.")
            break
        
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()