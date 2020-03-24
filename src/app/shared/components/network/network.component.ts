import {Component, OnInit} from '@angular/core';

import { Plugins } from '@capacitor/core';

const { Network } = Plugins;
@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss'],
})
export class NetworkComponent implements OnInit {
  networkError = false;

  constructor() { }

  ngOnInit() {
    // check for network status
    Network.getStatus()
        .then(status => {
          this.onNetworkStatus(status);
        });
    // listen to network changes
    Network.addListener('networkStatusChange', (status) => {
      this.onNetworkStatus(status);
    });
  }
  /**/
  private onNetworkStatus(status) {
    this.networkError = !status.connected;
  }
}
