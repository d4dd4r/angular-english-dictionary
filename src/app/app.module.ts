import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MyComponent } from './components/my/my.component';
import { DictionaryComponent } from './components/my/dictionary/dictionary.component';
import { ExercisesComponent } from './components/my/exercises/exercises.component';

@NgModule({
  imports: [
    AppMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    DictionaryComponent,
    ExercisesComponent,
    LoginComponent,
    MyComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
