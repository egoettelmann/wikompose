import { NgModule } from '@angular/core';
import { ContentComponent } from './content.component';
import { MarkdownModule } from 'ngx-markdown';
import { AceEditorModule } from 'ng2-ace-editor';
import { ContentRoutingModule } from './content-routing.module';
import { FormsModule } from '@angular/forms';
import { EditContentComponent } from './edit/edit-content.component';
import { ViewContentComponent } from './view/view-content.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ContentComponent,
    EditContentComponent,
    ViewContentComponent
  ],
  imports: [
    ContentRoutingModule,
    CommonModule,
    FormsModule,
    AceEditorModule,
    MarkdownModule.forRoot()
  ]
})
export class ContentModule {
}
