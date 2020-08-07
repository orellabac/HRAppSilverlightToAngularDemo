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

import { SubscriptionEvent } from '../utils/SubscriptionEvent';

export class DispatcherTimer {
    private intervalToCancel: number = -1;
    public Interval: number = 1000;
    enabled: boolean = false;

    public Tick: SubscriptionEvent<(e: any,a : any) => void> = new SubscriptionEvent();;
    public get IsEnabled() {
        return this.enabled;
    }
    public set IsEnabled(value: boolean) {
        this.enabled = value;
    }
    public Start() {
        if (this.intervalToCancel === -1) {
            this.intervalToCancel = window.setInterval(
                () => { this.Tick.fire([]); },
                this.Interval
            );
        }
    }
    public Stop() : void {
        window.clearInterval(this.intervalToCancel);
        this.intervalToCancel = -1;
    }
}