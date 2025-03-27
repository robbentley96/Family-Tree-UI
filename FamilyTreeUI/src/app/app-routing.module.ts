import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonComponent } from './person/person/person.component';
import { PersonListComponent } from './person/person-list/person-list.component';
import { PersonFormComponent } from './person/person-form/person-form.component';

const routes: Routes = [
  { path:  '', component:  PersonListComponent},
  { path:  'person/new', component:  PersonFormComponent},
  { path:  'person/edit/:id', component:  PersonFormComponent},
  { path:  'person/:id', component:  PersonComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
