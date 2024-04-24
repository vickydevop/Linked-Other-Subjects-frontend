import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobalWowFlashcardsComponent } from './global-wow-flashcards/global-wow-flashcards.component';

const routes: Routes = [
  {path:'',redirectTo:'global-wow-flashcards',pathMatch:'full'},
  {path:'global-wow-flashcards',component:GlobalWowFlashcardsComponent,
  children:[]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlobalWowFlashcardsAppRoutingModule { }
