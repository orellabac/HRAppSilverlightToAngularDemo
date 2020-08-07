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

 import { IRegion } from './IRegion';
import { IViewsCollection } from './IViewsCollection';
import { IRegionBehaviorCollection } from './IRegionsBehaviors';

export class Region implements IRegion {
    Activate(view: any): void {
        throw new Error("Method not implemented.");
    }
    Add(view: any, str?: string, flag?: boolean): void {
        throw new Error("Method not implemented.");
    }
    Deactivate(view: any): void {
        throw new Error("Method not implemented.");
    }
    GetView(name: string) {
        throw new Error("Method not implemented.");
    }
    Remove(view: any): void {
        throw new Error("Method not implemented.");
    }
    ActiveViews: IViewsCollection;
    Views: IViewsCollection;
    Behaviors: IRegionBehaviorCollection;
}

export class SingleActiveRegion extends Region {
    
}