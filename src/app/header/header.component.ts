import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isLoggedin:boolean =false
  loginusername:string =""

  constructor(private router :Router){}

  ngOnInit(){
    if(sessionStorage.getItem("token") && sessionStorage.getItem("user")){
      this.isLoggedin = true
      this.loginusername = JSON.parse(sessionStorage.getItem("user")||"").username
    }else{
      this.isLoggedin=false
      this.loginusername=""
    }
  }

  logout(){
    sessionStorage.clear()
    this.loginusername=""
    this.isLoggedin=false
    this.router.navigateByUrl("/")
  }
}
