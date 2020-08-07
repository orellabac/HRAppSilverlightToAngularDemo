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

import { UIElement } from './UIElement';
import { SubscriptionEvent } from '../utils/SubscriptionEvent';
import { RuntimeStyleInfo } from './RuntimeStyleInfo';
import { DependencyProperty } from './DependencyProperty';
import { Binding } from './Bindings';
import { Application } from './Application';
import { Thickness } from '../models/controls/Thickness';
import { SizeChangedEventArgs } from '../models/controls/Size';
import { DependencyObject } from './DependencyObject';

export class FrameworkElement extends UIElement {
    public change: SubscriptionEvent<(string) => void> = new SubscriptionEvent();
    public Loaded: SubscriptionEvent<(s:any,a:any) => void> = new SubscriptionEvent();
    public SizeChanged: SubscriptionEvent<(s:any,a:SizeChangedEventArgs) => void> = new SubscriptionEvent();
    public name : string = "";
    public DataContext: any;
    public width: number;
    public height: number;
    public style: RuntimeStyleInfo;
    public resources: any = {};
    public tag : unknown;
    GetBindingExpression(TextProperty: any): any {
        throw new Error("Method not implemented.");
    }
    protected componentContents: DependencyObject[] = [];
    public LostFocus = new SubscriptionEvent<(sender: any, e: any) => void>();
    public Visibility: boolean = true;

    public FindName(name: string): unknown {
        for (let element of this.componentContents) {
            if (element['Name'] === name) {
                return element;
            }
        }
        return null;
    }

    setBinding(name: DependencyProperty, binding: Binding) {
        this.change.addHandler((prop) => {
            if (prop == name.name) {
                var newValue = (<any>this)[name.name];
                if (this.DataContext) {
                    this.DataContext[binding.Path.prop] = newValue;
                }
            }
        });
    }

    protected initControlProperties() {
    }

    public getApplicationResource(key: string): any {
        if (Application.Current) {
            return Application.Current.getResourceByKey(key);
        } else {
            return null;
        }
    }

    public Parent : FrameworkElement;

    public get ActualHeight(): number {
        throw Error("Not implemented");
    }
    

    public get ActualWidth(): number {
        throw Error("Not implemented");
    }

    public OnApplyTemplate() {
    }

    public get Margin() : Thickness {
        throw new Error("Not implemented");
    }

}