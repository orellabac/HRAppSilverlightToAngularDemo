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

import { SmStream } from '../helpers/StreamsSupport';

export class ResourceManager {
    collection: any = {};
    constructor(collectionId: string) {
        this.collection = GlobalResourceManager.resourceCollections[collectionId] || {};
    }
    public GetString(key: string, resourceCulture: any): string {
        return this.collection[key] || "";
    }
    public GetStream(key: string, resourceCulture: any): SmStream {
        throw new Error("Not implemented");
    }
}

export class ResourceDictionary {
    public MergedDictionaries : any;
    public Source : any;
}

export class GlobalResourceManager {
    static resourceCollections = {};

    public static getCollection(id: string): any {
        return GlobalResourceManager.resourceCollections[id];
    }

    public static registerResourceEntry(resourceCollectionKey: string, resourceKey: string, value: string): void {
        let collection: any = null;
        if (!(collection = GlobalResourceManager.resourceCollections[resourceCollectionKey])) {
            GlobalResourceManager.resourceCollections[resourceCollectionKey] = collection = {};
        }
        collection[resourceKey] = value;
    }


}