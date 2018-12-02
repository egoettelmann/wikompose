import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxElectronModule } from 'ngx-electron';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FileService } from './services/file.service';
import { AppRoutingModule } from './app-routing.module';
import { KeyValuePipe } from '@angular/common';
import { ConfigurationService } from './services/configuration.service';
import { SettingsComponent } from './views/settings/settings.component';
import { HttpElectronService } from './services/http-electron.service';
import { ApiPrefixInterceptor } from './interceptors/api-prefix.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
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
    ConfigurationService,
    HttpElectronService,
    KeyValuePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
