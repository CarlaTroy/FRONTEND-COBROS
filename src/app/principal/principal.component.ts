import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  providers: [MessageService],
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    if (!navigator.onLine) {
      console.log('No hay conexión a internet.');
      this.messageService.add({severity:'error', summary: 'Error', detail: 'No hay conexión a internet.'});
    }
  }
}
