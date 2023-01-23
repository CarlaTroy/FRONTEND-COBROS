import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { CourseService } from '../../servicios/course.service';
import { CourseFullDTO } from '../course';

@Component({
  providers: [MessageService,DialogService],
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.scss']
})
export class ListCoursesComponent implements OnInit {
    //DTO
    selectedCourse!: CourseFullDTO;
    listCourse:CourseFullDTO[] = [];
    //variables globales
   loading:boolean=false;
   //subcription
   subCourse!:Subscription;
  constructor(private courseService:CourseService,
                private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadDataCourses();
  }
  loadDataCourses(){
    this.subCourse=this.courseService.getAll().subscribe(response=>{
        this.loading=false;
        this.listCourse=response.data;
      },error=>{
        let message= error.error.message;
        this.messageService.add({severity:'error', summary: 'Error', detail: message});
      });
  }
  btnDeleteCourse(course:any){

  }
}
