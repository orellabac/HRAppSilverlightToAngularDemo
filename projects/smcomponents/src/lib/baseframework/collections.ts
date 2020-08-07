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

import { SubscriptionEvent } from '../utils';
import { INotifyPropertyChanged } from '../basecomponentmodel/INotifyPropertyChanged';

export interface IEqualityComparer<T> {
    Equals(x : T, y : T) : boolean;
    GetHashCode(x : T) : number;
}

export interface IComparer<T> {
    Compare(x : T, y : T) : number;
}


export interface IComparable<T> {
    CompareTo(x : T) : number;
}

export interface IEquatable<T> {
    Equals(other : T) : boolean;
}


export interface ISupportCollection<T> {
    internalArray: Array<T>;
}

export interface UnTypedIterable {
}

export interface IUntypedCollection {

}

export interface ICollection<T> extends Iterable<T>, ISupportCollection<T> {
    count: number;
    add(value: T): void;
    clear(): void;
    contains(value: T): boolean;
    remove(value: T): void;
    copyTo(target: Array<T>, index: number): void;
}

export interface IList<T> extends ICollection<T> {
    getItem(index: number): T;
    setItem(index: number, value: T);
    indexOf(value: T) : number;
    insert(index: number, value: T);
    removeAt(index: number);
    sort();
    sort(comparer : IComparer<T>);
}

export class SimpleList<T> implements IList<T> {
    internalArray: T[] = [];

    constructor()
    constructor(initialValues: Iterable<T>)
    constructor(capacity: number)
    constructor(arg? : unknown) {
        const newLocal = typeof arg;
        // capacity argument still not supported
        if (newLocal != "undefined" && newLocal != "number") {
            let initialValues = arg as Iterable<T>;
            this.internalArray = [...initialValues];
        }
    }

    getItem(index: number): T {
        if (index > this.internalArray.length || index < 0) {
            throw new Error("Invalid index");
        }
        return this.internalArray[index];
    }
    setItem(index: number, value: T) {
        if (index > this.internalArray.length || index < 0) {
            throw new Error("Invalid index");
        }
        this.internalArray[index] = value;
    }
    indexOf(value: T) {
        return this.internalArray.indexOf(value);
    }
    insert(index: number, value: T) {
        this.internalArray.splice(index, 0, value);
    }
    removeAt(index: number) {
        this.internalArray.splice(index, 1);
    }

    get count(): number {
        return this.internalArray.length;
    }

    add(value: T): void {
        this.internalArray.push(value);
    }
    clear(): void {
        this.internalArray.splice(0, this.internalArray.length);
    }
    contains(value: T): boolean {
        return this.internalArray.indexOf(value) != -1;
    }
    remove(value: T): void {
        let idx = this.internalArray.indexOf(value);
        if (idx !== -1) {
            this.internalArray.splice(idx, 1);
        }
    }

    sort();
    sort(comparer : IComparer<T>);
    sort(comparer?) {
        throw Error("Not implemented");
    }

    copyTo(target: T[], index: number): void {
        for (let i = index; i < target.length; i++) {
            target[i] = this.internalArray[i];
        }
    }

    [Symbol.iterator](): Iterator<T, any, undefined> {
        return this.internalArray[Symbol.iterator]();
    }
}

export interface ISimpleDictionary<K, V> extends ICollection<[K, V]> {
    getItem(key : K) : V;
    setItem(key : K, value : V) : void;
    keys : ICollection<K>;
    values : ICollection<V>;
    addEntry(key : K, value : V);
    hasKey(key : K);
    removeEntry(key : K);
    tryGetValue(key : K, value : (v:V) => void);    
}

export class SimpleDictionary<K,V> implements ISimpleDictionary<K, V> {
    private internalMap : Map<K,V>;
    constructor() {
       this.internalMap = new Map<K, V>();
    }

    getItem(key : K) : V {
        if (this.internalMap.has(key)) {
            return this.internalMap.get(key);
        } else {
            return null;
        }
    }
    setItem(key : K, value : V) : void {
        this.internalMap.set(key, value);
    }
    get keys() : ICollection<K> {
        return new SimpleList(this.internalMap.keys());
    }
    get values(): ICollection<V> {
        return new SimpleList(this.internalMap.values());
    }
    addEntry(key: K, value: V) {
        this.internalMap.set(key, value);
    }
    hasKey(key: K) {
        return this.internalMap.has(key);
    }
    removeEntry(key: K) {
        this.internalMap.delete(key);
    }
    tryGetValue(key: K, value: (v: V) => void) {
        if (this.internalMap.has(key)) {
            value(this.internalMap.get(key));
            return true;
        } else {
            return false;
        }
    }
    get count(): number {
        return this.internalMap.size;
    }
    add(value: [K, V]): void {
        this.internalMap.set(value[0], value[1]);
    }
    clear(): void {
        this.internalMap.clear();
    }
    contains(value: [K, V]): boolean {
        // TODO implementation pending
        return false;
    }
    remove(value: [K, V]): void {
        // TODO implementation pending
    }
    copyTo(target: [K, V][], index: number): void {
        throw new Error("Method not implemented.");
    }
    [Symbol.iterator](): Iterator<[K, V], any, undefined> {
        return this.internalArray[Symbol.iterator]();
    }
    get internalArray(): [K, V][]  {
        return [...this.internalMap];
    }
}

export class CollectionChangeInfo {
    // stub properties
    public NewItems : any;
    public OldItems : any;
    constructor(public action : CollectionChangeAction) {
    }
}
export enum CollectionChangeAction {
    Add,
    Remove,
    Replace,
    Reset
}
export interface  INotifyCollectionChanged {
    CollectionChanged : SubscriptionEvent<(e : any, args : CollectionChangeInfo) => void>;
}

export class ObjectModelCollection<T> extends SimpleList<T> {

}

export class ObservableCollection<T>
               extends ObjectModelCollection<T> 
               implements INotifyPropertyChanged {
    public PropertyChanged: SubscriptionEvent<(e: any, args: { PropertyName: string; }) => void> = new SubscriptionEvent();    
    public CollectionChanged : SubscriptionEvent<(e : any, args : CollectionChangeInfo) => void> = new SubscriptionEvent();    
    protected onCollectionChanged(info : CollectionChangeInfo) {
        this.CollectionChanged.fire([this, info]);
    }
    protected onPropertyChanged(info : { PropertyName: string; }) {
        this.PropertyChanged.fire([this, info]);
    }

    insert(index: number, value: T) {
        super.insert(index, value);
        this.onCollectionChanged(new CollectionChangeInfo(CollectionChangeAction.Add));
        this.onPropertyChanged({PropertyName: "Count"});
    }
    remove(value : T) {
        super.remove(value);
        this.onCollectionChanged(new CollectionChangeInfo(CollectionChangeAction.Remove));
        this.onPropertyChanged({PropertyName: "Count"});
    }
    removeAt(index: number) {
        super.removeAt(index);
        this.onCollectionChanged(new CollectionChangeInfo(CollectionChangeAction.Remove));
        this.onPropertyChanged({PropertyName: "Count"});
    }
            
    add(value: T): void {
        super.add(value);
        this.onCollectionChanged(new CollectionChangeInfo(CollectionChangeAction.Add));
        this.onPropertyChanged({PropertyName: "Count"});
    }
    clear(): void {
        super.clear();
        this.onCollectionChanged(new CollectionChangeInfo(CollectionChangeAction.Remove));
        this.onPropertyChanged({PropertyName: "Count"});
    }
    setItem(index: number, value: T) {
        super.setItem(index, value);
        this.onCollectionChanged(new CollectionChangeInfo(CollectionChangeAction.Replace));
    }
}



export class ReadonlyCollection<T> extends SimpleList<T> {
    
    constructor(contents : Iterable<T>) {
        super(contents);
    }

    insert(index: number, value: T) {
        throw Error("Operation not supported");
    }
    remove(value : T) {
        throw Error("Operation not supported");
    }
    removeAt(index: number) {
        throw Error("Operation not supported");
    }
            
    add(value: T): void {
        throw Error("Operation not supported");
    }
    clear(): void {
        throw Error("Operation not supported");
    }
    setItem(index: number, value: T) {
        throw Error("Operation not supported");
    }
}


//
// IterUtils
//

export function iuToArray<T>(iterable: Iterable<T>): Array<T> {
    return [...iterable];
}

class SelectIteratorWrapper<T, K> implements Iterator<K> {
    private index = 0;
    constructor(private innerIterator: Iterator<T>,
        private funcWithIndex?: (e: T, i?: number) => K) {
    }
    next(): IteratorResult<K, any> {
        let nextValue = this.innerIterator.next();
        if (!nextValue.done) {
            return { value: this.funcWithIndex(nextValue.value, this.index++), done: false };
        }
        return { value: undefined, done: true };
    }
}

export function iuSelect<T, K>(func: (e: T, i? : number) => K, iterable: Iterable<T>): Iterable<K> {
    return {
        [Symbol.iterator]() {
            return new SelectIteratorWrapper(iterable[Symbol.iterator](), func);
        }
    }
}

class WhereIteratorWrapper<T> implements Iterator<T> {
    constructor(private innerIterator: Iterator<T>,
                private predicate: (e: T) => boolean) {
    }
    next(value?: any): IteratorResult<T, any> {
        let next = this.innerIterator.next();
        while (!next.done && !this.predicate(next.value)) {
            next = this.innerIterator.next();
        }
        return next;
    }
}

export function iuWhere<T>(predicate: (e: T) => boolean,
                           iterable: Iterable<T>)
                : Iterable<T> {
    return {
        [Symbol.iterator]() {
            return new WhereIteratorWrapper(iterable[Symbol.iterator](),
                predicate);
        }
    };
}

export function iuFirst<T>(iterable: Iterable<T>,
                           predicate?: (e: T) => boolean): T {
    if (iterable instanceof Array
        && iterable.length > 0
        && (typeof predicate === "undefined"
            || predicate(iterable[0]))) {
        return iterable[0];
    } else {
        let iterator = iterable[Symbol.iterator]();
        let next = iterator.next();
        while (!next.done) {
            if (typeof predicate == "undefined"
                || predicate(next.value)) {
                return next.value;
            }
            next = iterator.next();
        }
    }
    throw Error("Elements not available");
}

export function iuFirstOrDefault<T>(iterable: Iterable<T>, predicate? : (e : T) => boolean): T {
    if (iterable instanceof Array
        && iterable.length > 0
        && (typeof predicate === "undefined"
            || predicate(iterable[0]))) {
        return iterable[0];
    } else {
        let iterator = iterable[Symbol.iterator]();
        let next = iterator.next();
        while (!next.done) {
            if (typeof predicate == "undefined"
                || predicate(next.value)) {
                return next.value;
            }
            next = iterator.next();
        }
    }
    // here we have the problem of value types
    // in this case we should not return null
    // this work is still pending
    return null;
}

export function iuCount<T>(iterable: Iterable<T>): number {
    if (iterable instanceof Array) {
        return iterable.length;
    } else if (iterable instanceof SimpleList) {
        return iterable.count;
    } else {
        let iterator = iterable[Symbol.iterator]();
        let i = 0;
        while (!iterator.next().done) {
            i++;
        }
        return i;
    }
}

class TakeIteratorWrapper<T> implements Iterator<T> {
    constructor(private innerIterator: Iterator<T>,
        private count: number) {
    }
    next(value?: any): IteratorResult<T, any> {
        if (this.count > 0) {
            this.count--;
            let next = this.innerIterator.next();
            return next;
        } else {
            return { value: undefined, done: true };
        }
    }
}

export function iuTake<T>(count: number, iterable: Iterable<T>): Iterable<T> {
    return {
        [Symbol.iterator]() {
            return new TakeIteratorWrapper(iterable[Symbol.iterator](), count);
        }
    };
}

export function iuToList<T>(iterable: Iterable<T>): IList<T> {
    return new SimpleList(iterable);
}


export function iuLast<T>(iterable: Iterable<T>): T {
    if (iterable instanceof Array && iterable.length > 0) {
        return iterable[iterable.length - 1];
    } else {
        let iterator = iterable[Symbol.iterator]();
        let next = iterator.next();
        let found = false;
        let lastValue = undefined;
        while (!next.done) {
            found = true;
            lastValue = next.value;
            next = iterator.next();
        }
        if (!found) {
            throw Error("Elements not available");
        } else {
            return lastValue;
        }
    }
}

export function iuElementAt<T>(iterable: Iterable<T>, index: number): T {
    if (iterable instanceof Array && iterable.length > index && index >= 0) {
        return iterable[index];
    } else if (iterable instanceof SimpleList) {
        return iterable.getItem(index);
    } else {
        let iterator = iterable[Symbol.iterator]();
        let next = iterator.next();
        let found = false;
        let lastValue = undefined;
        let i = 0;
        while (!next.done) {
            if (i == index) {
                found = true;
                lastValue = next.value;
                break;
            }
            next = iterator.next();
            i++;
        }
        if (!found) {
            throw Error("Elements not available");
        } else {
            return lastValue;
        }
    }
}

export function iuAny<T>(iterable: Iterable<T>, predicate?: (e: T) => boolean) {
    if (iterable instanceof Array && typeof predicate === "undefined") {
        return iterable.length > 0;
    } else if (iterable instanceof SimpleList && typeof predicate === "undefined") {
        return iterable.count > 0;
    } else {
        let iterator = iterable[Symbol.iterator]();
        let next = iterator.next();
        if (typeof predicate === "undefined") {
            return !next.done;
        } else {
            let found = false;
            while (!next.done) {
                if (predicate(next.value)) {
                    found = true;
                    break;
                }
                next = iterator.next();
            }
            return found;
        }
    }
}

export function iuSingle<T>(iterable: Iterable<T>,
                            predicate?: (e: T) => boolean) {
    if (iterable instanceof Array
        && iterable.length == 1
        && (typeof predicate == 'undefined'
            || predicate(iterable[0]))) {
        return iterable[0];
    } else if (iterable instanceof SimpleList
        && iterable.count == 0
        && (typeof predicate == 'undefined'
            || predicate(iterable.getItem(0)))) {
        return iterable.getItem(0);
    } else {
        let iterator = iterable[Symbol.iterator]();
        let next = iterator.next();
        if (!next.done
            && iterator.next().done
            && (typeof predicate == 'undefined'
                || predicate(next.value))) {
            return next.value;
        } else {
            throw Error("Sequence does not have one value");
        }
    }
}

export function iuOrderBy<T>(iterable: Iterable<T>,
                             criteria?: (e: T) => any): Iterable<T> {
    // until we find a better approach we will be converting
    // the collection to an array
    let collection = [...iterable];
    collection.sort((o1, o2) => {
        let e1 = criteria(o1);
        let e2 = criteria(o2);
        if (typeof e1 == "number"
            && typeof e2 == "number") {
            return e1 - e2;
        } else if (e1 instanceof Date
            && e2 instanceof Date) {
            return e1.getTime() - e2.getTime();
        } else if (typeof e1 == "string" && typeof e2 == "string") {
            return e1.localeCompare(e2);
        } else {
            // fail with equal
            return 0;
        }
    });
    return collection;
}

export interface IGrouping<T, K> extends Iterable<T> {
   Key : K;
}
class GroupByGrouping<T, K> extends SimpleList<T> implements IGrouping<T, K> {
    public Key : K;
}

export function iuGroupBy<T, K>(iterable: Iterable<T>,
                                keySelector: (e: T) => K): Iterable<IGrouping<T, K>> {
    let groups = new Map<string, GroupByGrouping<T,K>>();
    for(let value of iterable) {
        const rawKey = keySelector(value);
        let key = (rawKey ?? "").toString();
        let group : GroupByGrouping<T,K>;
        if (groups.has(key)) {
            group = groups.get(key);
        } else {
            group = new GroupByGrouping<T, K>();
            groups.set(key, group);
            group.Key = rawKey;
        }
        group.add(value);
    }
    return groups.values();
}

export function iuSingleOrDefault<T>(iterable: Iterable<T>,
                                     predicate?: (e: T) => boolean) {
    if (iterable instanceof Array
        && iterable.length == 1
        && (typeof predicate == 'undefined'
            || predicate(iterable[0]))) {
        return iterable[0];
    } else if (iterable instanceof SimpleList
        && iterable.count == 0
        && (typeof predicate == 'undefined'
            || predicate(iterable.getItem(0)))) {
        return iterable.getItem(0);
    } else {
        let iterator = iterable[Symbol.iterator]();
        let next = iterator.next();
        if (!next.done
            && iterator.next().done
            && (typeof predicate == 'undefined'
                || predicate(next.value))) {
            return next.value;
        } else {
            // this is still a problem for value types
            return null;
        }
    }
}


class FlattenIteratorWrapper<T, K> implements Iterator<K> {
    private currentIterator: Iterator<K>;

    constructor(private mainIterator: Iterator<T>,
                private func: (e: T) => Iterable<K>) {
    }
    next(value?: any): IteratorResult<K, any> {
        if (this.currentIterator) {
            let result = this.currentIterator.next();
            if (!result.done) {
                return result;
            }
        }
        let nextInMain = this.mainIterator.next();
        if (!nextInMain.done) {
            this.currentIterator = this.func(nextInMain.value)[Symbol.iterator]();
            // controversial recurisive call:
            return this.next();
        } else {
            return { value: undefined, done: true };
        }
    }
}

export function iuSelectMany<T, K>(func : (e:T) => Iterable<K>, iterable : Iterable<T>)
                  : Iterable<K> {
   return {
       [Symbol.iterator]() {
           return new FlattenIteratorWrapper(iterable[Symbol.iterator](), func);
       }
    };
}

class RangeIterator implements Iterator<number> {
    constructor(private current: number, private count: number) {
    }
    next(value?: any): IteratorResult<number, any> {
        if (this.count > 0) {
          this.count--;
          
          return {value: this.current++, done: false }
        } else {
           return {value: undefined, done: true};
        }
    }
}

export function iuRange(start : number, count : number) : Iterable<number> {
    return {
        [Symbol.iterator]() {
            return new RangeIterator(start, count);
        }
    };
}

const emptyIterable = {
    [Symbol.iterator]() {
        return { next: () => { return {done: true, value: undefined}; } };
    }
};

export function iuEmpty<T>() : Iterable<T> {
    return emptyIterable;
}

export function iuAsEnumerable<T>(iterable : Iterable<T>)
                  : Iterable<T> {
    return iterable;
}

export function iuCast<T>(iterable : Iterable<unknown>)
                  : Iterable<T> {
   // The following code needs more work to avoid wrong conversions
   // In typescript we will not get cast exceptions
   return iuSelect((x) => x as T, iterable);
}

export function wrapArrayWithList<T>(arr : T[]) : IList<T> {
    let result = new SimpleList<T>();
    result.internalArray = arr;
    return result;
}

export function iuMax<T>(iterable : Iterable<T>,  valueSelector : (item : T) => number) {
   let max = 0;
   for(let item of iterable) {
       const value = valueSelector(item);
       if (value > max) {
           max = value;
       }
   }
   return max;
}

export function iuMin<T>(iterable : Iterable<T>,  valueSelector : (item : T) => number) {
    let min = Number.MAX_VALUE;
    for(let item of iterable) {
        const value = valueSelector(item);
        if (value < min) {
            min = value;
        }
    }
    return min;
 }
 

export function iuSum<T>(iterable : Iterable<T>,  valueSelector : (item : T) => number) {
    let result = 0;
    for(let item of iterable) {
        const value = valueSelector(item);
        result += value;
    }
    return result;
 }
 