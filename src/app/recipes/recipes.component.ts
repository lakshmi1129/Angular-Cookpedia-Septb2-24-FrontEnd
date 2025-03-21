import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';
import { SearchPipe } from '../pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  imports: [HeaderComponent,FooterComponent,SearchPipe,FormsModule,NgxPaginationModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  p: number = 1;
  searchKey:string=""
  cusineArray:any =[]
  allRecipes:any =[]
  dummyAllRecipes:any =[]
  mealTypeArray:any=[]
  
    constructor(private api:ApiService,private router:Router){}
  
    ngOnInit(){
      this.getRecipes()
    }
  
    getRecipes(){
      this.api.getAllRecipeApi().subscribe((res:any)=>{
        this.allRecipes = res
        this.dummyAllRecipes = this.allRecipes
        console.log(this.allRecipes);
        this.allRecipes.forEach((item:any)=>{
          !this.cusineArray.includes(item.cuisine) && this.cusineArray.push(item.cuisine)
        })
        console.log(this.cusineArray);
        const dummyMeal = this.allRecipes.map((item:any)=>item.mealType)
        const flatDummyMeal = dummyMeal.flat(Infinity)
        flatDummyMeal.forEach((item:any)=>{
          !this.mealTypeArray.includes(item) && this.mealTypeArray.push(item)
        })
        console.log(this.mealTypeArray);

      })
    }

    filterAllRecipes(key:string,value:string){
      this.allRecipes = this.dummyAllRecipes.filter((item:any)=>item[key].includes(value))
    }

    viewRecipe(recipeId:string){
      if(sessionStorage.getItem("token")){
        // recipe/:id/view
        this.router.navigateByUrl(`/recipe/${recipeId}/view`)
      }else{
        alert("Please Login to get the full Access!!!")
      }
    }
  

}
