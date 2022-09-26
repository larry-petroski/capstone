import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Student } from '../models/student.model';
import { Teacher } from '../models/teacher.model';
import { TeachersService } from '../services/teachers.service';

@Component({
  selector: 'sr-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  teacher!: Teacher;
  teacherId!: number;
  teacherName!: string;
  students: Student[] = [];
  selectedStudent!: Student;

  constructor(
    private route: ActivatedRoute,
    private teachersSvc: TeachersService
  ) {
    this.route.paramMap.subscribe((pm) => {
      const id = pm.get('teacherId');
      if (id) {
        this.teacherId = +id;
      }
    });
  }

  ngOnInit(): void {
      this.teachersSvc.getTeacherById(this.teacherId).subscribe({
        next: (resp) => {
          this.setStudents(resp);
        },
        error: (err) => console.error(err.message),
        complete: () => {},
      });
  }

  setStudents(teacher: Teacher) {
    if (teacher) {
      let name = teacher.teacherName.split(' ');
      this.teacher = teacher;
      this.teacherName = `${name[0]} ${name[2]}`;
      if (this.teacher.students) {
        this.students = this.teacher.students;
      }
    }
  }

  onRowSelect(event: any) {
    console.log(event);
  }
}
