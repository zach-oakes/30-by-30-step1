import {Component} from '@angular/core';
import {Student} from "../student";
import {STUDENTS} from "../mock-students";

@Component({
  selector: 'app-master-detail',
  templateUrl: './master-detail.component.html',
  styleUrl: './master-detail.component.css'
})
export class MasterDetailComponent {
  students: Student[] = STUDENTS;
  firstName: string = '';
  lastName: string = '';
  courses: string[] = [
    'Math',
    'Science',
    'History'
  ];
  selectedCourse: string = '';
  selectedStudent?: Student;

  createStudent(): void {
    let id;
    if (!this.students.length) {
      id = 1;
    } else {
      // Find the largest id and increment by 1
      const ids = this.students.map(s => s.id);
      let largestId = Math.max(...ids);
      id = largestId + 1;
    }

    this.students.push({id, firstName: this.firstName, lastName: this.lastName, course: this.selectedCourse});
    this.resetData();
  }

  deleteStudent(student: Student): void {
    this.students = this.students.filter(s => s.id !== student.id);
  }

  selectStudent(student: Student): void {
    // Select
    if (!this.selectedStudent || this.selectedStudent !== student) {
      this.selectedStudent = {...student}
    } else {
      // Unselect
      this.selectedStudent = undefined;
    }
  }

  get isAddButtonDisabled(): boolean {
    return this.firstName === '' || this.lastName === '' || this.selectedCourse === '';
  }

  editStudent(student: Student): void {
    const index = this.students.findIndex(s => s.id === student.id);

    // -1 if not found
    if (index !== -1) {
      this.students[index] = student
      this.resetData();
    }
  }

  private resetData(): void {
    this.firstName = '';
    this.lastName = '';
    this.selectedCourse = '';
    this.selectedStudent = undefined;
  }
}
