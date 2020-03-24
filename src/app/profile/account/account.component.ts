import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StorageService} from '../../providers/storage.service';
import {DbService} from '../../providers/db.service';
import {LoadingController} from '@ionic/angular';
import {UserModel} from '../../models/data';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
    appName = environment.appName;
    accountForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
        dateOfBirth: ['', Validators.required],
    });
    showErrorPage: boolean;
    currentUser: UserModel;

    constructor(private fb: FormBuilder,
                public loadingController: LoadingController,
                private storage: StorageService, private db: DbService) {
    }

    ngOnInit() {
        this.initPage();
    }
    /*init page*/
    async initPage() {
        // show loader
        const loading = await this.loadingController.create({
            message: 'Please wait...'
        });
        await loading.present();
        this.storage.getCurrentUser()
            .then(user => {
                console.log(user);
                // get user from remote
                this.db.getUser(user.id)
                    .subscribe(newUser => {
                        this.currentUser = newUser;
                        this.accountForm.patchValue({
                            name: newUser.name,
                            email: newUser.email,
                            phoneNumber: newUser.phoneNumber,
                            dateOfBirth:
                                `${newUser.dateOfBirth.getFullYear()}-${newUser.dateOfBirth.getMonth()}-${newUser.dateOfBirth.getDate()}`
                        });
                        // update storage settings
                        this.storage.setUserAccount(newUser);
                        // remove loading screen
                        loading.dismiss();
                    }, err => {
                        this.showErrorPage = true;
                        // remove loading screen
                        loading.dismiss();
                    });
            });
    }
    onSaveForm() {
        // update user profile
        if (this.accountForm.invalid) {
            this.accountForm.markAsTouched();
            return;
        }
        // save user profile
        this.db.updateUser(this.currentUser.id, this.accountForm.value);
    }
}
