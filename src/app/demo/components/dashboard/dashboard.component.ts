import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Product } from '../../api/product';
import { Subscription } from 'rxjs';
import { CantonDTO, LitarCantonesDTO, obtenerCantonDTO } from 'src/app/admin/canton/canton.model';
import { CantonService } from 'src/app/admin/servicios/canton.service';
import { ProductorService } from 'src/app/admin/servicios/productor.service';
import { LitarProductoresDTO, ProductorDTO } from 'src/app/admin/productores/productor.model';
import { IntermediarioDTO, LitarIntermediariosDTO } from 'src/app/admin/intermediario/intermediario.model';
import { IntermediarioService } from 'src/app/admin/servicios/intermediario.service';
declare var google: any

@Component({
    providers: [MessageService],
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    options: any;
    overlays: any[] = [];
    dialogVisible: boolean = false;
    markerTitle?: string | null;
    selectedPosition: any;
    infoWindow: any;
    draggable: boolean = false;
    

    basicData: any;

    basicOptions: any;
  
    data: any;
  
      


    subCargarProductores!:Subscription;
    listarProductores:LitarProductoresDTO[] = [];
    totalProductores: number=0;

    //variables globales
    listarCantones:LitarCantonesDTO[] = [];
    cantones: obtenerCantonDTO[];
    subCargarCantones!:Subscription;
    totalCantones: number=0;


    listarIntermediarios:LitarIntermediariosDTO[] = [];
    subCargarIntermediarios!:Subscription;
    totalIntermediarios: number=0;


    loading: boolean = false;

    selectedCustomer1!: ProductorDTO;
    selectedCustomer2!: CantonDTO;
    selectedCustomer3!: IntermediarioDTO;

    objGeneroModel!: Product[]

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    constructor(private productorService:ProductorService, 
        private cantonService:CantonService, 
        private intermediarioService:IntermediarioService,
        private messageService: MessageService) {
        this.cantones = [];
    }

    ngOnInit() {
        if (!navigator.onLine) {
            console.log('No hay conexión a internet.');
            this.messageService.add({severity:'error', summary: 'Error', detail: 'No hay conexión a internet.'});
          }

        this.options = {
            center: {lat: -3.989530079515933, lng: -79.20430183410645},
            zoom: 9
        };

        this.initOverlays();

        this.infoWindow = new google.maps.InfoWindow();
        this.cargarCantones();
        //this.cargarProductores();
        //this.cargarIntermediarios();


        this.basicData = {
          labels: ['Pindal', 'Celica', 'Zapotillo', 'Pindal', 'Celica', 'Zapotillo'],
          datasets: [
              {
                  label: 'Productores',
                  backgroundColor: '#42A5F5',
                  data: [65, 59, 80,65, 59, 80]
              }
          ]
      };
    
    
      this.data = {
        labels: ['A','B','C'],
        datasets: [
            {
                data: [0, 50, 100],
                backgroundColor: [
                    "#42A5F5",
                    "#66BB6A",
                    "#FFA726"
                ],
                hoverBackgroundColor: [
                    "#64B5F6",
                    "#81C784",
                    "#FFB74D"
                ]
            }
        ]
    };
    
        
    }



    handleOverlayClick(event: any) {
        let isMarker = event.overlay.getTitle != undefined;

        if (isMarker) {
            let title = event.overlay.getTitle();
            this.infoWindow.setContent('' + title + '');
            this.infoWindow.open(event.map, event.overlay);
            event.map.setCenter(event.overlay.getPosition());

            this.messageService.add({severity:'info', summary:'Marker Selected', detail: title});
        }
        else {
            this.messageService.add({severity:'info', summary:'Shape Selected', detail: ''});
        }
    }

 

    handleDragEnd(event: any) {
        this.messageService.add({severity:'info', summary:'Marker Dragged', detail: event.overlay.getTitle()});
    }

    initOverlays() {
        
        if (!this.overlays||!this.overlays.length) {
            this.overlays = [
            ];
        }
    }

    zoomIn(map: any) {
        map.setZoom(map.getZoom()+1);
    }

    zoomOut(map: any) {
        map.setZoom(map.getZoom()-1);
    }

    clear() {
        this.overlays = [];
    }

    cargarCantones():void{
        this.subCargarCantones=this.cantonService.obtenerTodos().subscribe(cantones=>{
          console.log(cantones.data);
          this.loading=false;
          this.listarCantones=cantones.data;
          this.totalCantones = this.listarCantones.length;
          for (let i = 0; i < cantones.data.length; i++) {
            this.overlays.push(new google.maps.Marker({position: {lat: Number(cantones.data[i].latitud), lng: Number(cantones.data[i].longitud)}, title:cantones.data[i].nombre}),)
            }
        },error=>{
          console.log(error);
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Error: no ha iniciado el servidor'});
        });
      
      }

      cargarProductores():void{
        this.subCargarProductores=this.productorService.obtenerTodos().subscribe(productores=>{
          console.log(productores);
          this.loading=false;
          this.listarProductores=productores.data;
          this.totalProductores = this.listarProductores.length;
        },error=>{
          console.log(error);
          this.messageService.add({severity:'error', summary: 'Error', detail: error.error.message});
        });
    
      }

      cargarIntermediarios():void{
        this.subCargarIntermediarios=this.intermediarioService.obtenerTodos().subscribe(cantones=>{
          console.log(cantones);
          this.loading=false;
          this.listarIntermediarios=cantones.data;
          this.totalIntermediarios = this.listarIntermediarios.length;
        },error=>{
          let message= error.error.message;
        this.messageService.add({severity:'error', summary: 'Error', detail: message});
        });
    
      }

    
}
