import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AuthComponent,
    SignInComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, HttpClientModule, FormsModule, NgOptimizedImage, MatIconModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
})
export class AuthModule {}
