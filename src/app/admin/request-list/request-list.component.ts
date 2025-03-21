import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-request-list',
  standalone: false,
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css'
})
export class RequestListComponent {
   allFeedbacks:any =[]
  
    constructor(private api:ApiService){}
  
    ngOnInit(){
      this.getAllFeedbacks()
    }
  
    getAllFeedbacks(){
      this.api.getAllFeedbackApi().subscribe((res:any)=>{
        this.allFeedbacks = res
        console.log(this.allFeedbacks);
        
      })
    }

    updateFeedbackStatus(id:string,status:string){
      this.api.updateFeedbackStatusApi(id,status).subscribe((res:any)=>{
        this.getAllFeedbacks()
      })
    }

}
