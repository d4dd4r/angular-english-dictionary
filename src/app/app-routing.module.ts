import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { MyComponent } from './components/my/my.component';
import { DictionaryComponent } from './components/my/dictionary/dictionary.component';
import { ExercisesComponent } from './components/my/exercises/exercises.component';
import { LearnWordsComponent } from './components/my/exercises/learn-words/learn-words.component';
import { SpellingComponent } from './components/my/exercises/spelling/spelling.component';

import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { ComponentDeactivateGuard } from './guards/component-deactivate.guard';
import { WordsResolver } from './resolvers/words.resolver';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/signin' },
  { path: 'signin', canActivate: [LoginGuard], component: SigninComponent },
  { path: 'signup', canActivate: [LoginGuard], component: SignupComponent },
  { path: 'my', redirectTo: '/my/dictionary', pathMatch: 'full' },
  {
    path: 'my',
    component: MyComponent,
    resolve: { words: WordsResolver },
    canActivateChild: [AuthGuard],
    children: [
      { path: 'dictionary', component: DictionaryComponent },
      { path: 'exercises', component: ExercisesComponent },
      { path: 'exercise', redirectTo: 'exercises', pathMatch: 'full' },
      {
        path: 'exercise',
        children: [
          {
            path: 'learn-words',
            canDeactivate: [ComponentDeactivateGuard],
            component: LearnWordsComponent,
          },
          {
            path: 'spelling',
            canDeactivate: [ComponentDeactivateGuard],
            component: SpellingComponent,
          }
        ]
      },
    ]
  },
  { path: '**', redirectTo: '/signin' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
