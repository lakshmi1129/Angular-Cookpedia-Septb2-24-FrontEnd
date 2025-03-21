import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-saved-recipe',
  imports: [HeaderComponent, FooterComponent,RouterLink],
  templateUrl: './saved-recipe.component.html',
  styleUrl: './saved-recipe.component.css'
})
export class SavedRecipeComponent {
  // create a property to store array of saved recipes
  allrecipes:any =[HeaderComponent,FooterComponent]
  // dependency injection
  constructor(private api:ApiService){}
  // ngOnInit call api function
  ngOnInit(){
    this.getAllSavedRecipes()
  }
  // api function definition
  getAllSavedRecipes(){
    this.api.getuserSavedRecipesApi().subscribe((res:any)=>{
      this.allrecipes=res
      console.log(this.allrecipes);
      
    })
  }

  removeRecipe(id:string){
    this.api.deleteUserSavedRecipesApi(id).subscribe((res:any)=>{
      this.getAllSavedRecipes()
    })
  }
}
