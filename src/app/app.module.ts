import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';

import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { LearnWordsResolver } from './resolvers/learn-words.resolver';
import { SelfService } from './services/self.service';
import { UserService } from './services/user.service';
import { WordService } from './services/word.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MyComponent } from './components/my/my.component';
import { NavbarComponent } from './components/my/navbar/navbar.component';
import { DictionaryComponent } from './components/my/dictionary/dictionary.component';
import { ExercisesComponent } from './components/my/exercises/exercises.component';
import { LearnWordsComponent } from './components/my/exercises/learn-words/learn-words.component';
import { WordDialogComponent } from './components/my/dictionary/word-dialog/word-dialog.component';

import { ConfirmDialogComponent } from './components/shared/confirm-dialog.component';

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
    ConfirmDialogComponent,
    DictionaryComponent,
    ExercisesComponent,
    LearnWordsComponent,
    LoginComponent,
    MyComponent,
    NavbarComponent,
    WordDialogComponent,
  ],
  providers: [
    AuthGuard,
    LoginGuard,
    LearnWordsResolver,
    SelfService,
    UserService,
    WordService,
  ],
  entryComponents: [
    ConfirmDialogComponent,
    WordDialogComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
