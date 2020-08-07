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

import { LoginOperation } from './OperationsSupport';
import { SubscriptionEvent } from '../utils/SubscriptionEvent';
import { INotifyPropertyChanged } from '../basecomponentmodel';


export class AuthenticationService {
    Logout(arg0: (logoutOperation: any) => void, arg1: null): any {
        throw new Error("Method not implemented.");
    }
    Login(arg0: LoginParameters, LoginOperation_Completed: (loginOperation: LoginOperation) => void, arg2: null): LoginOperation {
        throw new Error("Method not implemented.");
    }
    LoadUser(callback: (operation: any) => void, arg1: null): any {
        
    }
    LoggedIn =  new SubscriptionEvent<(sender: any, e: any) => void>();
    LoggedOut =  new SubscriptionEvent<(sender: any, e: any) => void>();
}

export interface IPrincipal {

} 

class PrincipalImpl implements IPrincipal{

}


export interface IIdentity {

}



export class LoginParameters {
    constructor(private userName : string,
                private password : string,
                private persistent : boolean,
                private customData? : string) {

    }
}



export class WebContextBase implements INotifyPropertyChanged {
    public Authentication : AuthenticationService = new AuthenticationService();
    public _user : any;// = new  PrincipalImpl();
    public static Current : WebContextBase = new WebContextBase();
     public constructor(){
         this._user = new PrincipalImpl();
     }
    PropertyChanged: SubscriptionEvent<(o: any, args: { PropertyName: string; }) => void>;
}



export class WindowsAuthentication {
    
}


