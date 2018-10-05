import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxElectronModule } from 'ngx-electron';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MarkdownModule } from 'ngx-markdown';
import { NavigationComponent } from './navigation/navigation.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FileService } from './services/file.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxElectronModule,
    MarkdownModule.forRoot({
      loader: HttpClient
    })
  ],
  providers: [
    FileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
