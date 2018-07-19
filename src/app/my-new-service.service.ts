import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MyNewServiceService {

  constructor(private http: HttpClient) { }

  getShibePictures() {
    const shibeUrl:string = 'http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=false';
    this.http.get(shibeUrl, {responseType: 'text'})
      .subscribe(data => {
        console.log('data',data);
      });
  }

}
