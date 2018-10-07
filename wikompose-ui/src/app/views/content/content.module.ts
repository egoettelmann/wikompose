import { NgModule } from '@angular/core';
import { ContentComponent } from './content.component';
import { MarkdownModule } from 'ngx-markdown';
import { ContentRoutingModule } from './content-routing.module';

@NgModule({
  declarations: [
    ContentComponent
  ],
  imports: [
    ContentRoutingModule,
    MarkdownModule.forRoot()
  ]
})
export class ContentModule {
}
