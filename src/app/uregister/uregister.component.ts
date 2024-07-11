import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router,RouterOutlet} from '@angular/router'
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { AuthService } from '../../auth.service';

export function passwordStrengthValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.value;
    if (!password || password.length < minLength) {
      return { 'passwordStrength': { requiredLength: minLength, actualLength: password ? password.length : 0 } };
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

    if (!(hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar)) {
      return { 'passwordStrength': true };
    }

    return null;
  };
}

@Component({
  selector: 'app-uregister',
  standalone: true,
  imports: [CommonModule,RouterOutlet,ReactiveFormsModule],
  templateUrl: './uregister.component.html',
  styleUrl: './uregister.component.css'
})
export class UregisterComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService,private router:Router) {
      this.registerForm = this.formBuilder.group({
        uname: ['', Validators.required],
        ps: ['', [Validators.required,passwordStrengthValidator(8)]],
        ph: ['', Validators.required],
        em_id: ['', [Validators.required, Validators.email]],
    });
  }

  registerUser(){
    if (this.registerForm.valid) {
      this.apiService.registerUser(this.registerForm.value).subscribe(
        response => {
          console.log("User registered successfully", response);
          alert("User registered successfully");
          this.router.navigateByUrl('/login')
        },
        error => {
          console.error("Error registering user", error);
          alert("Error registering user");
          this.registerForm.reset();
        }
      );
    } else {
      alert("Form is invalid. Please check your inputs.");
    }
  }

}
