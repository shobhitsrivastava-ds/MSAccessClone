import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from "@angular/material/button";
// import { ListDragComponent } from "./list-drag/list-drag.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatListModule} from "@angular/material/list";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { TaskbarComponent } from './taskbar/taskbar.component';
import {ScrollingModule} from "@angular/cdk/scrolling";
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskbarComponent,
    ResultComponent//,
   // ListDragComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    DragDropModule,
    MatButtonModule,
    NgbModule,
    MatListModule,
    MatCheckboxModule,
    FormsModule,
    HttpClientModule,
    ScrollingModule
  ],
  providers: [],
  bootstrap: [AppComponent]//, ListDragComponent]
})
export class AppModule { }
