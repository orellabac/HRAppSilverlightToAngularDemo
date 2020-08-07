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

import { FrameworkElement } from '../basecomponentmodel/FrameworkElement';
import { SortDescriptor, FilterDescriptor } from './DescriptorSupport';
import { DomainContext, LoadBehavior } from './DomainContext';
import { EntityContainerHelper } from './EntitiesSupport';
import { ReflectionHelper } from '../baseframework/ReflectionSupport';

export class DomainDataSource extends FrameworkElement {    
    private sortDescriptors : SortDescriptor[] = [];
    addSortDescriptor(desc: SortDescriptor): any {
        this.sortDescriptors.push(desc);
    }
    private filterDescriptors : FilterDescriptor[] = [];
    addFilterDescriptor(filterDescriptor: FilterDescriptor): void {
        this.filterDescriptors.push(filterDescriptor);
        filterDescriptor.setParent(this);
    }
    
    public Data : any[] = [];
    public Name : string = "";
    QueryName: string;
    _autoLoad: boolean;
    DomainContext: DomainContext;
    public Current = {};
    public columns = [];

    constructor() {
        super();
        this.SubmitChangesCommand = {
            Execute: () => this.SubmitChanges()
        }
    }

    public withName(name:string) : DomainDataSource{
        this.Name = name;
        return this;
    }

    public SubmitChanges(): any {
        this.DomainContext.SubmitChanges(null, null);
    }

    public get AutoLoad() {
        return this._autoLoad;
    }
    public set AutoLoad(value: boolean) {
        if (this._autoLoad != value) {
            setTimeout(() => {
                this.performLoad();
            });
        }
        this._autoLoad = value;
    }

    public performLoad() {
        let createQueryMethod = null;
        if ((createQueryMethod = this.DomainContext[this.QueryName + "Query"]) !== undefined
           || (createQueryMethod = this.DomainContext[this.QueryName]) !== undefined) {
           let query = createQueryMethod.apply(this.DomainContext);
           query.setFilterCriterias(this.getFilterUrlFragments(), this.getSortUrlFragments());

           if (query.Constructor && this.columns.length === 0) {
               this.columns = this.createColumns(query.Constructor);
           }

           var loadResult = this.DomainContext.Load(query, LoadBehavior.RefreshCurrent, true, query.Constructor);
           loadResult.Completed = () => {
               this.Data =  EntityContainerHelper.getEntities( query.Constructor.name );
           };
        }
    }
    createColumns(constructor: any): any[] {
        let info = ReflectionHelper.getTypeInfo(constructor);
        let props = [];
        for (let prop of Object.getOwnPropertyNames(constructor.prototype)) {
            let format = null;
            let propertyInfo = info.getProperty(prop);
            if (typeof Object.getOwnPropertyDescriptor(constructor.prototype, prop)['get'] !== "undefined") {
                if (propertyInfo?.propertyType?.innerType === Date) {
                    format = "{0:d}";
                } 
                props.push({
                    field: prop, format: format
                });
            }
        }
        return props;
    }

    getSortUrlFragments() : string {
        var desc = this.sortDescriptors
            .map(desc => desc.getUrlFragment())
            .filter((str) => str !== "");
        let finalStr =  desc.join('&');
        if (finalStr != "") {
            finalStr = `$orderby=${finalStr}`;
        }
        return finalStr;
    }

    getFilterUrlFragments(): string {
        let result = "";
        for(let descriptor of this.filterDescriptors) {
           let strFragment : string;
           strFragment = descriptor.getUrlFragment();
           if (strFragment != "") {
               if (result !== "") {
                   result = result + "&";
               }
               result = result + strFragment;
           }
           if (result != "") {
               result = "$where=" + result;
           }
        }
        return result;
    }

    public SubmitChangesCommand : {
        Execute: () => void;
    } = null;
}