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
 * from MobFilize.Net Corporation.
 ******************************************************************************/


// this file contains stubs for SAX-style XML parsing

export enum XmlNodeType {
    Element
}

export class XmlReader {
    public Name: string;
    public Value : any;
    public NodeType: XmlNodeType;
    public MoveToAttribute(attName : string): boolean {
        throw Error("Not implemented");
    }
    public static Create(str : string): any {
        throw Error("Not implemented");
    }
    public Read(): any {
        throw Error("Not implemented");
    }
    public Dispose(): void {
        throw Error("Not implemented");
    }
}