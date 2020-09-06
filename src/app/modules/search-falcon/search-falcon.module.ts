import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchFalconRoutingModule } from './search-falcon-routing.module';
import { FindingFalconComponent } from './components/finding-falcon/finding-falcon.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { CatchedFalconComponent } from './components/catched-falcon/catched-falcon.component';


@NgModule({
  declarations: [
    FindingFalconComponent,
    CatchedFalconComponent
  ],
  imports: [
    CommonModule,
    SearchFalconRoutingModule,
    FlexLayoutModule,
    MatAutocompleteModule, 
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SelectAutocompleteModule,
    MatRadioModule
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2000}}
  ]
})
export class SearchFalconModule { }
