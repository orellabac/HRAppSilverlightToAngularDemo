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

export class Exception {
    innerError: Error;
    InnerException: any = null;
    public get Message(): string {
        return this.description;
    }
    constructor(private description: string) {
        this.innerError = new Error();
    }

    get StackTrace(): string {
        return this.innerError.stack || "";
    }
    public GetType() {
        throw new Error("Not implemented");
    }
}
export class ArgumentException extends Exception {
    
}
export class ArgumentNullException {
    constructor(argumentName : string, description?: string) {

    }
}

export class NotImplementedException {
    constructor(description?: string) {

    }
}

export class StackFrame {
    public GetMethod() : any {
        throw new Error("Not implemented");
    }
}

export class StackTrace {
    constructor(exception? : any) {

    }
    public GetFrame(n? : number) : StackFrame {
        throw new Error("Not implemented");
    }
}


export class InvalidOperationException extends Exception {
    constructor(description: string) {
        super(description);
    }
}



export class NotSupportedException extends Exception {
    constructor(description?: string) {
        super(description || "");
    }

}