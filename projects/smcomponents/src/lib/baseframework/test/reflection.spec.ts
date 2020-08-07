import { classInfo, ReflectionHelper, propertyInfo, MetadataAttribute, defineCustomAttributeMetadata, SmEnumHelper } from "../ReflectionSupport";
import { type } from 'os';

@classInfo
class PersonClass {
   private _firstName : string;

   @propertyInfo()
   get FirstName() : string { return this._firstName; }
   set FirstName(value:string) { this._firstName = value; }

   private _lastName : string;
   @propertyInfo()
   get LastName() { return this._lastName; }
   set LastName(value:string) { this._lastName = value; }

   @propertyInfo()
   get FullName() : string { return this._lastName + " " + this._firstName; }

   private _age : number;
   @propertyInfo()
   get Age() : number { return this._age; }
   set Age(value:number) { this._age = value; }

}

describe('Type information', () => {
    let instance1 = new PersonClass();
    let instance2 = new PersonClass();


    it('should get type information object from instance', () =>  {
        let typeInfo = ReflectionHelper.getTypeInfo(instance1);
        expect(typeInfo).toBeDefined();
        let properties = typeInfo.getProperties();
        expect(properties.length).toBe(4);
        let firstNamePropertyInfo = typeInfo.getProperty("FirstName");
        expect(firstNamePropertyInfo).toBeDefined();
    });

    it ("should get property information by name",() => {
        let typeInfo = ReflectionHelper.getTypeInfo(instance1);
        
        let firstNamePropertyInfo = typeInfo.getProperty("FirstName");
        expect(firstNamePropertyInfo).toBeDefined();
        expect(firstNamePropertyInfo.canRead).toBeTrue();
        expect(firstNamePropertyInfo.canWrite).toBeTrue();
        let propType = firstNamePropertyInfo.propertyType.innerType;
        expect(propType).toBeDefined();
        expect(propType).toBe(String);
    });

    it ("should get property information by name for numeric property",() => {
        let typeInfo = ReflectionHelper.getTypeInfo(instance1);
        
        let firstNamePropertyInfo = typeInfo.getProperty("Age");
        expect(firstNamePropertyInfo).toBeDefined();
        expect(firstNamePropertyInfo.canRead).toBeTrue();
        expect(firstNamePropertyInfo.canWrite).toBeTrue();
        let propType = firstNamePropertyInfo.propertyType.innerType;
        expect(propType).toBeDefined();
        expect(propType).toBe(Number);
    });

    it ("should get property information for get-only property ",() => {
        let typeInfo = ReflectionHelper.getTypeInfo(instance1);
        
        let firstNamePropertyInfo = typeInfo.getProperty("FullName");
        expect(firstNamePropertyInfo).toBeDefined();
        expect(firstNamePropertyInfo.canRead).toBeTrue();
        expect(firstNamePropertyInfo.canWrite).toBeFalse();
        let propType = firstNamePropertyInfo.propertyType.innerType;
        expect(propType).toBeDefined();
        expect(propType).toBe(String);
    });
});


class MyDescriptionAttribute extends MetadataAttribute {
   constructor(public theDescription : string) {
     super();
   }
}
function MyDescriptionDecorator(theDescription : string) {
    return defineCustomAttributeMetadata(new MyDescriptionAttribute(theDescription));
}


@classInfo
class Dept {
   private _deptName : string;

   @propertyInfo()
   @MyDescriptionDecorator("some descriptive text")
   get DeptName() : string { return this._deptName; }
   set DeptName(value:string) { this._deptName = value; }

   private _supervisor : string;
   @propertyInfo()
   get Supervisor() { return this._supervisor; }
   set Supervisor(value:string) { this._supervisor = value; }
}


describe('Type information with metadata attributes', () => {
    let instance1 = new Dept();


    it('should get custom metadata attributes', () =>  {
        let typeInfo = ReflectionHelper.getTypeInfo(instance1);
        expect(typeInfo).toBeDefined();
        
        let firstNamePropertyInfo = typeInfo.getProperty("DeptName");
        expect(firstNamePropertyInfo).toBeDefined();
        let atts = firstNamePropertyInfo.getMetadataAttributes();

        expect(atts.length).toBe(1);
        expect(atts[0]).toBeInstanceOf(MyDescriptionAttribute);
        expect((atts[0] as MyDescriptionAttribute).theDescription).toBe("some descriptive text");
    });
});


enum MyEnum { Red, Blue, Green }

describe('Enum processing', () => {
    it('should identify enum values', () =>  {
        let value : MyEnum;
        let result = SmEnumHelper.tryParse(MyEnum, "Blue", x => value = x);
        expect(result).toBe(true);
        expect(value).toBe(MyEnum.Blue);
        value = MyEnum.Red;
        result = SmEnumHelper.tryParse(MyEnum, "Blues", x => value = x);
        expect(result).toBe(false);
    });

    it('should identify enum values case insensitive', () =>  {
        let value : MyEnum;
        let result = SmEnumHelper.tryParse(MyEnum, "blue", x => value = x, true);
        expect(result).toBe(true);
        expect(value).toBe(MyEnum.Blue);
        value = MyEnum.Red;
        result = SmEnumHelper.tryParse(MyEnum, "blues", x => value = x, true);
        expect(result).toBe(false);
    });
});