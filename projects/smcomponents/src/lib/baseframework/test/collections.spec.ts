import { SimpleList, iuSelect, iuWhere, iuToArray, iuFirst, iuFirstOrDefault, iuCount, iuTake, iuToList, iuLast, iuElementAt, iuAny, iuSingle, iuSingleOrDefault, iuSelectMany, iuRange, SimpleDictionary, ISimpleDictionary, ObservableCollection, CollectionChangeAction, ReadonlyCollection, iuOrderBy, iuMax, iuSum, iuGroupBy } from "../collections";
import { ExcelExportComponent } from '@progress/kendo-angular-excel-export';
import { concatStringsSequence } from '../StringBuilder';

describe('Simple list', () => {
    it("should create a list", () => {
        let list1 = new SimpleList<string>();
        list1.add("One");
        list1.add("Two");
        list1.add("Three");
        expect(list1.count).toBe(3);
        list1.insert(1, "Middle");
        expect(list1.internalArray).toEqual(["One", "Middle", "Two", "Three"]);

    });

    it("should support iteration", () => {
        let list1 = new SimpleList<string>();
        list1.add("One");
        list1.add("Two");
        list1.add("Three");
        let i = 0;
        let expectations = ["One", "Two", "Three"];
        for (let item of list1) {
            expect(item).toBe(expectations[i]);
            i++;
        }
        expect(i).toBe(3);
    });

    it("should be created from js array", () => {
        let initialArray = [20, 34, 33];
        let list = new SimpleList(initialArray);
        expect(list.count).toBe(3);
        let i = 0;
        for (let item of list) {
            expect(item).toBe(initialArray[i]);
            i++;
        }
        initialArray.splice(0, initialArray.length);
        expect(list.count).toBe(3);
        expect(initialArray.length).toBe(0);
    });

    it("should clear a collection", () => {
        let list = new SimpleList();
        list.add(10);
        list.add(100);
        list.add(1000);
        expect(list.internalArray).toEqual([10, 100, 1000]);
        list.clear();
        expect(list.count).toBe(0);
    });

    it("should set an items in an array", () => {
        let list = new SimpleList();
        list.add(10);
        list.add(100);
        list.add(1000);
        expect(list.internalArray).toEqual([10, 100, 1000]);
        expect(list.getItem(1)).toBe(100);
        list.setItem(1, 323);
        expect(list.getItem(1)).toBe(323);
        expect(list.internalArray).toEqual([10, 323, 1000]);
    });

    it("should remove item from a list", () => {
        let item1 = { description: 'Some description', price: 123.2 };
        let item2 = { description: 'Another description', price: 52 };
        let list = new SimpleList([item1, item2]);
        expect(list.count).toBe(2);
        expect(list.getItem(1)).toEqual(item2);
        list.remove(item1);
        expect(list.count).toBe(1);
    });

    it("should remove items from a list using an index", () => {
        let item1 = { description: 'Some description', price: 123.2 };
        let item2 = { description: 'Another description', price: 52 };
        let list = new SimpleList([item1, item2]);
        expect(list.count).toBe(2);
        expect(list.getItem(1)).toEqual(item2);
        list.removeAt(1);
        expect(list.count).toBe(1);
    });
});

describe("Dictionary", () => {
    it("should add dictionary elements", () => {
        let dictionary: ISimpleDictionary<string, number> = new SimpleDictionary<string, number>();
        dictionary.addEntry("hello", 1);
        dictionary.addEntry("hello2", 30);
        dictionary.add(["world", 2]);
        dictionary.add(["World", 3]);
        expect(dictionary.getItem("world")).toBe(2);
        expect(dictionary.getItem("World")).toBe(3);
        expect(dictionary.getItem("hello2")).toBe(30);
        expect(dictionary.getItem("World")).toBe(3);
        expect(dictionary.count).toBe(4);
        dictionary.setItem("World", 300);
        expect(dictionary.count).toBe(4);
        expect(dictionary.getItem("World")).toBe(300);
        dictionary.clear();
        expect(dictionary.count).toBe(0);
    });

    it("should be iterable", () => {
        let dictionary: ISimpleDictionary<string, number> = new SimpleDictionary<string, number>();
        dictionary.addEntry("hello", 1);
        dictionary.addEntry("hello2", 30);
        dictionary.addEntry("hello3", 5903);
        dictionary.setItem("hello4", 200);
        dictionary.setItem("hello2", 300);
        let booleans = [false, false, false, false];
        for (let pair of dictionary) {
            if (pair[0] === "hello" && pair[1] === 1) {
                booleans[0] = true;
            } else if (pair[0] === "hello2" && pair[1] == 300) {
                booleans[1] = true;
            } else if (pair[0] === "hello3" && pair[1] == 5903) {
                booleans[2] = true;
            } else if (pair[0] === "hello4" && pair[1] == 200) {
                booleans[3] = true;
            }
        }
        expect(booleans).toEqual([true, true, true, true]);
    });

    it("should work with trygetvalue", () => {
        let dictionary: ISimpleDictionary<string, number> = new SimpleDictionary<string, number>();
        dictionary.addEntry("hello", 1);
        dictionary.addEntry("hello2", 30);
        let n: number;
        expect(dictionary.tryGetValue("hello", (v) => n = v)).toBeTrue();
        expect(n).toBe(1);
        expect(dictionary.tryGetValue("helloxx", (v) => n = v)).toBeFalse();
    });
});

//
// Iterable utils
//
describe('"Select" iterable utils operation', () => {
    it("should work on arrays", () => {
        let array = [20, 34, 33];
        let i = 0;
        for (let item of iuSelect((x) => x * x, array)) {
            expect(item).toBe(array[i] * array[i]);
            i++;
        }
        expect(i).toBe(3);
    });

    it("should work on simple lists", () => {
        let list = new SimpleList([20, 34, 33]);
        let i = 0;

        for (let item of iuSelect((x) => x * x, list)) {
            expect(item).toBe(list.getItem(i) * list.getItem(i));
            i++;
        }
        expect(i).toBe(3);
    });
});


describe('"Select" with index iterable utils operation', () => {
    it("should work on arrays", () => {
        let array = [20, 34, 33];
        let i = 0;
        for (let item of iuSelect((x, i) => x * i, array)) {
            expect(item).toBe(array[i] * i);
            i++;
        }
        expect(i).toBe(3);
    });

    it("should work on simple lists", () => {
        let list = new SimpleList([20, 34, 33]);
        let i = 0;

        for (let item of iuSelect((x) => x * i, list)) {
            expect(item).toBe(list.getItem(i) * i);
            i++;
        }
        expect(i).toBe(3);
    });
});

describe('"Where" iterable utils operation', () => {
    it("should work with arrays", () => {
        let array = [{ name: 'Name1', age: 40 },
        { name: 'Name2', age: 23 },
        { name: 'Name3', age: 50 },
        { name: 'Name31', age: 30 },
        { name: 'Name4', age: 70 }];
        let whereIt = iuWhere((p) => p.age >= 50, array);
        let i = 0;
        for (let item of whereIt) {
            switch (i) {
                case 0:
                    expect(item).toEqual(array[2]);
                    break;
                case 1:
                    expect(item).toEqual(array[4]);
                    break;
                default:
                    throw Error();
            }
            i++;
        }
        expect(i).toBe(2);
    });

    it("should work with custom collections", () => {
        let list = new SimpleList([{ name: 'Name1', age: 40 },
        { name: 'Name2', age: 23 },
        { name: 'Name3', age: 50 },
        { name: 'Name31', age: 30 },
        { name: 'Name4', age: 70 }]);
        let whereIt = iuWhere((p) => p.age >= 50, list);
        let i = 0;
        for (let item of whereIt) {
            switch (i) {
                case 0:
                    expect(item).toEqual(list.getItem(2));
                    break;
                case 1:
                    expect(item).toEqual(list.getItem(4));
                    break;
                default:
                    throw Error();
            }
            i++;
        }
        expect(i).toBe(2);
    });
});

describe('"First" iterable utils operation', () => {
    it("should work on arrays", () => {
        let array = [43, 32, 51, 51];
        expect(iuFirst(array)).toBe(43);
    });

    it("should work on simple lists", () => {
        let list = new SimpleList([235, 32, 51, 51]);
        expect(iuFirst(list)).toBe(235);
    });

    it("should work on infinite iterables", () => {
        let infiniteIt = new InfiniteIterable();
        let projected = iuSelect((x) => x + 2003, infiniteIt);
        expect(iuFirst(projected)).toBe(2003);
    });

    it("should fail when requesting element of empty sequence", () => {
        expect(() => iuFirst([])).toThrowError();
    });
});

describe('"FirstOrDefault" iterable utils operation', () => {
    it("should work on arrays", () => {
        let array = [43, 32, 51, 51];
        expect(iuFirstOrDefault(array)).toBe(43);
    });

    it("should work on simple lists", () => {
        let list = new SimpleList([235, 32, 51, 51]);
        expect(iuFirstOrDefault(list)).toBe(235);
    });

    it("should work on simple lists", () => {
        let list = new SimpleList([235, 32, 51, 51]);
        expect(iuFirstOrDefault(list, x => x > 1000)).toBe(null);
    });

    it("should work on infinite iterables", () => {
        let infiniteIt = new InfiniteIterable();
        let projected = iuSelect((x) => x + 2003, infiniteIt);
        expect(iuFirstOrDefault(projected)).toBe(2003);
    });

    it("should return null when requesting element of empty sequence", () => {
        expect(iuFirstOrDefault([])).toBeNull();
    });
});

describe('"Count" iterable utils operation', () => {
    it("should work on arrays", () => {
        let array = [43, 32, 51, 51];
        expect(iuCount(array)).toBe(4);
    });

    it("should work on simple lists", () => {
        let list = new SimpleList([235, 32, 51, 51, 5]);
        expect(iuCount(list)).toBe(5);
    });

    it("should work on iterables", () => {
        let anIterable = [235, 5, 5];
        let projected = iuSelect((x) => x + 2003, anIterable);
        expect(iuCount(projected)).toBe(3);
    });

    it("zero on empty sequence", () => {
        expect(iuCount([])).toBe(0);
    });
});


describe('"Take" iterable utils operation', () => {
    it("should work on arrays", () => {
        let array = [43, 32, 51, 51];
        expect(iuToArray(iuTake(2, array))).toEqual([43, 32]);
    });

    it("should work on simple lists", () => {
        let list = new SimpleList([235, 32, 51, 51, 5]);
        expect(iuToArray(iuTake(2, list))).toEqual([235, 32]);
    });

    it("should work on infinite iterables", () => {
        let infiniteIt = iuTake(5, new InfiniteIterable());
        let projected = iuSelect((x) => x + 2003, infiniteIt);
        expect(iuToArray(projected)).toEqual([2003, 2004, 2005, 2006, 2007]);
    });

    it("zero on empty sequence", () => {
        expect(iuCount(iuTake(5, []))).toBe(0);
    });
});

describe('"ToList" iterable utils operation', () => {
    it("should work on arrays", () => {
        let array = [43, 32, 51, 51];
        let list = iuToList(array);
        list.add(858);
        expect(array.length).toBe(4);
        expect(list.count).toBe(5);
    });

    it("should work on infinite iterables", () => {
        let projectedInfinite = iuSelect((x) => x + 2003, new InfiniteIterable());
        let taken = iuTake(2, projectedInfinite);
        let list = iuToList(taken);

        expect(list.internalArray).toEqual([2003, 2004]);
    });

    it("zero on empty sequence", () => {
        expect(iuCount(iuToList([]))).toBe(0);
    });
});

describe('"Last" iterable utils operator', () => {
    it("should work with arrays", () => {
        let col = ["Asd", "ASDF", "vcx"];
        expect(iuLast(col)).toBe("vcx");
    });

    it("should work with iterables", () => {
        let col = iuTake(5, new InfiniteIterable());
        expect(iuLast(col)).toBe(4);
    });

    it("should fail when no elements are available", () => {
        expect(() => iuLast([])).toThrowError();
    });

    it("should fail when no elements are available on iterable", () => {
        let it = iuTake(0, [2, 3, 4]);
        expect(() => iuLast(it)).toThrowError();
    });
});

describe('"ElementAt" iterable utils operator', () => {
    it("should work with arrays", () => {
        let arr = ["Adsf", "ASDf", "fasd"];
        let i = 0;
        while (i < arr.length) {
            expect(iuElementAt(arr, i)).toBe(arr[i]);
            i++;
        }
        expect(i).toBe(3);
    });
    it("should work with lists", () => {
        let list = new SimpleList(["Adsf", "ASDf", "fasd"]);
        let i = 0;
        while (i < list.count) {
            expect(iuElementAt(list, i)).toBe(list.getItem(i));
            i++;
        }
        expect(i).toBe(3);
    });

    it("should work with infinite iterables", () => {
        let infinite = iuSelect((x) => x * x, new InfiniteIterable());
        expect(iuElementAt(infinite, 4)).toBe(16);
    });
});

describe('"Any" iterable utils operator', () => {
    it("should work with arrays with no predicate", () => {
        expect(iuAny([])).toBe(false);
        expect(iuAny([3, 4, 5])).toBe(true);
    });

    it("should work with lists with no predicate", () => {
        expect(iuAny(new SimpleList([]))).toBe(false);
        expect(iuAny(new SimpleList([3, 4, 5]))).toBe(true);
    });

    it("should work with iterables with no predicate", () => {
        expect(iuAny(iuTake(0, [13]))).toBe(false);
        expect(iuAny(iuTake(1, [13]))).toBe(true);
    });

    it("should work with arrays with predicate", () => {
        expect(iuAny([3, 4, 5], (e) => e === 42)).toBe(false);
        expect(iuAny([3, 4, 5], (e) => e === 4)).toBe(true);
    });

    it("should work with lists with predicate", () => {
        expect(iuAny(new SimpleList([3, 4, 5]), (e) => e === 42)).toBe(false);
        expect(iuAny(new SimpleList([3, 4, 5]), (e) => e === 4)).toBe(true);
    });

    it("should work with iterables with predicate", () => {
        expect(iuAny(iuTake(4, new InfiniteIterable()), (e) => e === 10)).toBe(false);
        expect(iuAny(iuTake(11, new InfiniteIterable()), (e) => e === 10)).toBe(true);
    });
});



describe('"Single" iterable utils operation', () => {
    it("should work on arrays without predicate", () => {
        let array = [43];
        expect(iuSingle(array)).toBe(43);
    });

    it("should work on simple lists without predicate", () => {
        let list = new SimpleList([235]);
        expect(iuSingle(list)).toBe(235);
    });

    it("should work on infinite iterables without predicate", () => {
        let infiniteIt = new InfiniteIterable();
        let projected = iuTake(1, iuSelect((x) => x + 2003, infiniteIt));
        expect(iuSingle(projected)).toBe(2003);
    });

    it("should work on infinite iterables when empty without predicate", () => {
        let infiniteIt = new InfiniteIterable();
        let projected = iuTake(2, iuSelect((x) => x + 2003, infiniteIt));
        expect(() => iuSingle(projected)).toThrowError();
    });

    it("should fail when requesting element of empty sequence without predicate", () => {
        expect(() => iuSingle([])).toThrowError();
    });

    it("should work on arrays with predicate", () => {
        let array = [43];
        expect(iuSingle(array, (e) => e > 40)).toBe(43);
        expect(() => iuSingle(array, (e) => e < 40)).toThrowError();
    });

    it("should work on simple lists with predicate", () => {
        let list = new SimpleList([235]);
        expect(iuSingle(list, (e) => e > 200)).toBe(235);
        expect(() => iuSingle(list, (e) => e < 200)).toThrowError();
    });

    it("should work on infinite iterables without predicate", () => {
        let infiniteIt = new InfiniteIterable();
        let projected = iuTake(1, iuSelect((x) => x + 2003, infiniteIt));
        expect(iuSingle(projected, (e) => e == 2003)).toBe(2003);
        expect(() => iuSingle(projected, (e) => e == 2002)).toThrowError()
    });

    it("should work on infinite iterables when empty without predicate", () => {
        let infiniteIt = new InfiniteIterable();
        let projected = iuTake(2, iuSelect((x) => x + 2003, infiniteIt));
        expect(() => iuSingle(projected, (x) => x == 2003)).toThrowError();
    });

    it("should fail when requesting element of empty sequence without predicate", () => {
        expect(() => iuSingle([], (x) => x > 0)).toThrowError();
    });
});


describe('"SingleOrDefault" iterable utils operation', () => {
    it("should work on arrays without predicate", () => {
        let array = [43];
        expect(iuSingleOrDefault(array)).toBe(43);
    });

    it("should work on simple lists without predicate", () => {
        let list = new SimpleList([235]);
        expect(iuSingleOrDefault(list)).toBe(235);
    });

    it("should work on infinite iterables without predicate", () => {
        let infiniteIt = new InfiniteIterable();
        let projected = iuTake(1, iuSelect((x) => x + 2003, infiniteIt));
        expect(iuSingleOrDefault(projected)).toBe(2003);
    });

    it("should work on infinite iterables when empty without predicate", () => {
        let infiniteIt = new InfiniteIterable();
        let projected = iuTake(2, iuSelect((x) => (x + 2003).toString(), infiniteIt));
        expect(iuSingleOrDefault(projected)).toBeNull();
    });

    it("should return null when requesting element of empty sequence without predicate", () => {
        expect(iuSingleOrDefault([])).toBeNull();
    });

    it("should work on arrays with predicate", () => {
        let array = [43];
        expect(iuSingleOrDefault(array, (e) => e > 40)).toBe(43);
        expect(iuSingleOrDefault(array, (e) => e < 40)).toBeNull();
    });

    it("should work on simple lists with predicate", () => {
        let list = new SimpleList([235]);
        expect(iuSingleOrDefault(list, (e) => e > 200)).toBe(235);
        expect(iuSingleOrDefault(list, (e) => e < 200)).toBeNull();
    });

    it("should work on infinite iterables without predicate", () => {
        let infiniteIt = new InfiniteIterable();
        let projected = iuTake(1, iuSelect((x) => x + 2003, infiniteIt));
        expect(iuSingleOrDefault(projected, (e) => e == 2003)).toBe(2003);
        expect(iuSingleOrDefault(projected, (e) => e == 2002)).toBeNull()
    });

    it("should work on infinite iterables when empty without predicate", () => {
        let infiniteIt = new InfiniteIterable();
        let projected = iuTake(2, iuSelect((x) => x + 2003, infiniteIt));
        expect(iuSingleOrDefault(projected, (x) => x == 2003)).toBeNull();
    });

    it("should return null when requesting element of empty sequence without predicate", () => {
        expect(iuSingleOrDefault([], (x) => x > 0)).toBeNull();
    });
});

describe('"SelectMany" iterable utils', () => {
    it("should work with arrays", () => {
        let array: Array<Array<number>> = [[10, 20], [30, 40], [50]];
        let result = iuToArray(iuSelectMany(x => x, array));
        expect(result).toEqual([10, 20, 30, 40, 50]);
    });

    it("should work with iterables", () => {
        let array = [1, 2, 3];
        let it1 = iuSelect((e) => e + 1, array);
        let result = iuToArray(iuSelectMany(x => iuTake(x, new InfiniteIterable()), it1));
        expect(result).toEqual([0, 1,
            0, 1, 2,
            0, 1, 2, 3]);
    });
});

describe('"Range" iterable utils', () => {
    it("should generate value", () => {
        let result = iuToArray(iuSelect((e) => e * 10, iuRange(10, 5)));
        expect(result).toEqual([100, 110, 120, 130, 140]);
    });
});


describe('"OrderBy" iterable utils', () => {
    let objs = [{p1: 10, p2: "Abc", p3: new Date(2001,5,1)},
                {p1: 40, p2: "Xbc", p3: new Date(1999,5,1)},
                {p1: 30, p2: "Ayc", p3: new Date(2002,5,1)},
                {p1: 90, p2: "Nbc", p3: new Date(2009,5,1)}];
    it("should order a sequence of objects for numeric", () => {
        let result = iuToArray(iuSelect((x) => x.p2, iuOrderBy(objs, (e) => e.p1)));
        expect(result).toEqual(["Abc", "Ayc", "Xbc", "Nbc"]);
    });
    it("should order a sequence of objects for strings", () => {
        let result = iuToArray(iuSelect((x) => x.p2, iuOrderBy(objs, (e) => e.p2)));
        expect(result).toEqual(["Abc", "Ayc", "Nbc", "Xbc"]);
    });
    it("should order a sequence of objects for dates", () => {
        let result = iuToArray(iuSelect((x) => x.p2, iuOrderBy(objs, (e) => e.p3)));
        expect(result).toEqual(["Xbc", "Abc", "Ayc", "Nbc"]);
    });
});

describe('"Max" iterable utils', () => {
    let objs = [{p1: 10, p2: "Abc"},
                {p1: 40, p2: "Xbc"},
                {p1: 30, p2: "Ayc"},
                {p1: 10, p2: "Nbc"}];
    it("should get the maximum value", () => {
        let result = iuMax(objs, (item) => item.p1);
        expect(result).toEqual(40);
    });
});

describe('"Sum" iterable utils', () => {
    let objs = [{p1: 10, p2: "Abc"},
                {p1: 40, p2: "Xbc"},
                {p1: 30, p2: "Ayc"},
                {p1: 10, p2: "Nbc"}];
    it("should sum all values", () => {
        let result = iuSum(objs, (item) => item.p1);
        expect(result).toBe(10 + 40 + 30 + 10);
    });
});

describe('"GroupBy" iterable utils', () => {
    let objs = [{p1: 10, p2: "Abc", date : new Date(2007,1,2)},
                {p1: 40, p2: "Xbc", date : new Date(2007,3,2)},
                {p1: 30, p2: "Ayc", date : new Date(2007,1,2)},
                {p1: 30, p2: "AJ", date : new Date(2007,3,2)},
                {p1: 10, p2: "Nbc", date : new Date(2007,2,2)}];
    it("should group by field", () => {
        let result = iuGroupBy(objs, (item) => item.p1);
        expect(iuCount(result)).toEqual(3);
    });
    it("should group have valid group keys", () => {
        let result = iuGroupBy(objs, (item) => item.p1);
        let keys = iuToArray(iuSelect((e) => e.Key, result));
        let keysStr=  keys.sort().join(',');
        expect(keysStr).toBe("10,30,40");
    });   

    it("should group valid groups", () => {
        let result = iuGroupBy(objs, (item) => item.p1);
        let values = iuToArray(iuSelect((e) => e.Key.toString() + '_' + concatStringsSequence(",", iuSelect((g => g.p2), e)), result));
        let valuesStr=  values.sort().join(',');
        expect(valuesStr).toBe("10_Abc,Nbc,30_Ayc,AJ,40_Xbc");
    });

    it("should group valid groups with dates", () => {
        let result = iuGroupBy(objs, (item) => item.date);
        let values = iuToArray(iuSelect((e) => e.Key.getFullYear().toString() + '-' +
                                               + e.Key.getMonth().toString() + '-' +
                                               + e.Key.getDate().toString() 
                                                + '_' + concatStringsSequence(",", iuSelect((g => g.p2), e)), result));
        let valuesStr=  values.sort().join(',');
        expect(valuesStr).toBe("2007-1-2_Abc,Ayc,2007-2-2_Nbc,2007-3-2_Xbc,AJ");
    });
});

describe('"ObservableCollection" collection', () =>{
    it("Should notify of changes", () =>{
        let collection = new ObservableCollection<string>();
        let removed = 0, replaced = 0, added = 0;
        collection.CollectionChanged.addHandler((e,arg) =>{ 
              switch(arg.action) {
                  case CollectionChangeAction.Add:
                      added++;
                      break;
                   case CollectionChangeAction.Replace:
                      replaced++;
                      break;
                   case CollectionChangeAction.Remove:
                      removed++;
                      break;
              }
        });
        collection.add("one");
        collection.add("two");
        collection.removeAt(1);
        collection.add("one");
        collection.insert(1, "XA");
        collection.setItem(0, "AK");
        expect(collection.internalArray).toEqual(["AK", "XA","one"]);
        expect(removed).toBe(1);
        expect(added).toBe(4);
        expect(replaced).toBe(1);
    });
});

describe('"ReadonlyCollection" collection', () => {
   let collection = new ReadonlyCollection([1,3,4,5]);

   it("should work as a collection", () => {
       expect([...collection]).toEqual([1, 3, 4, 5]);
       expect(collection.getItem(1)).toBe(3);
   });

   it("should fail on modification methods", () => {
       expect(() => collection.setItem(1,3)).toThrowError();
       expect(() => collection.clear()).toThrowError();
       expect(() => collection.remove(3)).toThrowError();
       expect(() => collection.removeAt(1)).toThrowError();
       expect(() => collection.add(1)).toThrowError();
   });
});


class InfiniteIterator implements Iterator<number> {
    counter: number = 0;
    next(value?: any): IteratorResult<number, any> {
        return { value: this.counter++, done: false };
    }
}
class InfiniteIterable implements Iterable<number> {
    [Symbol.iterator]() {
        return new InfiniteIterator();
    }
}