import { Component, OnInit } from '@angular/core';
import { MyNewServiceService } from './my-new-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  constructor(private myNewServiceService: MyNewServiceService) {
    
  }
  title = 'shibe-cards';

  ngOnInit() {
    this.myNewServiceService.getShibePictures();
  }

}
