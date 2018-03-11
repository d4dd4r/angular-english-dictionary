import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './components/auth/signin/signin.component';
import { MyComponent } from './components/my/my.component';
import { DictionaryComponent } from './components/my/dictionary/dictionary.component';
import { ExercisesComponent } from './components/my/exercises/exercises.component';
import { LearnWordsComponent } from './components/my/exercises/learn-words/learn-words.component';
import { SpellingComponent } from './components/my/exercises/spelling/spelling.component';

import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { ComponentDeactivateGuard } from './guards/component-deactivate.guard';
import { LearnWordsResolver } from './resolvers/learn-words.resolver';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', canActivate: [LoginGuard], component: SigninComponent },
  { path: 'my', redirectTo: '/my/dictionary', pathMatch: 'full' },
  {
    path: 'my',
    component: MyComponent,
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
            resolve: { words: LearnWordsResolver },
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
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
