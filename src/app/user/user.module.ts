import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '@app/shared';
import {UserRoutingModule} from '@app/user/user-routing.module';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserListComponent } from './user-list/user-list.component';
import {DataTableModule} from '@app/core/data-table/data-table.module';
import { UserFormComponent } from './user-form/user-form.component';
import { UserComponent } from './user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserSecurityComponent } from './user-security/user-security.component';
import { UserPermissionsComponent } from './user-permissions/user-permissions.component';
import {SharedUserService} from '@app/user/shared-user.service';

@NgModule({
  declarations: [UserCreateComponent, UserListComponent, UserFormComponent, UserComponent, UserDetailsComponent, UserSecurityComponent, UserPermissionsComponent],
  imports: [
    CommonModule,
    SharedModule,
    DataTableModule,
    UserRoutingModule
  ],
  providers: [SharedUserService]
})
export class UserModule { }
