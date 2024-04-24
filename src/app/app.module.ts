import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiPrefixInterceptor } from './core/config/api-prefix.interceptor';
import { StyleManager } from './shared/services/style-manager/style-manager.service';
import { SharedModule } from './shared/shared.module';
import { JwtModule } from '@auth0/angular-jwt';
// import { GlobalWowResourceAppComponent } from './modules/global-wow-videos-app/global-wow-videos-app/global-wow-videos-app.component';

export function tokenGetter() {
  return sessionStorage.getItem('access_token');
}
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        // disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true,
    },
    StyleManager,
  ],  bootstrap: [AppComponent]
})
export class AppModule { }
