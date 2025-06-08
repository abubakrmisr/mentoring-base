import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-creat-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './creat-user-form.component.html',
  styleUrls: ['./creat-user-form.component.scss']
})
export class CreatUserFormComponent {
  public form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    website: new FormControl('', [Validators.required, Validators.minLength(3)]),
    companyName: new FormControl('', [Validators.required, Validators.minLength(2)])
  })

  @Output()
  createUser = new EventEmitter();

  
  public submitForm(): void {
    this.createUser.emit(this.form.value)
    this.form.reset();
  }
}
