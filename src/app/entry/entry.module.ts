import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SharedModule } from '@app/shared';
import { EntryRoutingModule } from '@app/entry/entry-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [LoginComponent, SignUpComponent, WelcomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    EntryRoutingModule,
    FormsModule
  ]
})
export class EntryModule {}
