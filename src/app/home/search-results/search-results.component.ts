import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {SearchService} from '../../providers/search.service';
import {LoadingController} from '@ionic/angular';
import {ItemModel} from '../../models/data';
import {CartService} from '../../providers/cart.service';

interface SearchResultsModel {
  hits: ItemModel[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  query: string;
  params: string;
  processingTimeMS: number;
}

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
    appName = environment.appName;
    searchQuery;
  showErrorPage: any;
  private loader: HTMLIonLoadingElement;
  itemResultsMeta: SearchResultsModel;
  constructor(private route: ActivatedRoute,
              public searchService: SearchService,
              public cartService: CartService,
              private loadingController: LoadingController) { }

  ngOnInit() {
    // reset error page
    this.showErrorPage = false;
    // get query
    this.route.queryParams
        .subscribe(queryParams => {
          console.log(queryParams);
          this.searchQuery = queryParams.query;
          // search results
          if (!this.itemResultsMeta) {
            this.search();
          }
        });
  }

  async search() {
    // return if no search result
    if (!this.searchQuery) {
      return;
    }
    // show loader
    await this.showLoader();
    // searching
    this.searchService.search(this.searchQuery)
        .then((data) => {
          console.log(data);
          this.itemResultsMeta = data;
        }).catch(err => {
          this.showErrorPage = true;
        }).finally(() => {
      this.loader.dismiss();
    });
  }
  /*
    * Add to cart*/
  addToCart(item: ItemModel) {
    this.cartService.add({
      id: item.id,
      imageUrl: item.imageUrl,
      name: item.name,
      unitPrice: item.unitPrice,
      units: item.units,
      quantity: 1,
      totalAmount: item.unitPrice
    });
  }
  /*show loader*/
  private async showLoader() {
    this.loader = await this.loadingController.create({
      message: 'Please wait..'
    });
    await this.loader.present();
  }
}
