import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { resolve } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class MyNewServiceService {

  constructor(private http: HttpClient) { }

  /**
   * 
   * @param count Number of images to get.
   * @returns Promise which resolves as an array of image urls.
   */
  getShibePictures(count: number) {
    return new Promise((resolve, reject) => {
      const shibeUrl:string = '/api/shibes?count='+count+'&urls=true&httpsUrls=false';
      this.http.get(shibeUrl, {responseType: 'text'})
        .subscribe(data => {
          console.log('data',data.length);
          resolve(data);
        },
        error => { 
          console.log('error getting pic',error);
          reject(error);
        });
    })
  }

}
