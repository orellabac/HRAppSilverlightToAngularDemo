/*****************************************************************************
 * Copyright (C) Mobilize.Net <info@mobilize.net> - All Rights Reserved
 *
 * This file is part of the Mobilize Frameworks, which is
 * proprietary and confidential.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Mobilize.Net Corporation.
 * The intellectual and technical concepts contained herein are
 * proprietary to Mobilize.Net Corporation and may be covered
 * by U.S. Patents, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Mobilize.Net Corporation.
 ******************************************************************************/

import { FrameworkElement } from '../../basecomponentmodel/FrameworkElement';
import { DependencyObject } from '../../basecomponentmodel/DependencyObject';
import { IList, SimpleList, IComparer } from '../../baseframework/collections';
import { SubscriptionEvent } from '../../utils/SubscriptionEvent';

export class ItemsControlModel extends FrameworkElement {
   public items : ItemsCollectionModel;
   public ItemsSource : any = null;
   constructor() {
       super();
       this.items = new ItemsCollectionModel();
   }
}

export abstract class PresentationFrameworkCollectionModel<T> 
                                  extends DependencyObject 
                                  implements IList<T> {
    public collectionChangeEvent : SubscriptionEvent<() => any> = new SubscriptionEvent<() => any>();
    private innerCollection = new SimpleList<T>();                                      
    getItem(index: number): T {
        return this.innerCollection.getItem(index);
    }
    setItem(index: number, value: T) {
        this.innerCollection.setItem(index, value);
    }
    indexOf(value: T) : number {
        return this.innerCollection.indexOf(value);
    }
    insert(index: number, value: T) {
        this.collectionChangeEvent.fire([]);
        this.innerCollection.insert(index, value);
    }
    removeAt(index: number) {
        this.collectionChangeEvent.fire([]);
        this.innerCollection.removeAt(index);
    }
    get count() : number {
        return this.innerCollection.count;
    }
    sort();
    sort(comparer : IComparer<T>);
    sort(comparer?) {
        this.innerCollection.sort(comparer);
    }
    add(value: T): void {
        if (value && 
            value instanceof Object &&
            value.hasOwnProperty &&
            value.hasOwnProperty("Parent")) {
            value['Parent'] = this;
        }
        this.innerCollection.add(value);
        this.collectionChangeEvent.fire([]);
    }
    clear(): void {
        this.innerCollection.clear();
        this.collectionChangeEvent.fire([]);
    }
    contains(value: T): boolean {
        return this.innerCollection.contains(value);
    }
    remove(value: T): void {
        this.innerCollection.remove(value);
        this.collectionChangeEvent.fire([]);
    }
    copyTo(target: T[], index: number): void {
        this.innerCollection.copyTo(target, index);
    }
    [Symbol.iterator](): Iterator<T, any, undefined> {
        return this.innerCollection[Symbol.iterator]();
    }
    get internalArray(): T[] {
        return this.innerCollection.internalArray;
    }

}

export class ItemsCollectionModel extends PresentationFrameworkCollectionModel<any> {

}
