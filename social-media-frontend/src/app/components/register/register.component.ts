import { Component, OnInit, NgZone } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    userName: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void { }

  onSubmit(e: any): void {
    e.preventDefault();
    this.authService
      .register(
        this.registerForm.value.firstName || '',
        this.registerForm.value.lastName || '',
        this.registerForm.value.email || '',
        this.registerForm.value.password || '',
        this.registerForm.value.userName || ''
      )
      .subscribe((_response) => {
        this.ngZone.run(() => {
        this.router.navigate(['login']);
      });
      });
  }
}
