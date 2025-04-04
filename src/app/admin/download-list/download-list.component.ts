import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-download-list',
  standalone: false,
  templateUrl: './download-list.component.html',
  styleUrl: './download-list.component.css'
})
export class DownloadListComponent {
  allDownloads:any =[]

  constructor(private api:ApiService){}

  ngOnInit(){
    this.getAllDownload()
  }

  getAllDownload(){
    this.api.getAllDownloadApi().subscribe((res:any)=>{
      this.allDownloads = res
      console.log(this.allDownloads);
      
    })
  }

}
