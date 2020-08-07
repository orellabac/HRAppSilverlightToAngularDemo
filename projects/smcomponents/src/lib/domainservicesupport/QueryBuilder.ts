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

import { CSharpExpression } from '../helpers/ExpressionTrees';
import { EntityQuery } from './EntitiesSupport';

export class QueryBuilder<T> {
    private csWhere : CSharpExpression;
    ApplyTo(arg0: T[]): T[];
    ApplyTo(arg0: EntityQuery<T>): EntityQuery<T>;
    ApplyTo(arg0:any): any {
      if (this.csWhere){ 
         arg0.whereExpr =   this.csWhere.toRiaQuery({'b' : 'it'});
      }
      return arg0;
   }

   public AddWhere(expr : CSharpExpression) :  QueryBuilder<T> {
     this.csWhere = expr;
     return this;
   }

}

export class QueryResult<T> {

}

