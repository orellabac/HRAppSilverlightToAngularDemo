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

import "reflect-metadata";

export class RuntimeTypeInfo {
    constructor(private type: Function) {
    }
    public get Name() {
        return this.type.name;
    }
    public getProperties(inherited?: boolean): PropertyInfo[] {
        let properties: PropertyInfo[] = [];
        for (let propName of Object.getOwnPropertyNames(this.type.prototype)) {
            if (propName == "constructor") {
                continue;
            }
            properties.push(
                new PropertyInfo(
                    propName,
                    this,
                    Object.getOwnPropertyDescriptor(this.type.prototype, propName)));
        }
        return properties;
    }

    public getProperty(propName: string, idx?: any): PropertyInfo {
        let descriptor = Object.getOwnPropertyDescriptor(this.type.prototype, propName);
        if (descriptor) {
            return new PropertyInfo(
                propName,
                this,
                Object.getOwnPropertyDescriptor(this.type.prototype, propName));
        } else {
            return null;
        }
    }

    public GetField(fieldName: string): FieldInfo {
        throw new Error("Not implemented");
    }
    public GetFields(): FieldInfo[] {
        throw new Error("Not implemented");
    }
    public get IsEnum(): boolean {
        throw new Error("Not implemented");
    }

    public get innerType() {
        return this.type;
    }
}

export class SmEnumHelper {
    static enumParse(enumDefinition : RuntimeTypeInfo, valueToParse : string, caseInsensitive? : boolean) : unknown {
        throw new Error("not implemented");
    }
    static tryParse<T>(enumDefinition : any, valueToParse : string, enumFunc : ((e : any) => void), caseInsensitive? : boolean) : boolean {
        if (caseInsensitive === true) {
            let tmp = valueToParse.toLowerCase();
            for(let key of Object.keys(enumDefinition)) {
               if (key.toLowerCase() == tmp) {
                   valueToParse = key;
                   break;
               }
            }
        }
        let lookupResult = enumDefinition[valueToParse];
        if (typeof lookupResult !== "undefined") {
           enumFunc(lookupResult);
           return true;
        } else {
           return false;
        }
    }
    static isEnumItemDefined(enumDefinition : RuntimeTypeInfo, value : unknown) : unknown {
        throw new Error("not implemented");
    }
}

export class ReflectionHelper {
    static getInterfaceRuntimeTypeInfo(intefaceName: string): Function {
        return new Function();
    }

    static isInterfaceIsSupported(obj: unknown, interfaceName: string): boolean {
        return false;
    }
    
    static isEnumElement(object: unknown, enumName: string) : boolean {
        throw new Error("not implemented");
    }
    static getTypeInfo(type: any): RuntimeTypeInfo {
        if (type instanceof Function) {
            return new RuntimeTypeInfo(type);
        } else if (type && type.constructor) {
            return new RuntimeTypeInfo(type.constructor);
        } else {
            return new RuntimeTypeInfo(null);
        }
    }
}

export class MemberInfo {
    public Name: string;
    /// Stub property
    public DeclartingType: any = null;
    public getMetadataAttributes(inherited?: boolean): MetadataAttribute[];
    public getMetadataAttributes(attType: RuntimeTypeInfo, inherited?: boolean): MetadataAttribute[];
    public getMetadataAttributes(arg1: unknown, arg2?: unknown): MetadataAttribute[] {
        return [];
    }
}

export class PropertyInfo extends MemberInfo {
    constructor(name: string,
        private parentType: RuntimeTypeInfo,
        private descriptor: PropertyDescriptor) {
        super();
        this.Name = name;
    }

    public getMetadataAttributes(inherited?: boolean): MetadataAttribute[];
    public getMetadataAttributes(attType: RuntimeTypeInfo, inherited?: boolean): MetadataAttribute[];
    public getMetadataAttributes(arg1: unknown, arg2?: unknown): MetadataAttribute[] {
        const proto = this.parentType.innerType.prototype;
        let keys = Reflect.getMetadataKeys(proto, this.Name);
        return keys.map((key) => Reflect.getMetadata(key, proto, this.Name)).
            filter((obj) => obj instanceof MetadataAttribute);
    }

    get canWrite() {
        return typeof this.descriptor.set !== "undefined";
    }

    get canRead() {
        return typeof this.descriptor.get !== "undefined";
    }

    get propertyType() {
        let designType = Reflect.getMetadata("design:type", this.parentType.innerType.prototype, this.Name);
        if (designType) {
            return ReflectionHelper.getTypeInfo(designType);
        } else {
            return null;
        }
    }

    public getValue(obj: any, indexers?: any) {
        return obj[this.Name];
    }

    public setValue(obj: any, value: any, indexers?: any) {
        obj[this.Name] = value;
    }
}

export class FieldInfo extends MemberInfo {
    public IsLiteral: boolean;
    public GetValue(obj: any) {
        return obj[this.Name];
    }
}

export function classInfo(constructorFunc: Function) {
    Reflect.defineMetadata("isClassDefinition", true, constructorFunc.prototype);
}

export function propertyInfo() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

    };
}

export class MetadataAttribute {

}

export function defineCustomAttributeMetadata(att: MetadataAttribute) {
    return Reflect.metadata(att.constructor.name, att);
}

export function objectHashCodeHelper(obj: any): number {
    throw Error("not implemented");
}

export function objectEqualsHelper(obj: any, obj2? : any): boolean {
    throw Error("not implemented");
}

export function convertToBoolean(obj: unknown): boolean {
    if (typeof obj === "boolean") {
        return obj;
    } else if (typeof obj === "number") {
        return obj !== 0;
    } else if (typeof obj === "string" && obj.toLowerCase() === "true") {
        return true;
    } else if (typeof obj === "string" && obj.toLowerCase() === "false") {
        return true;
    } else {
        throw Error("Cannot convert value to boolean");
    }
}