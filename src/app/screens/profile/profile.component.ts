import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {StorageService} from '../../providers/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    appName = environment.appName;

  constructor(private storage: StorageService) { }

  ngOnInit() {
  }

}
