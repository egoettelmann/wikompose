import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content.component';

@NgModule({
  imports: [
    RouterModule.forChild(ContentRoutingModule.ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class ContentRoutingModule {

  public static ROUTES: Routes = [
    { path: '', component: ContentComponent }
  ];

}
