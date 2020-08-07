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

import { FrameworkElement } from '../../basecomponentmodel/FrameworkElement';
import { SubscriptionEvent } from '../../utils/SubscriptionEvent';
import { MouseEventArgs } from '../events/MouseEventArgs';
import { Control } from '../../basecomponentmodel/Control';

export class UserControl extends Control {
    public DataContext : any = {};
    
    constructor() {
        super();
        this.MouseLeftButtonDown = new SubscriptionEvent();
        this.MouseLeftButtonUp = new SubscriptionEvent();
        this.MouseMove = new SubscriptionEvent();
    }
}