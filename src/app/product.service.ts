import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map';


@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: any) {
    this.db.list('/products').push(product);
  }

  update(productId, product){
    return this.db.object('/products/' + productId).update(product);
  }

  getAll() {
    // Use snapshotChanges().map() to store the key
    return this.db.list('/products').snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  get(productId) {
    return this.db.object('/products/' + productId).valueChanges();
  }

  delete(productId){
    return this.db.object('/products/' + productId).remove();
  }
}
