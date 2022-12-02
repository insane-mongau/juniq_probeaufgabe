import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Components
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

// Material
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [FooterComponent, HeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatSnackBarModule,
    MatTableModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatSortModule,
    MatDividerModule,
    MatIconModule,
  ],
  exports: [
    FormsModule,
    FooterComponent,
    HeaderComponent,
    MatSnackBarModule,
    MatTableModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatSortModule,
    MatDividerModule,
    MatIconModule,
  ],
})
export class SharedModule {}
