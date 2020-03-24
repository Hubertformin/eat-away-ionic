import { Injectable } from '@angular/core';
import { environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  algoliaRestUrl = `https://${environment.algoliaApplicationId}-dsn.algolia.net/1/indexes/eat_away_index`;
  constructor() { }
  /*
  * Search index
  * */
  search(query: string) {
    return fetch(`${this.algoliaRestUrl}?query=${query}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'X-Algolia-Application-Id': environment.algoliaApplicationId,
        'X-Algolia-API-Key': environment.algoliaAdminKey
        // 'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      // body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then(response => response.json());
  }
}
