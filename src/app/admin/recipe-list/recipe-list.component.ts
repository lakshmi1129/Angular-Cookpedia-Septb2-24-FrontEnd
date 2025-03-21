import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-recipe-list',
  standalone: false,
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  searchKey:string=""
  allRecipes:any =[]

  constructor(private api:ApiService){}

  ngOnInit(){
    this.getAllRecipes()
  }

  getAllRecipes(){  
    this.api.getAllRecipeApi().subscribe((res:any)=>{
      this.allRecipes=res
      console.log(this.allRecipes);
      
    })
  }

  removeRecipe(id:string){
    this.api.deleteRecipeApi(id).subscribe((res:any)=>{
      this.getAllRecipes()
    })
  }

}
