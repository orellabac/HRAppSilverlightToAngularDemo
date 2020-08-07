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

import { FrameworkElement } from '../../basecomponentmodel/FrameworkElement';
import { SubscriptionEvent } from '../../utils/SubscriptionEvent';
import { DialogService } from '@progress/kendo-angular-dialog';
import { Application } from '../../basecomponentmodel/Application';
import { ContentControlModel } from '../../components/contentcontrol/smcontent.component';

export class ChildWindow extends ContentControlModel {
    private dialogResult : boolean = false;
    private dialogInstance : any = null;
    public Title : string  = "_";
    angularComponent : any;
    public Closed = new SubscriptionEvent<(s:any,e: any) => void>();
    public HasCloseButton : boolean;

    public static createChildWindow<T>(windowClass : any,model? : ChildWindow, dialogService? : DialogService) : T {
        let dialogServiceInstance =
              dialogService || Application.Current.dialogService;
        let dialog = dialogServiceInstance.open(
            { title: model.Title ,content: windowClass }
          );
        dialog.content.instance.dialogInstance = dialog; 
        dialog.content.instance.model = model;
        dialog.dialog.instance.title = model.Title || dialog.content.instance.Title;
        dialog.result.subscribe(() => {
            if (dialog.content.instance.model.Closed.toFunction()) {
                dialog.content.instance.model.Closed.toFunction()(dialog.content.instance.model);

            }
        });
        if (model) {
           model.dialogInstance = dialog;
        }
        return dialog.content.instance;
    }

   public Show() {
      ChildWindow.createChildWindow(this.angularComponent, this);
   }
   get DialogResult() : boolean {
        return this.dialogResult;
   }

   set DialogResult(value : boolean) {
    this.dialogResult = value;
    if (value !== null) {
        this.Close();
    }
   }

   public OnClosed(e : any) {
       throw new Error("Not implemented");
   }

   public LayoutUpdated = new SubscriptionEvent<(sender: any, e: any) => void>();

   public Close() {
      this.dialogInstance.close();
   }
}