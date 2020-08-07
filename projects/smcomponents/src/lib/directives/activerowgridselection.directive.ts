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

import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { SelectionEvent, GridComponent } from '@progress/kendo-angular-grid';

 @Directive({
    selector: '[activeRowGridSelection]'
})
export class ActiveRowGridSelection {
  @Input()
  activeRowToBind;
  @Output()
  activeRowToBindChange : EventEmitter<any> = new EventEmitter();

  constructor(private host : GridComponent) {  
     host.selectionChange.subscribe((ev : SelectionEvent) => {         
         if (ev && ev.selectedRows && ev.selectedRows.length) {             
           this.activeRowToBindChange.emit(ev.selectedRows[0].dataItem);
         }
     });
  }
}