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


export class ParameterExpression {
    constructor(public name : string) {

    }
}
export class CSharpExpression {
    public toRiaQuery(ctxt  : any) : string { 
        return "";
    }
}

export class LambdaExpression extends CSharpExpression {
   constructor(public arg : ParameterExpression, public bodyExpr: CSharpExpression) {
       super();
   }
   public toRiaQuery(ctxt  : any) : string {
      return this.bodyExpr.toRiaQuery(ctxt);
   }
}

export class NotEqualExpression extends CSharpExpression {
    constructor(public left : CSharpExpression, public right : CSharpExpression ) {
        super();
    }
    public toRiaQuery(ctxt  : any) : string {
        if (this.left instanceof CallExpression
            && this.left.method instanceof MemberExpression
            && this.left.method.name == "indexOf"
            && this.right instanceof LiteralExpression
            && this.right.expr === -1) {
           return this.left.method.owner.toRiaQuery(ctxt) + ".Contains(" + this.left.args[0].toRiaQuery(ctxt) + ")";
        } else{
            throw new Error("Conversion not supported");
        }
     }
}

export class CallExpression extends CSharpExpression {
    constructor(public method : CSharpExpression,public args : Array<CSharpExpression>) {
        super();
    }
    public toRiaQuery(ctxt  : any) : string {
        throw new Error("Not implemented");
    }
}

export class MemberExpression extends CSharpExpression {
    constructor(public owner : CSharpExpression,public name : string) {
        super();
    }
    public toRiaQuery(ctxt  : any) : string {
        return this.owner.toRiaQuery(ctxt) + "." + this.name;
    }

}

export class IdExpression extends CSharpExpression {
    constructor(public name : string) {
        super();
    }
    public toRiaQuery(ctxt  : any) : string {
        if (ctxt[this.name]) {
            return ctxt[this.name];
        }else {
            return this.name;
        }
    }
}

export class LiteralExpression extends CSharpExpression {
    constructor(public expr : any) {
        super();
    }
    public toRiaQuery(ctxt  : any) : string {
        if (typeof this.expr == "string") {
            return "\"" + this.expr.toString() + "\""
        }else{
            return this.expr.toString();
        }
    }
}

export class ThisExpression extends CSharpExpression {
    constructor() {
        super();
    }
    public toRiaQuery(ctxt  : any) : string {
        throw new Error("error");
    }
}
