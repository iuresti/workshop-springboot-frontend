import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {BoardComponent} from './components/board/board.component';
import {RouterModule, Routes} from '@angular/router';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {AuthGuard} from './guards/auth.guard';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './services/token.interceptor';
import {AuthInterceptor} from './services/auth.interceptor';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { BoardBlockComponent } from './components/board-block/board-block.component';
import { ColumnComponent } from './components/column/column.component';
import { CardComponent } from './components/card/card.component';

const ROUTES: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'board/:id', component: BoardComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BoardComponent,
    SpinnerComponent,
    NavBarComponent,
    HomeComponent,
    BoardBlockComponent,
    ColumnComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
