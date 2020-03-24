import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, ValidationErrors, Validators} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {LoadingController} from '@ionic/angular';
import {ToastService} from '../../providers/toast.service';
import {AuthService} from '../../providers/auth.service';
import {StorageService} from '../../providers/storage.service';
import {Router} from '@angular/router';
import {UserModel} from '../../models/data';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  accountForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
    dateOfBirth: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, this.matchValues('password')]]
  });
  appName = environment.appName;
  isLoading: boolean;

  constructor(private fb: FormBuilder,
              public loadingController: LoadingController,
              private toast: ToastService,
              private auth: AuthService,
              private router: Router,
              private storage: StorageService
              ) { }

  public matchValues(
      matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
      !!control.parent.value &&
      control.value === control.parent.controls[matchTo].value
          ? null
          : { isMatching: false };
    };
  }
  ngOnInit() {
  }

  /* save data*/
  async submit() {
    if (this.accountForm.invalid) {
      this.accountForm.markAllAsTouched();
      return;
    }
    // toggle loader
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await loading.present();
    // create payload
    const payload: UserModel = {
      name: this.accountForm.value.name,
      phoneNumber: this.accountForm.value.phoneNumber,
      email: this.accountForm.value.email,
      dateOfBirth: new Date(this.accountForm.value.dateOfBirth),
      password: this.accountForm.value.password
    };
    // create account
    this.auth.createUser(payload)
        .then(async (user) => {
          console.log(user);
          // set storage
          await this.storage.setUserAccount(user)
              .catch((err) => {
                // TODO: Remove console.error
                console.error(err);
              });
          this.router.navigate(['/tabs/home']);
        }).catch(err => {
      this.toast.notifyFirebaseError(err.message, 3000);
    }).finally(() => {
      this.isLoading = false;
      loading.dismiss();
    });
  }

}
