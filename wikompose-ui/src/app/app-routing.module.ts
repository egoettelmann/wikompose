import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot(AppRoutingModule.ROUTES, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

  public static ROUTES: Routes = [
    { path: 'content', loadChildren: './views/content/content.module#ContentModule' }
  ];

}
