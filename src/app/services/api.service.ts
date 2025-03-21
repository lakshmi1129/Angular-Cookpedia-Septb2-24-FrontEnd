import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeModel } from '../admin/model/recipeModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server_url = "https://angular-cookpedia-sept24b2.onrender.com"
  constructor(private http:HttpClient) { }

  // get recipe api
  getAllRecipeApi(){
    return this.http.get(`${this.server_url}/get-recipes`)
  }

  // add testimony api
  addTestimonyApi(reqBody:any){
    return this.http.post(`${this.server_url}/add-testimony`,reqBody)
  }

  // register
   registerAPI(reqBody:any){
    return this.http.post(`${this.server_url}/register`,reqBody)
  }

   // login
   loginAPI(reqBody:any){
    return this.http.post(`${this.server_url}/login`,reqBody)
  }

  // appendToken in req header
  appendToken(){
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem("token")
    if(token){
      headers= headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }

  // /recipe/:id/view
  viewRecipeAPI(recipeId:string){
    return this.http.get(`${this.server_url}/recipe/${recipeId}/view`,this.appendToken())
  }

  // related-recipes
  relatedRecipeAPI(cuisine:string){
    return this.http.get(`${this.server_url}/related-recipes?cuisine=${cuisine}`,this.appendToken())
  }

  // /recipe/:id/download
  downloadRecipeApi(recipeId:string,reqBody:any){
    return this.http.post(`${this.server_url}/recipe/${recipeId}/download`,reqBody,this.appendToken())
  }
  
  // /recipe/:id/save
  saveRecipeApi(recipeId:string,reqBody:any){
    return this.http.post(`${this.server_url}/recipe/${recipeId}/save`,reqBody,this.appendToken())
  }

  // get-save-recipes
  getuserSavedRecipesApi(){
    return this.http.get(`${this.server_url}/get-save-recipes`,this.appendToken())
  }

   //save-recipes/:id/remove
   deleteUserSavedRecipesApi(id:string){
    return this.http.delete(`${this.server_url}/save-recipes/${id}/remove`,this.appendToken())
  }
  // user-downloads
  getUserDownloadRecipeApi(){
    return this.http.get(`${this.server_url}/user-downloads`,this.appendToken())
  }
  // /user/edit
  editUserApi(reqBody:any){
    return this.http.post(`${this.server_url}/user/edit`,reqBody,this.appendToken())
  }

  // /all-users
  getAllUserApi(){
    return this.http.get(`${this.server_url}/all-users`,this.appendToken())
  }

  // /download-list
  getAllDownloadApi(){
    return this.http.get(`${this.server_url}/download-list`,this.appendToken())
  }

   // get all feedbacks
   getAllFeedbackApi(){
    return this.http.get(`${this.server_url}/get-testimony`,this.appendToken())
  }
  // /feedback/:id/update
  updateFeedbackStatusApi(feedbackId:string,status:string){
    return this.http.get(`${this.server_url}/feedback/${feedbackId}/update?status=${status}`,this.appendToken())
  }

  // get-approved-testimony
  getApprovedFeedbackApi(){
    return this.http.get(`${this.server_url}/get-approved-testimony`)
  }


  // add-recipe
  addRecipeApi(reqBody:any){
    return this.http.post(`${this.server_url}/add-recipe`,reqBody,this.appendToken())
  }

  // /recipe/:id/edit
  updateRecipeApi(id:string,reqBody:RecipeModel){
    return this.http.put(`${this.server_url}/recipe/${id}/edit`,reqBody,this.appendToken())
  }

   // /recipe/:id/delete
  deleteRecipeApi(id:string){
    return this.http.delete(`${this.server_url}/recipe/${id}/delete`,this.appendToken())
  }

  // getChart Data
  getChartData(){
    this.getAllDownloadApi().subscribe((res:any)=>{
    console.log(res);
      let downloadArray:any =[]
      let output:any ={}
      res.forEach((item:any)=>{
        let cuisine = item.recipeCuisine
        let currentCount = item.count
        if(output.hasOwnProperty(cuisine)){
          output[cuisine] += currentCount
        }else{
          output[cuisine] = currentCount
        }
      })
    console.log(output);
    for(let cuisine in output){
      downloadArray.push({name:cuisine,y:output[cuisine]})     
    }
    localStorage.setItem("chart",JSON.stringify(downloadArray))
    console.log(downloadArray);    
    })
  }

       // code extracting cuisine and its total download count as object and added to an array
      // input: [{recipeCuisine, count}]
      // output: [{name:cuisine,y:count}]
      //algorithm
      // 1. create an empty array for output, object for storing each array item.
       // 2 Get each array item of res and store its cuisine and count to a variable
       // 3. check cuisine in variable  is in output object, if present, then set the value of cuisine key as totalexisting cuisine value with new count.,  not present then insert cuisine as key and value as its count
    // 4. push each key from output object into output array

}
