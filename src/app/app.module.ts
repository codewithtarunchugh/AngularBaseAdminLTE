import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
//import { TokenInterceptor } from './interceptor/token.interceptor';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { LoadingInterceptor } from './interceptor/loading.interceptor';
import { SanitizeHtmlPipe } from './core/pipe/sanitize-html-pipe.pipe';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/pages/login/login.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { Dashboard2Component } from './components/pages/dashboard2/dashboard2.component';
import { Dashboard3Component } from './components/pages/dashboard3/dashboard3.component';
import { PageEditorComponent } from './components/pages/page-editor/page-editor.component';
//import { LocalDataServiceService } from './core/services/LocalDataService/local-data-service.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    Dashboard2Component,
    Dashboard3Component,
    PageEditorComponent,
    NotFoundComponent,
    SanitizeHtmlPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    // LocalDataServiceService,
    // {
    // provide: HTTP_INTERCEPTORS,
    //useClass: TokenInterceptor,
    // multi: true,
    //},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
