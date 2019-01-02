import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '@app/shared';
import {UserRoutingModule} from '@app/user/user-routing.module';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserListComponent } from './user-list/user-list.component';
import {DataTableModule} from '@app/core/data-table/data-table.module';

@NgModule({
  declarations: [UserCreateComponent, UserListComponent],
  imports: [
    CommonModule,
    SharedModule,
    DataTableModule,
    UserRoutingModule
  ]
})
export class UserModule { }
