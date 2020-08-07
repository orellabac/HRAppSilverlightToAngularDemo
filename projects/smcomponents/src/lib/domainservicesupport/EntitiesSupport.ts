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

import { SubscriptionEvent } from '../utils/SubscriptionEvent';
import { EntitySetOperations } from './OperationsSupport';
import { IClassConstructor } from './DomainContext';
import { SimpleDictionary } from '../baseframework/collections';
import { ReflectionHelper, MetadataAttribute } from '../baseframework/ReflectionSupport';

export class KeyAttribute extends MetadataAttribute{
}
export class RequiredAttribute extends MetadataAttribute{
}

export class EntityContainer {
    LoadEntities(entities: any[]) {
       throw new Error("Method not implemented.");
    }
    HasChanges: boolean;
    PropertyChanged =  new SubscriptionEvent<(sender : any,e : {
        PropertyName : string
     }) => void>();
    CreateEntitySet<T>(arg0: EntitySetOperations): any {
       
      }
}

export interface IPendingChange {
    keys: any[], 
    keyFields: string[],
    changedProperties: string[],
    entityNamespace: string,
    entity: any, 
    originalData : any
}

export class EntityContainerHelper extends EntityContainer {
    public static entities = <any>{};
    public static pendingChanges = new Map<string, Map<string, IPendingChange>>();
    public static addedElements = new Map<string, any[]>();
    public static cachedConstructors : {[x:string] : any} = {};

    public GetEntitySet<T extends Entity>(name? : string) : EntitySet<T> {
        if (EntityContainerHelper.entities[name] != undefined) {
            return new EntitySet(name,  EntityContainerHelper.entities[name] );
        } else {
            return  new EntitySet(name, []);
        }
    }
    
    static getEntities<T>(name? : string) : T[] {
        if (EntityContainerHelper.entities[name] != undefined) {
            return EntityContainerHelper.entities[name];
        } else {
            return [];
        }
    }
    static getEntitiesWithFilter(entityName: string, filter: (entity: any) => boolean): any {
        let dataset = [];
        if (EntityContainerHelper.entities[entityName] != undefined) {
            dataset = EntityContainerHelper.entities[entityName];
        }
        return dataset.filter(filter);
    }


    static registerChange(entityName: string, 
                          entityNamespace : string,
                          keyValues: any[], 
                          keyFields : string[], 
                          memberName: string,
                          entity : Entity): any {
        if (EntityContainerHelper.changeTrackingEnabled && entity.EntityState != EntityState.Detached) {
            entity.EntityState = EntityState.Modified;
            let changes : Map<string, IPendingChange>;
            if (!EntityContainerHelper.pendingChanges.has(entityName)) {
                changes = new Map<string, IPendingChange>();
                EntityContainerHelper.pendingChanges.set(entityName, changes);
            }
            if (keyFields.length <= 0) {
                throw "Fatal: key fields not specified";
            }
            let changedObjectKeyValue = entity[keyFields[0].toString()];
            if (!changes.has(changedObjectKeyValue)) {
                changes.set(changedObjectKeyValue, {
                    keys: keyValues, 
                    keyFields: keyFields,
                    changedProperties: [memberName],
                    entityNamespace: entityNamespace,
                    entity: entity, 
                    originalData: entity.copyEntityObjectDataInto({})});
            } else {
                changes.get(changedObjectKeyValue).changedProperties.push(memberName);
            }
        }
    }

    public static changeTrackingEnabled = true;
}


export class EntitySet<T extends Entity> {
    private addedEntities : T[] = [];
    constructor(public entityName : string, public data : T[]) {
    }
    Add(newElement: T): void {
        this.addedEntities.push(newElement);
        let addedCollection : any[];
        if (EntityContainerHelper.addedElements.has(this.entityName)) {
           addedCollection = EntityContainerHelper.addedElements.get(this.entityName);
        } else {
           addedCollection = [];
           EntityContainerHelper.addedElements.set(this.entityName, addedCollection);
        }
        addedCollection.push(newElement);
        newElement.EntityState = EntityState.New;
    }

}

export class EntityQuery<T> {
    parameters: {[ x : string] : any};
    Constructor: IClassConstructor<T>;
    filter: string;
    sort: string;
    public whereExpr : string;

    constructor(public methodName : String) {

    }

    public getUrlFragment() {
        if (this.parameters ) {
            let result = this.methodName + "?";
            let i  = 0;
            if (this.parameters instanceof SimpleDictionary) {
                for(let pair of this.parameters) {
                    let newLocal = pair[1];
                    if (newLocal instanceof Date) {
                        newLocal = newLocal.getFullYear().toString() + '-' +
                                    (newLocal.getMonth() + 1).toString() + '-' +
                                    newLocal.getDate().toString() ;
                    }
                    result = result + pair[0] + "=" + newLocal.toString();
                    i++;
                    if (i < this.parameters.count) {
                        result = result + "&";
                    }
                }
            } else {
                for(let parameter of Object.keys(this.parameters)) {
                    result = result + parameter + "=" + this.parameters[parameter].toString();
                    i++;
                    if (i < Object.keys(this.parameters).length) {
                        result = result + ";";
                    }
                }
            }
            if (typeof this.filter != "undefined" &&  this.filter !== "") {
                result = result + this.filter;
            }
            if (typeof this.sort != "undefined" &&  this.sort !== "") {
                result = result + this.sort;                
            }
            if (typeof this.whereExpr != "undefined") {
                result = result + "&$where="+this.whereExpr
            }
            
            return result;
        }else {
            let result = this.methodName;
            if (typeof this.filter != "undefined" && this.filter != "") {
                result = result + "?" + this.filter;
                if (this.sort !== "") {
                    result = result + "&" +  this.sort;
                }
            }else {
                if (typeof this.sort != "undefined" && this.sort != "") {
                    result = result + "?" + this.sort;
                }
            }
            if (typeof this.whereExpr != "undefined") {
                result = result + "&$where="+this.whereExpr
            }
            return result;
        }
    }

    setFilterCriterias(filter : string, sort: string) {
        this.filter = filter;
        this.sort = sort;
    }
 
}



export class Entity {
    public EntityState: EntityState;

    UpdateActionState(arg0: string, arg1: string, arg2: string): any {
        throw new Error("Method not implemented.");
    }
    InvokeAction(arg0: string): any {
        throw new Error("Method not implemented.");
    }
    CanInvokeAction(arg0: string): boolean {
        return false;
    }
    IsActionInvoked(arg0: string): boolean {
        return false;
    }

    protected entityNamespace = "";

    constructor() {
        this.EntityState = EntityState.Detached;
    }

    protected getDataMembers(): string[] {
        let type = ReflectionHelper.getTypeInfo(this.constructor);
        let properties = type.getProperties();
        return properties.map(prop => prop.Name);
    }

    protected getRequiredFields(): string[] {
        let type = ReflectionHelper.getTypeInfo(this.constructor);
        let properties = type.getProperties();
        let result = [];
        for (let prop of properties) {
            for (let attribute of prop.getMetadataAttributes()) {
                if (attribute instanceof RequiredAttribute) {
                    result.push(prop.Name);
                }
            }
        }
        return result;
    }

    protected getKeyFields(): string[] {
        let type = ReflectionHelper.getTypeInfo(this.constructor);
        let properties = type.getProperties();
        let result = [];
        for (let prop of properties) {
            for (let attribute of prop.getMetadataAttributes()) {
                if (attribute instanceof KeyAttribute) {
                    result.push(prop.Name);
                }
            }
        }
        return result;
    }

    copyEntityObjectDataInto(result: any): any {
        let typeInfo = ReflectionHelper.getTypeInfo(this);

        for (let field of this.getDataMembers()) {
            if (field === 'rowguid' && this['rowguid'] === null) {
                continue;
            }
            let propertyInfo = typeInfo.getProperty(field);
            if (this[field] instanceof Date) {
                result[field] = this.serializeDate(this[field]);
            } else {
                if (!(propertyInfo?.propertyType?.innerType === Date && this[field] === null)) {
                    result[field] = this[field];
                }
            }
        }
        return result;
    }

    protected RaiseDataMemberChanging(memberName: string) {

    }
    protected ValidateProperty(memberName: string, value: any) {
    }

    protected RaiseDataMemberChanged(memberName: string) {
        if (EntityContainerHelper.changeTrackingEnabled) {
            var entityName = this.constructor.name;
            var keyValues = this.getKeyFields().map(key => this[key]);
            EntityContainerHelper.registerChange(entityName,
                this.entityNamespace,
                keyValues,
                this.getKeyFields(),
                memberName,
                this);
        }
    }

    protected RaisePropertyChanged(memberName: string) {

    }

    protected deserializeDate(strDate: any) {
        if (typeof strDate == "string") {
            return new Date(parseInt(strDate.replace(/^\/Date\((.*)-.*$/, "$1")));
        } else {
            return strDate;
        }
    }
    protected serializeDate(date: Date) {
        return `/Date(${date.valueOf()})/`;
    }

    public OnPropertyChanged(e: { PropertyName: string }): void {

    }

}

  


export class EntityCollection<T> {
    Add(arg0: any): any {
      throw new Error("Method not implemented.");
    }
    Remove(arg0: any): any {
      throw new Error("Method not implemented.");
    }
    constructor(private entity: Entity, propertyName : string, filter : (e:T ) => boolean,
                 attach: (e:Entity) => void, detach : (e:Entity) => void) {
  
    }
    toString(): string {
        return this.entity.constructor.name;
    }
  }
  

  export class EntityRef<T> {
    constructor(private refEntity : any,
         private targetEntityName : string,
         private entityPredicate : (x:T) => boolean) {

    }

    public get Entity() : T {        
        return EntityContainerHelper.getEntitiesWithFilter(this.targetEntityName,  this.entityPredicate)[0];
    }

    public set Entity(value : T) {
        
    }
}

export enum EntityState {
    New,
    Modified,
    Unmodified,
    Detached
}

export class EntityKey {
    static Create(v1: string, v2: string, v3?: any, v4?: any): any {
        throw new Error("Method not implemented.");
    }

}
 