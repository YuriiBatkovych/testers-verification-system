import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http'
import { ProductService  } from './services/product.service';

import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginStatusComponent } from './components/login-status/login-status.component';

import { AuthModule } from '@auth0/auth0-angular';
import appConfig from './config/app-config';
import { MembersPageComponent } from './components/members-page/members-page.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { StaffAccessorsComponent } from './components/staff-accessors/staff-accessors.component';
import { ProductEditionComponent } from './components/product-edition/product-edition.component';
import { CategoryEditionComponent } from './components/category-edition/category-edition.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { UserEditionComponent } from './components/user-edition/user-edition.component';
import { BugDeclareComponent } from './components/bug-declare/bug-declare.component';

const routes: Routes = [
  {path: 'members', component: MembersPageComponent},
  {path: 'order-history', component: OrderHistoryComponent},

  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'products/:id/edit', component: ProductEditionComponent},
  {path: 'add/product', component: ProductEditionComponent},
  {path: 'add/category', component: CategoryEditionComponent},
  {path: 'edit/category', component: CategoryEditionComponent},
  {path: 'delete/category', component: CategoryEditionComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'users', component: UserManagementComponent},
  {path: 'users/:id/edit', component: UserEditionComponent},
  {path: 'users/add', component: UserEditionComponent},
  {path: '', redirectTo: '/products', pathMatch:'full'},
  {path: '**', redirectTo: '/products', pathMatch:'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginStatusComponent,
    MembersPageComponent,
    OrderHistoryComponent,
    StaffAccessorsComponent,
    ProductEditionComponent,
    CategoryEditionComponent,
    UserManagementComponent,
    UserEditionComponent,
    BugDeclareComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    AuthModule.forRoot({
      domain: appConfig.oktaConfig.domain,
      clientId: appConfig.oktaConfig.clientId,
      authorizationParams: appConfig.oktaConfig.authorizationParams
    })
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
