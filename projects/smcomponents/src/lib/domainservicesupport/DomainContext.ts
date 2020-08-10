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

import { HttpClient } from "@angular/common/http";
import { catchError, map} from 'rxjs/operators'
import { Subject, forkJoin } from "rxjs";
import { EntityContainerHelper, EntityQuery, EntityState, IPendingChange } from './EntitiesSupport';
import { LoadOperation, SubmitOperation } from './OperationsSupport';
import { Application } from '../basecomponentmodel/Application';
import { Uri } from '../baseframework/Uri';
import { ReflectionHelper, PropertyInfo } from '../baseframework/ReflectionSupport';

export enum LoadBehavior {
    RefreshCurrent
};

export interface IClassConstructor<T> {
    new () : T;
}

export class DomainContext {
    protected pendingRequests: any[] = [];
    protected triggerTimeout : number = 0;
    public EntityContainer = new EntityContainerHelper();
    
    public angularHttp : HttpClient;

    public IsLoading : boolean = false;

    public servicesHost  = "6e3296f67971.ngrok.io";
    public serviceName  = "/ClientBin/MyService.svc";
    private endpoint : string = "";

    public PropertyChanged : (x:any,y:any) => void;

    constructor(private client? : any) {
        this.servicesHost = window.location.origin.toString() + '/';
        if (client && client.uri && client.uri.url) {
            if (client.uri.url.startsWith('http')) {
               this.endpoint = client.uri.url + "/json/";
            } else {
                this.serviceName = "/ClientBin/" +  client.uri.url;
                this.endpoint = `${this.servicesHost}${this.serviceName}/json/`;
            }
        } else  {
            //this.endpoint = this.servicesHost + this.serviceName + "/json/";
            this.serviceName = this.constructor.name.replace(/Client$/, '.svc');
            this.endpoint = `${this.servicesHost}${this.serviceName}/json/`;
        }
    }

    private mergeResults(entityName, resultSet, constructorClass) {
        var currentValues = EntityContainerHelper.entities[entityName];
        var index = {};
        var currentValuesLength = currentValues.length;
        var keyField = constructorClass["KeyField"] || "UID";
        for(let i = 0;i < currentValuesLength;i++) {
            index[currentValues[i][keyField]] = currentValues[i];
        }
        for(let item of resultSet) {
            if (! (item[keyField] in index) ) {
                currentValues.push(item);
            }
        }        
        // EntityContainerHelper.entities[entityName] = resultSet;
    }

    private inProgresRequest = new Set<string>();

    public Load<T>( query : EntityQuery<T>,  loadBehavior : LoadBehavior, flg : boolean, aClassConstructor : IClassConstructor<T>) : LoadOperation<T> {

        let resultLoadOp =  new LoadOperation<T>();
        //let endpoint = this.servicesHost + this.serviceName + "/json/";
        if (!this.angularHttp){
            this.angularHttp = Application.Current.angularHttpClient;
        }
        
        if (this.angularHttp) {
            const url = this.endpoint + query.getUrlFragment();
            if (this.inProgresRequest.has(url)) {
                return;
            } else {
                this.inProgresRequest.add(url);
            }
            let request = this.angularHttp.get(
                url
             
            ).pipe( catchError((e, y) =>
            {
                this.inProgresRequest.delete(url);
                console.error(e);
                return  [];
            })).pipe(map((result) => { 
                this.inProgresRequest.delete(url);
                return {
                    result: result, 
                    query: query, 
                    aClassConstructor : aClassConstructor,
                    resultLoadOp: resultLoadOp

                }; } ));
            this.pendingRequests.push(request);
            if (this.triggerTimeout == 0) {
                this.triggerTimeout = setTimeout(() => {
                    forkJoin(this.pendingRequests).subscribe((results) => {
                        //Application.Current.displayLoader = false;
                        this.IsLoading = true;
                        EntityContainerHelper.changeTrackingEnabled = false;
                        if (this.PropertyChanged) {
                            this.PropertyChanged(null, { PropertyName: "IsLoading" });
                        }
                        this.processResponseResults<T>(results, loadBehavior);
                        this.IsLoading = false; 
                        EntityContainerHelper.changeTrackingEnabled = true;
                        if (this.PropertyChanged) {
                            this.PropertyChanged(null, { PropertyName: "IsLoading" });
                        }
                        this.triggerTimeout = 0;
                        this.pendingRequests = [];
                    });
                });
            }
        } else {
            console.error("HTTP Service not available");
        }
        return resultLoadOp;
    }

    private processResponseResults<T>(results: unknown[], loadBehavior: LoadBehavior) {
        for (let requestResultT of results) {
            var requestResult: any = requestResultT;
            let result = requestResult.result;
            let resultSet = [];
            for (let item of result[requestResult.query.methodName + "Result"].RootResults) {
                var newObj = new requestResult.aClassConstructor();
                let classInfo = ReflectionHelper.getTypeInfo(requestResult.aClassConstructor);
                for (let propName of Object.keys(item)) {
                    let propertyInfo = classInfo.getProperty(propName);
                    let valueToAssign = item[propName];
                    if (propertyInfo && propertyInfo.propertyType) {
                       valueToAssign = this.convertJsonValueToPropertyType(propertyInfo, valueToAssign);
                    }
                    newObj[propName] = valueToAssign;
                }
                newObj.EntityState = EntityState.Unmodified;
                resultSet.push(newObj);
            }
            if (!(requestResult.aClassConstructor.name in EntityContainerHelper.entities)
                || loadBehavior == LoadBehavior.RefreshCurrent) {
                EntityContainerHelper.entities[requestResult.aClassConstructor.name] = resultSet;
            }
            else {
                this.mergeResults(requestResult.aClassConstructor.name, resultSet, requestResult.aClassConstructor);
            }

            // process included results
            if (result[requestResult.query.methodName + "Result"].IncludedResults) {
                for (let item of result[requestResult.query.methodName + "Result"].IncludedResults) {
                    if (EntityContainerHelper.cachedConstructors[item.__type]) {
                        var ctor = EntityContainerHelper.cachedConstructors[item.__type];
                        var newObj = new ctor();
                        for (let propName of Object.keys(item)) {
                            newObj[propName] = item[propName];
                        }
                        this.mergeResults(ctor.name, [newObj], ctor);
                    }
                }
            }
            // process included results
            if (requestResult.resultLoadOp && requestResult.resultLoadOp.Completed) {
                requestResult.resultLoadOp.Completed(null, null);
            }
        }
    }

    private convertJsonValueToPropertyType(propertyInfo: PropertyInfo, valueToAssign: any) {
        if (propertyInfo.propertyType?.innerType == window.Date
            && typeof valueToAssign === "string") {
              //  {"BirthDate":"\/Date(-8812)v =+0000\/
             // .replace(/^\/Date\((-.*)[-|+].*$/, "$1")
            valueToAssign = new Date(parseInt(valueToAssign.replace(/^\/Date\((-?.*)[-|+].*$/, "$1")));
        }
        return valueToAssign;
    }

    protected CreateQuery<T>(methodName : string, parameters? : ({[ x : string] : any}), hasSideEffects : boolean = true, isComposable : boolean = false, classConstructor : IClassConstructor<T> = null) : EntityQuery<T> {
       let result  = new EntityQuery<T>(methodName);
       result.parameters = parameters;
       result.Constructor = classConstructor;
       return result;
    }

    public SubmitChanges(callback : (result: SubmitOperation) => void, userData : any) : SubmitOperation {
        let addedElements = EntityContainerHelper.addedElements;
        var changesPayload = EntityContainerHelper.pendingChanges;
        
        let changedEntities = [...changesPayload.keys()];
        if (changedEntities.length > 0 || addedElements.size > 0)  {
            var changeSet = [];
            let id = 0;
            id = this.registerUpdates(changedEntities, changesPayload, changeSet, id);
            id = this.registerNewElements(addedElements, changeSet, id);

            let changeSetToSend = { changeSet: changeSet};

            this.angularHttp.post(
                this.servicesHost + this.serviceName + "/Json/SubmitChanges",
                changeSetToSend).pipe(
                    catchError((e) => {
                        alert("Internal error submitting changes");
                        console.error(e);
                        return [];
                    })).subscribe(response => {
                        this.processSubmitChangesValidResponse(response);
                    });
        }

        EntityContainerHelper.pendingChanges.clear();
        EntityContainerHelper.addedElements.clear();

        return new SubmitOperation();
        
    }

    private registerNewElements(addedElements: Map<string, any[]>, changeSet: any[], id: number) {
        for (let [entityName, newElements] of addedElements) {
            for (let newElement of newElements) {
                var changeObj = {};
                changeObj['__type'] =
                    entityName + ":#" + newElement.entityNamespace;
                
                newElement.copyEntityObjectDataInto(changeObj);

                changeSet.push({
                    Id: id++,
                    Entity: changeObj,
                    Operation: 2 /*add*/
                });
            }
        }
        return id;
    }

    private processSubmitChangesValidResponse(response: any) {
        let submitResult = response["SubmitChangesResult"];
        let errorMessages = "Validation errors:";
        let hasErrors = false;
        if (submitResult instanceof Array) {
            for (let obj of submitResult) {
                let validationErrors = obj["ValidationErrors"];
                if (validationErrors instanceof Array) {
                    hasErrors = true;
                    for (let error of validationErrors) {
                        errorMessages = errorMessages + "\n" + error["Message"];
                    }
                }
            }
        }
        else {
            console.log("SubmitChanges finished");
        }
        if (hasErrors) {
            alert(errorMessages);
        }
    }

    private registerUpdates(changedEntities: string[], changesPayload: Map<string, Map<string, IPendingChange>>, changeSet: any[], id: number) {
        for (let entityName of changedEntities) {
            var localChanges = changesPayload.get(entityName);
            for (let registeredChangeChangeKey of localChanges.keys()) {
                let registeredChange = localChanges.get(registeredChangeChangeKey);
                var changeObj = {};

                changeObj['__type'] =
                    entityName + ":#" + registeredChange.entityNamespace;
                let originalObj = { '__type': entityName + ":#" + registeredChange.entityNamespace };
                for (let originalObjProp in registeredChange.originalData) {
                    originalObj[originalObjProp] = registeredChange.originalData[originalObjProp];
                }

                registeredChange.entity.copyEntityObjectDataInto(changeObj);

                changeSet.push({
                    Id: id++,
                    Entity: changeObj,
                    OriginalEntity: originalObj,
                    Operation: 3 /*update*/
                });
            }
        }
        return id;
    }

    protected ValidateMethod(methodName : string, p : any){

    }
}

export class AuthenticationDomainContextBase extends DomainContext {
    constructor(private domainClient : DomainClient) {
       super(domainClient);
    }
       
 }

export class DomainClient {

}

export class WebDomainClient<T> extends DomainClient {
   constructor(private uri : Uri) {
      super();
   }
}

