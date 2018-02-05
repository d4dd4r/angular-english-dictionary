import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { MyComponent } from './components/my/my.component';
import { DictionaryComponent } from './components/my/dictionary/dictionary.component';
import { ExercisesComponent } from './components/my/exercises/exercises.component';
import { LearnWordsComponent } from './components/my/exercises/learn-words/learn-words.component';

import { LearnWordsResolver } from './resolvers/learn-words.resolver';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'my', redirectTo: '/my/dictionary', pathMatch: 'full' },
  {
    path: 'my',
    component: MyComponent,
    children: [
      { path: 'dictionary', component: DictionaryComponent },
      { path: 'exercises', component: ExercisesComponent },
      { path: 'exercise', redirectTo: 'exercises', pathMatch: 'full' },
      { path: 'exercise', children: [
        { path: 'learn-words', resolve: { words: LearnWordsResolver }, component: LearnWordsComponent }
      ] },
    ]
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
