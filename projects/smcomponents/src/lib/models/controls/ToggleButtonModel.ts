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

import { Control } from '../../basecomponentmodel/Control';
import { DependencyProperty } from '../../basecomponentmodel/DependencyProperty';
import { SubscriptionEvent } from '../../utils/SubscriptionEvent';

export class ToggleButtonModel extends Control {
    public static IsCheckedProperty = new DependencyProperty("IsChecked", 0, (id) => id);
 
    public Checked : SubscriptionEvent<(a1 : any, a2: any) => void> = new SubscriptionEvent();
    private isChecked = false;
    public get IsChecked() : boolean  {
       return this.isChecked;
    }
    public set IsChecked(value : boolean) {
        if (this.isChecked != value){
         this.isChecked = value;
         this.change.fire(["IsChecked"]);
        }
    }
 
    public Content : any;
 }