import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }
  
  showSnack(message: string, duration: number = 3000): void {
    this.snackBar.open(message, 'OK', { duration });
  }

}
