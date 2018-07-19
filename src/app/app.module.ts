import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MyNewServiceService } from './my-new-service.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [MyNewServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
