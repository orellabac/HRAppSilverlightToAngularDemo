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
import { SmTextBlock } from '../../components/textblock/smtextblock.component';
import { DependencyProperty } from '../../basecomponentmodel/DependencyProperty';

export class TextBlock  extends FrameworkElement {
    public FontSize : number;
    public angularComponent : any = SmTextBlock;
    public Text : string = "";
    static TextProperty: DependencyProperty = null;
}