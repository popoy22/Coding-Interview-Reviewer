import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddReviewerPage } from './add-reviewer.page';

const routes: Routes = [
  {
    path: '',
    component: AddReviewerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddReviewerPageRoutingModule {}
