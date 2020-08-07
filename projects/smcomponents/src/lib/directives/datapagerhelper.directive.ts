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

import { Directive, Input } from '@angular/core';
import { DataPagerHelper } from '../components/datapager/smdatapager.component';
import { DataBindingDirective, GridComponent } from '@progress/kendo-angular-grid';
 
@Directive({
    selector: '[data-pager-helper-binding]'
 })
 export class DataPagerHelperBindingDirective extends DataBindingDirective {
   @Input('data-pager-helper-binding')
   public pager : DataPagerHelper;
   public requestResizeOnNextUpdate : boolean = false;
   constructor(grid : GridComponent) {
       super(grid);
   }
    public ngOnInit() : void {
       super.ngOnInit();      
       this.grid.pageable = true;
       this.grid.skip = 0;
       this.grid.pageSize = this.pager.pageSize;
       if (this.grid.columnList.toArray().length == 0) {
         this.requestResizeOnNextUpdate = true;
       }
       this.updateGridData()
       this.pager.sourceChanged = () => { 
         this.rebind();
         
         if (this.requestResizeOnNextUpdate) {
           this.requestResizeOnNextUpdate = false;
            setTimeout(
                (() => this.grid.autoFitColumns()),
                500);
         }
       };
       this.grid.pageChange.subscribe((pageChangeResult) => {
           this.pager.pageChange(pageChangeResult);
           this.rebind();
           setTimeout(
            (() => this.grid.autoFitColumns()),
            500);
       });
       this.rebind();

   }
 
   public rebind() {    
     this.grid.data = this.pager.outputCollection;
     this.grid.autoFitColumns();

     this.notifyDataChange();
   }
 
 
 }