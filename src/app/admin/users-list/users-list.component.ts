import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-users-list',
  standalone: false,
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  allUsers:any =[]

  constructor(private api:ApiService){}

  ngOnInit(){
    this.getAllusers()
  }

  getAllusers(){
    this.api.getAllUserApi().subscribe((res:any)=>{
      this.allUsers=res
      console.log(this.allUsers);
      
    })
  }

}
