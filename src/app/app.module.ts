import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MyNewServiceService } from './my-new-service.service';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ShibeCardComponent } from './shibe-card/shibe-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ShibeCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule 
  ],
  providers: [MyNewServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
