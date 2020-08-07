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

import { DataField } from './DataField';
import { FrameworkElement } from '../../basecomponentmodel/FrameworkElement';
import { SubscriptionEvent } from '../../utils/SubscriptionEvent';
import { ValidationSummary } from './Validation';

export class DataFormAutoGeneratingFieldEventArgs {
    PropertyName: string;
    Field: DataField;
}
export class DataForm extends FrameworkElement{
    private currentItem : any = {};
    public ValidateItem() : boolean {
        return false;
    }
    public AutoGeneratingField = new SubscriptionEvent<(s: any, e: DataFormAutoGeneratingFieldEventArgs) => void>();
    OnAutoGeneratingField(e: DataFormAutoGeneratingFieldEventArgs): any {
        throw new Error("Method not implemented.");
    }
    CancelEdit(): any {
    }
    public get CurrentItem() {
        return this.currentItem;
    }
    public set CurrentItem(value : any) {
        this.currentItem = value;
    }

    public BeginEdit() {
    }
    public EndEdit() {
    }

   public CommitEdit() : boolean {
       return false;
   }

   public get ValidationSummary() : ValidationSummary {
       return null;
   }
}