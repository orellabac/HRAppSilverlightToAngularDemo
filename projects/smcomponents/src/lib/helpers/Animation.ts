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
import { DependencyObject } from '../basecomponentmodel/DependencyObject';

export class Storyboard extends DependencyObject {
    public Completed: SubscriptionEvent<any>;
    public Name : string
    public Begin() {
        //setTimeout(() => {
        requestAnimationFrame(() => {
            this.Completed.fire(null);
        });
        //}, 1000);

    }
    public Stop() {

    }
    constructor() {
        super();
        this.Completed = new SubscriptionEvent<any>();
    }
    public  withName(name : string) : Storyboard {
        this.Name = name;
        return this;
    }
}


export class Duration {
    public static Automatic :  Duration;
    public TimeSpan : number;
    public get HasTimeSpan() {
        return typeof this.TimeSpan != "undefined";
    }
    constructor(time : number) {
        this.TimeSpan = time;
    }
}