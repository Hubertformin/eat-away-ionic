import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../../providers/auth.service';
import {StorageService} from '../../../providers/storage.service';
import {LoadingController} from '@ionic/angular';
import {ToastService} from '../../../providers/toast.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  accountForm = this.fb.group({
    email: ['', [Validators.email]],
    password: ['', Validators.required]
  });
  isLoading: boolean;

  constructor(private fb: FormBuilder,
              public loadingController: LoadingController,
              private toast: ToastService,
              private router: Router,
              private auth: AuthService, private storage: StorageService) { }

  ngOnInit() {
  }

  async loginUser() {
    if (this.accountForm.invalid) {
      this.accountForm.markAllAsTouched();
      return;
    }
    // set states
    // toggle loader
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await loading.present();
    // auth users
    this.auth.loginUser(this.accountForm.value.email, this.accountForm.value.password)
        .subscribe(async (user) => {
          // change status
          this.isLoading = false;
          loading.dismiss();
          // get user data from db
          if (user.length === 0) {
            this.toast.notify('Wrong email or password', 3000, 'light');
            return;
          }
          await this.storage.setUserAccount(user[0])
              .catch(err => {
                console.error(err);
              });
          this.router.navigate(['/tabs/home']);
        }, (err) => {
          this.toast.notify(err);
          // change status
          this.isLoading = false;
          loading.dismiss();
        });
  }
}
