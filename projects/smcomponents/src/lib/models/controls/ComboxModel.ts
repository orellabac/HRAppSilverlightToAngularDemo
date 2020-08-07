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
import { SmSimpleComboBox } from '../../components/combobox/smcombobox.component';
import { ContainerChildrenContainer } from '../../basecomponentmodel/ContainerChildrenContainer';
import { SubscriptionEvent } from '../../utils/SubscriptionEvent';

export class ComboBox extends Control {

    static SelectedItemProperty: DependencyProperty;
    public angularComponent: any = SmSimpleComboBox;
    public selectedIndex : number = 0;
    public items : ContainerChildrenContainer;
    public _items = [];
    ItemsSource: Iterable<any>;
    
    public SelectionChanged = new SubscriptionEvent<(s:any,e: any) => void>();
    constructor() {
        super();
        this.items = new ContainerChildrenContainer(this);
    }    

    public addChild(child : any) {
        this._items.push({index: this._items.length, content: child });
     }
}