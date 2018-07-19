import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MyNewServiceService } from './my-new-service.service';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [MyNewServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
