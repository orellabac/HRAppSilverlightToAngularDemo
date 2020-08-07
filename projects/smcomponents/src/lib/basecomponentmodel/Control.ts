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

import { FrameworkElement } from './FrameworkElement';
import { DependencyProperty, DependencyPropertyChangedEventArgs } from './DependencyProperty';
import { DependencyObject } from './DependencyObject';
import { SubscriptionEvent } from '../utils';

export class Control extends FrameworkElement {
    public DefaultStyleKey : unknown;
    public IsEnabled: boolean;
    static IsEnabledProperty: DependencyProperty = null;
    public IsEnabledChanged : SubscriptionEvent<(sender : any,e : DependencyPropertyChangedEventArgs) => void>;
    static TemplateProperty: DependencyProperty = null;
    static BackgroundProperty: DependencyProperty = null;
    public GetTemplateChild(name: string)  : DependencyObject {
        throw new Error("Not implemented");
    }
    public Focus() {
        throw new Error("Not implemented");
    }
}

export class ControlTemplate {
    
}