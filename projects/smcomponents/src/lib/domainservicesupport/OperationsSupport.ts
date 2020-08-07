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

import { Exception } from '../baseframework/Exceptions';
import { Entity } from './EntitiesSupport';
import { SubscriptionEvent } from '../utils/SubscriptionEvent';
import { INotifyPropertyChanged } from '../basecomponentmodel';

export class OperationBase implements INotifyPropertyChanged {
    PropertyChanged: SubscriptionEvent<(o: any, args: { PropertyName: string; }) => void>;
    Cancel(): any {
        throw new Error("Method not implemented.");
    }
    IsComplete: any;
    CanCancel: any;
    
}


export class SubmitOperation extends OperationBase {
    Error : Exception;
   ChangeSet: any;
   EntitiesInError: Entity[];
   IsCanceled: boolean;
   UserState: any;
    MarkErrorAsHandled(): any {
        throw new Error("Method not implemented.");
    }
    HasError: any;

}


export class LoadOperationBase extends OperationBase {

} 

export class LoadOperation<T> extends LoadOperationBase {
    TotalEntityCount : number;
    UserState : any;
    Entities : Iterable<T>;
    MarkErrorAsHandled() {
        throw new Error("Method not implemented.");
    }
    Completed: (sender: any, e: any) => void;
    HasError: any;
}


  
export class LoginOperation extends OperationBase {
    Cancel(): any {
        throw new Error("Method not implemented.");
    }
    Error: any;
    IsCanceled: any;
    CanCancel: boolean;
    MarkErrorAsHandled(): any {
        throw new Error("Method not implemented.");
    }
    LoginSuccess: any;
    HasError: any;

    public Completed = new SubscriptionEvent<(s: any, e: any) => void>();

}


export class LoadUserOperation {

}



export class ChangeSetEntry {

}


export class EntityChangeSet {

}



export class  InvokeOperation<T> 
{
    
    public Value :T;
    public SupportsCancellation : boolean;
     CancelCore() : void {}
 InvokeCompleteAction() : void {}
}


export enum EntitySetOperations {
    Edit,
    Add,
    None
  }
  