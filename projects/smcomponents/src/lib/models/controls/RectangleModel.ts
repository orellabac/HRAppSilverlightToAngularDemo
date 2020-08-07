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

import { UIElement } from '../../basecomponentmodel/UIElement';
import { SmRectangle } from '../../components/rectangle/smrectangle.component';
import { SubscriptionEvent } from '../../utils/SubscriptionEvent';

export class Rectangle extends UIElement {
    Width: number;
    Height: number;
    ActualHeight : number;
    ActualWidth : number;
    fillColor: string = "white";
    public refreshCallBack: () => void;
    public get Fill(): string {
        return this.fillColor;
    }
    public set Fill(value: string) {
        if (this.fillColor != value) {
            this.fillColor = value;
            this.signalComponentRefresh();
        }
    }

    public readonly angularComponent: any = SmRectangle;

    public MouseLeftButtonDown: SubscriptionEvent<(s: any, e: any) => void>;
    constructor() {
        super();
        this.MouseLeftButtonDown = new SubscriptionEvent<(s: any, e: any) => void>();
    }

    signalComponentRefresh() {
        if (this.refreshCallBack) {
            this.refreshCallBack();
        }

    }
}