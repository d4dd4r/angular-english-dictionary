import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { MyComponent } from './components/my/my.component';
import { DictionaryComponent } from './components/my/dictionary/dictionary.component';
import { ExercisesComponent } from './components/my/exercises/exercises.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/my' },
  { path: 'login', component: LoginComponent },
  {
    path: 'my',
    component: MyComponent,
    children: [
      { path: 'dictionary', component: DictionaryComponent },
      { path: 'exercises', component: ExercisesComponent },
    ]
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
