import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'

@Component({
  selector: 'app-view-recipe',
  imports: [HeaderComponent,FooterComponent,RouterLink],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.css'
})
export class ViewRecipeComponent {

  recipeId:string =""
  recipe:any={}
  allRelatedRecipes:any = []
  constructor(private route:ActivatedRoute,private api:ApiService){}

  ngOnInit(){
    this.route.params.subscribe((res:any)=>{
      console.log(res);
      this.recipeId = res.id
      this.getRecipeDetails(this.recipeId)   
    })
  }

  getRecipeDetails(recipeId:string){
      this.api.viewRecipeAPI(recipeId).subscribe((res:any)=>{
        this.recipe = res
        console.log(this.recipe);
        this.getAllRelatedRecipes(res.cuisine)
        
      })
  }

  getAllRelatedRecipes(cuisine:string){
    this.api.relatedRecipeAPI(cuisine).subscribe((res:any)=>{
      if(res.length>1){
        this.allRelatedRecipes = res.filter((item:any)=>item.name!=this.recipe.name);
        console.log(this.allRelatedRecipes);
  
      }else{
        this.allRelatedRecipes =[]
      }
      
    })
  }

  downloadRecipe(){
    this.api.downloadRecipeApi(this.recipeId,this.recipe).subscribe((res:any)=>{
    //  get chart data
      this.api.getChartData()
        this.generatePDF()
      })
  }

  // geneate PDF
  generatePDF(){
    const pdf = new jsPDF()
    pdf.setFontSize(16)
    pdf.setTextColor("red")
    pdf.text(this.recipe.name,10,10)
    pdf.setFontSize(12)
    pdf.setTextColor("black")
    pdf.text(`Cuisine: ${this.recipe.cuisine}`,10,20)
    pdf.text(`Servings: ${this.recipe.servings}`,10,30)
    pdf.text(`Mode of Cooking: ${this.recipe.difficulty}`,10,40)
    pdf.text(`Total Prepration Time: ${this.recipe.prepTimeMinutes} Minutes`,10,50)
    pdf.text(`Total Cooking Time: ${this.recipe.cookTimeMinutes} Minutes`,10,60)
    pdf.text(`Total Calories per Servings: ${this.recipe.caloriesPerServing} `,10,70)
    let head = [["Ingredients Needed","Cooking Instructions"]]
    let body =[]
    body.push([this.recipe.ingredients,this.recipe.instructions])
    autoTable(pdf,{head,body,startY:80})
    pdf.output("dataurlnewwindow")
    pdf.save(`recipe-${this.recipe.name}.pdf`)
  }


  saveRecipe(){
    this.api.saveRecipeApi(this.recipeId,this.recipe).subscribe({
      next:(res:any)=>{
        alert("Recipe Added to your collection")
      },
      error:(reason:any)=>{
        alert(reason.error)
      }
    })
  }
}
