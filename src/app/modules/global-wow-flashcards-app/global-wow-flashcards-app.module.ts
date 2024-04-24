import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlobalWowFlashcardsAppRoutingModule } from './global-wow-flashcards-app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShowBackgroundImageComponent } from './Components/show-background-image/show-background-image.component';
import { WowResourceTableComponent } from './global-wow-flashcards/wow-resource-table/wow-resource-table.component';
import { GlobalWowFlashcardsComponent } from './global-wow-flashcards/global-wow-flashcards.component';
import { AppAdministratorListComponent } from './app-administrator-list/app-administrator-list.component';
import { EditGlobalCourseComponent } from './global-wow-flashcards/edit-global-course/edit-global-course.component';
import { WowFlashCardsComponent } from './global-wow-flashcards/wow-flash-cards/wow-flash-cards.component';

@NgModule({
  declarations: [
    ShowBackgroundImageComponent,
    WowResourceTableComponent,
    GlobalWowFlashcardsComponent,
    AppAdministratorListComponent,
    EditGlobalCourseComponent,
    WowFlashCardsComponent
  ],
  imports: [CommonModule, SharedModule, GlobalWowFlashcardsAppRoutingModule],
})
export class GlobalWowFlashcardsAppModule {}
