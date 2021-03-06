import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule, MatPaginatorModule,
  MatRadioModule,
  MatSliderModule,
  MatStepperModule,
  MatTableModule
} from '@angular/material/';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faUserCircle,
  faPowerOff,
  faCog,
  faPlayCircle,
  faRocket,
  faPlus,
  faEdit,
  faTrash,
  faTimes,
  faCaretUp,
  faCaretDown,
  faExclamationTriangle,
  faFilter,
  faTasks,
  faCheck,
  faSquare,
  faLanguage,
  faPaintBrush,
  faLightbulb,
  faWindowMaximize,
  faStream,
  faBook
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faMediumM,
  faTwitter,
  faInstagram,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';

library.add(
  faBars,
  faUserCircle,
  faPowerOff,
  faCog,
  faRocket,
  faPlayCircle,
  faGithub,
  faMediumM,
  faTwitter,
  faInstagram,
  faYoutube,
  faPlus,
  faEdit,
  faTrash,
  faTimes,
  faCaretUp,
  faCaretDown,
  faExclamationTriangle,
  faFilter,
  faTasks,
  faCheck,
  faSquare,
  faLanguage,
  faPaintBrush,
  faLightbulb,
  faWindowMaximize,
  faStream,
  faBook
);

import { BigInputComponent } from './big-input/big-input.component';
import { BigInputActionComponent } from './big-input/big-input-action.component';
import { LayoutModule } from '@angular/cdk/layout';
import {PageLoaderModule} from '@app/shared/page-loader/page-loader.module';
import {NgxPermissionsModule} from 'ngx-permissions';
import {InspectionDialog, RawViewComponent} from './raw-view/raw-view.component';
import {KongFormComponent} from '@app/shared/kong-form/kong-form.component';
import { KongEntityModalComponent } from './kong-entity-modal/kong-entity-modal.component';
import {FilterPipe} from '@app/shared/pipes/filter.pipe';
import { KongFormFieldsComponent } from './kong-form-fields/kong-form-fields.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TranslateModule,

    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatRadioModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatCardModule,
    MatChipsModule,
    MatBadgeModule,
    MatListModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    LayoutModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatStepperModule,
    MatPaginatorModule,
    MatGridListModule,

    FontAwesomeModule,
    PageLoaderModule,
    // Specify your library as an import
    NgxPermissionsModule
  ],
  entryComponents: [InspectionDialog, KongEntityModalComponent, KongFormFieldsComponent],
  declarations: [FilterPipe, BigInputComponent, BigInputActionComponent, RawViewComponent, InspectionDialog, KongFormComponent, KongEntityModalComponent, KongFormFieldsComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TranslateModule,

    MatDialogModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatChipsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,

    MatGridListModule,

    FontAwesomeModule,

    BigInputComponent,
    BigInputActionComponent,
    PageLoaderModule,
    NgxPermissionsModule,
    RawViewComponent,
    KongFormComponent,
    KongEntityModalComponent,
    FilterPipe
  ]
})
export class SharedModule {}
