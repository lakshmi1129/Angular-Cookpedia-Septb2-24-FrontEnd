import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent,FooterComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  allRecipes:any =[]
  allFeedbacks:any =[]

  constructor(private api:ApiService){}

  ngOnInit(){
    this.getRecipes()
    this.getFeedbacks()
  }

  getRecipes(){
    this.api.getAllRecipeApi().subscribe((res:any)=>{
      this.allRecipes = res.slice(0,6)
      console.log(this.allRecipes);
      
    })
  }

  getFeedbacks(){
    this.api.getApprovedFeedbackApi().subscribe((res:any)=>{
      this.allFeedbacks=res
      console.log(this.allFeedbacks);
      
    })
  }

}
