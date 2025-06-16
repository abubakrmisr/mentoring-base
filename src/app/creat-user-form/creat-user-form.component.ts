import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CreateUser } from '../intefaces/users.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-creat-user-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './creat-user-form.component.html',
  styleUrls: ['./creat-user-form.component.scss'],
})
export class CreatUserFormComponent {
  public form = new FormGroup({
    id: new FormControl<number>(new Date().getTime(), {nonNullable:true, validators: [Validators.required]}),
    name: new FormControl('', {nonNullable:true, validators: [Validators.minLength(2), Validators.required]}),
    email: new FormControl('', {nonNullable:true, validators: [Validators.email, Validators.required]}),
    website: new FormControl('', {nonNullable:true, validators: [Validators.minLength(3), Validators.required]}),
    companyName: new FormControl('', {nonNullable:true, validators: [Validators.minLength(2), Validators.required]}),
  });

  @Output()
  createUser = new EventEmitter<CreateUser>();

  public submitForm(): void {
    const user: CreateUser = this.form.getRawValue();
    this.createUser.emit(user);
    this.form.reset();
  }
}
