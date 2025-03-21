import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { RecipeModel } from '../model/recipeModel';

@Component({
  selector: 'app-manage-recipe',
  standalone: false,
  templateUrl: './manage-recipe.component.html',
  styleUrl: './manage-recipe.component.css'
})
export class ManageRecipeComponent {

  @Input() id !:string
  cusineArray:any =[]
  mealTypeArray:any=[]
  recipeDetails:RecipeModel={}
  ingredients:any=[]
  instructions:any=[]
  mealArray:any=[]

  constructor(private api:ApiService,private router:Router){}
    
      ngOnInit(){
        this.getRecipes()
      }
    
      getRecipes(){
        this.api.getAllRecipeApi().subscribe((res:any)=>{

          if(this.id){
            this.recipeDetails = res.find((item:any)=>item._id==this.id)
            this.ingredients = this.recipeDetails.ingredients
            this.instructions = this.recipeDetails.instructions
            this.mealArray = this.recipeDetails.mealType
          }
         
          res.forEach((item:any)=>{
            !this.cusineArray.includes(item.cuisine) && this.cusineArray.push(item.cuisine)
          })
          console.log(this.cusineArray);
          const dummyMeal = res.map((item:any)=>item.mealType)
          const flatDummyMeal = dummyMeal.flat(Infinity)
          flatDummyMeal.forEach((item:any)=>{
            !this.mealTypeArray.includes(item) && this.mealTypeArray.push(item)
          })
          console.log(this.mealTypeArray);
        })
      }

      addIngredient(ingredient:any){
        console.log(ingredient.value);
        if(ingredient.value){
          this.ingredients.push(ingredient.value)
          ingredient.value =""
          console.log(this.ingredients);
          
        }
      }

      removeIngredient(value:string){
        this.ingredients = this.ingredients.filter((item:string)=>item!=value)
      }

      addInstructions(instruction:any){
        console.log(instruction.value);
        if(instruction.value){
          this.instructions.push(instruction.value)
          instruction.value =""
          console.log(this.instructions);
          
        }
      }

      removeInstructions(value:string){
        this.instructions = this.instructions.filter((item:string)=>item!=value)
      }

      mealTypeSelect(event:any){
        if(event.target.checked){
          !this.mealArray.includes(event.target.name) && this.mealArray.push(event.target.name)
        }else{
          this.mealArray = this.mealArray.filter((item:string)=>item!=event.target.name)
        }
        console.log(this.mealArray); 
      }

      removeMealType(meal:string){
        this.mealArray=this.mealArray.filter((item:string)=>item!=meal)
      }



      addRecipe(){
        console.log(this.recipeDetails);
        // 1. add ingredients, instructions, meal array to recipeDetails
        this.recipeDetails.ingredients = this.ingredients
        this.recipeDetails.instructions = this.instructions
        this.recipeDetails.mealType =this.mealArray
        const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = this.recipeDetails
        // 2. Check all fields in recipeDetails are filled
        if(name && ingredients!.length>0 && instructions!.length>0 && prepTimeMinutes &&cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing && image && mealType!.length>0){
          
          // 3. if all vares are present make api call
          this.api.addRecipeApi(this.recipeDetails).subscribe({
            next:(res:any)=>{
            // - if api  success then clear all fields, alert " receipe added", redirect to receipe list page
              alert("Recipe added successfully")
              this.recipeDetails={}
              this.ingredients=[]
              this.instructions=[]
              this.mealArray=[]
              this.router.navigateByUrl("/admin/recipe-list")
            },
            error:(reason:any)=>{
              alert(reason.error)
              this.recipeDetails.name=""
            }
          })
            //  - if api call failed then alert failed message
        }else{
        // 4. if all values are not present then alert "fill the form"
          alert("Please fill the form completely!!!")
        }  
      }

      editRecipe(){
        console.log(this.recipeDetails);
        // 1. add ingredients, instructions, meal array to recipeDetails
        this.recipeDetails.ingredients = this.ingredients
        this.recipeDetails.instructions = this.instructions
        this.recipeDetails.mealType =this.mealArray
        const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = this.recipeDetails
        // 2. Check all fields in recipeDetails are filled
        if(name && ingredients!.length>0 && instructions!.length>0 && prepTimeMinutes &&cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing && image && mealType!.length>0){
        //  alert("api call")
         this.api.updateRecipeApi(this.id, this.recipeDetails).subscribe((res:any)=>{
         
            alert("Recipe Updated successfully")
            this.recipeDetails={}
            this.ingredients=[]
            this.instructions=[]
            this.mealArray=[]
            this.router.navigateByUrl("/admin/recipe-list")
          })
        }else{
        // 4. if all values are not present then alert "fill the form"
          alert("Please fill the form completely!!!") 
        }  
      }

}
