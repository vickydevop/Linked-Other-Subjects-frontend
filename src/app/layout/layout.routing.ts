import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

// const routes: Routes = [
//     {
//         path: '', component: LayoutComponent,
//         children: [
//             { path: '', loadChildren: () => import("../modules/global-wow-flashcards-app/global-wow-flashcards-app.module").then(m => m.GlobalWowFlashcardsAppModule) }
//         ]
//     }
// ];

const routes: Routes = [
    {
      path: '',
      component: LayoutComponent,
      children: [
        {
          path: 'login-page',
          loadChildren: () =>
          import("../modules/global-wow-flashcards-app/global-wow-flashcards-app.module").then(m => m.GlobalWowFlashcardsAppModule)
        },
      ],
    },
  ];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
