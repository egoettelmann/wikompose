import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditContentComponent } from './edit/edit-content.component';
import { ViewContentComponent } from './view/view-content.component';
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
    {
      path: '',
      component: ContentComponent,
      children: [
        { path: 'view', component: ViewContentComponent },
        { path: 'edit', component: EditContentComponent }
      ]
    }
  ];

}
