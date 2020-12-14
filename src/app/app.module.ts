import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfigFormComponent } from './config-form/config-form.component';
import { EntryFormComponent } from './config-form/entry-form/entry-form.component';
import { ExitFormComponent } from './config-form/exit-form/exit-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfigFormComponent,
    EntryFormComponent,
    ExitFormComponent
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
