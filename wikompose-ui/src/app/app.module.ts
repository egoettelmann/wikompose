import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxElectronModule } from 'ngx-electron';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FileService } from './services/file.service';
import { AppRoutingModule } from './app-routing.module';
import { KeyValuePipe } from '@angular/common';

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
    AppRoutingModule
  ],
  providers: [
    FileService,
    KeyValuePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
