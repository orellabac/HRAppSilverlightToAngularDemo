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

import { Component, Input } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';

@Component({
    selector: 'data-pager-helper',
    template: '<span></span>'
  })
  export class DataPagerHelper {
    
    private sourceCollection : Array<any>;
    @Input() pageSize : number = 5;
    @Input() 
    set source(value : Array<any>)  {
      this.sourceCollection = value;    
      this.filterCollectionIfRequired(0);
      if (this.sourceChanged) {
         this.sourceChanged();
      }
    } 
  
    public skip : number = 0;
  
    public outputCollection : GridDataResult = { data: [], total: 0 };
  
    public sourceChanged : () => void;
  
    constructor() {
    }
  
    ngOnInit() {
       this.filterCollectionIfRequired(0);
    }
  
    filterCollectionIfRequired(skip : number): void {
      this.skip = skip;
      if (this.sourceCollection && this.sourceCollection.length > 0){
        this.outputCollection = {
          data: this.sourceCollection.slice(skip, skip + this.pageSize),
          total: this.sourceCollection.length
        };
      } else if (this.sourceCollection && this.sourceCollection.length == 0) {
        this.outputCollection = {
          data: [],
          total: 0
        }; 
      }
    }
  
    pageChange(pageChangeEvent : PageChangeEvent) {
      this.filterCollectionIfRequired(pageChangeEvent.skip);    
    }
  }