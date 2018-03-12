import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';

import { AuthGuard } from './guards/auth.guard';
import { ComponentDeactivateGuard } from './guards/component-deactivate.guard';
import { LoginGuard } from './guards/login.guard';
import { LearnWordsResolver } from './resolvers/learn-words.resolver';
import { AuthService } from './services/auth.service';
import { WordService } from './services/word.service';

import { AppComponent } from './app.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { MyComponent } from './components/my/my.component';
import { NavbarComponent } from './components/my/navbar/navbar.component';
import { DictionaryComponent } from './components/my/dictionary/dictionary.component';
import { ExercisesComponent } from './components/my/exercises/exercises.component';
import { LearnWordsComponent } from './components/my/exercises/learn-words/learn-words.component';
import { SpellingComponent } from './components/my/exercises/spelling/spelling.component';
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
    MyComponent,
    NavbarComponent,
    SigninComponent,
    SignupComponent,
    SpellingComponent,
    WordDialogComponent,
  ],
  providers: [
    AuthGuard,
    ComponentDeactivateGuard,
    LoginGuard,
    LearnWordsResolver,
    AuthService,
    WordService,
  ],
  entryComponents: [
    ConfirmDialogComponent,
    WordDialogComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
