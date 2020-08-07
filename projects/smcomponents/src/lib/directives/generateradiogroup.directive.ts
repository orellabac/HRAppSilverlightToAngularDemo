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

import { Directive, Input, Self } from '@angular/core';
import { RadioNameService } from '../services/radiobuttonsnames.service';
import { DataContextService } from '../services/datacontextprovider.service';

@Directive({
    selector: '[generateRadioGroups]',
    providers: [{ provide: RadioNameService }]
  })
  export class GenerateRadioGroupDirective {
  }
  
  @Directive({
    selector: '[elementDataContext]',
    providers: [{ provide: DataContextService }]
  })
  export class ElementDataContextDirective {
    @Input()
    elementDataContext;
    constructor(@Self() private  selfContext : DataContextService) {
  
    }
    ngOnInit() {
      this.selfContext.dataContext = this.elementDataContext;
    }
  }
  