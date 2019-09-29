import { NgModule } from '@angular/core';
import {MatInputModule, MatCardModule, MatFormFieldModule, MatButtonModule, MatToolbarModule, MatGridListModule, MatIconModule, MatProgressSpinnerModule, MatTableModule, MatPaginatorModule} from '@angular/material';

@NgModule({
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule
    
  ],
  exports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule
  ],
})
export class MaterialModule { }
