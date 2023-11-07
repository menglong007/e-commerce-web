import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClickOutsideDirective} from './directives/click-outside.directive';
import {LoadingTextDirective} from "./directives/loading-text.directive";
import {AddButtonComponent} from './components/add-button/add-button.component';
import {MatIconModule} from "@angular/material/icon";
import {SearchButtonComponent} from "./components/search-button/search-button.component";
import {SearchComponent} from './components/search/search.component';
import {CloseButtonComponent} from './components/close-button/close-button.component';
import {DialogHeaderComponent} from './components/dialog-header/dialog-header.component';
import {SaveButtonComponent} from "./components/save-button/save-button.component";
import {SafePipe} from "./pipes/safe.pipe";
import {StatusComponent} from "./components/status/status.component";
import {TagComponent} from "./components/tag/tag.component";
import {DialogModule} from "../../core/services/dialog/dialog.module";

@NgModule({
  declarations: [
    ClickOutsideDirective,
    LoadingTextDirective,
    AddButtonComponent,
    SearchButtonComponent,
    SearchComponent,
    CloseButtonComponent,
    DialogHeaderComponent,
    SaveButtonComponent,
    SafePipe,
    StatusComponent,
    TagComponent
  ],
  imports: [CommonModule, MatIconModule, DialogModule,],
  exports: [ClickOutsideDirective,
    SafePipe,
    LoadingTextDirective,
    AddButtonComponent,
    SearchButtonComponent,
    SearchComponent,
    CloseButtonComponent,
    DialogHeaderComponent,
    SaveButtonComponent,
    DialogModule,
    StatusComponent,
    TagComponent
  ],
})
export class SharedModule {
}
