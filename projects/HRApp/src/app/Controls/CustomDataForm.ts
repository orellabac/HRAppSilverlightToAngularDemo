import { DataFieldExtensions} from "../Helpers/DataFieldExtensions";
import { DataForm, SimpleDictionary, DataField, DataFormAutoGeneratingFieldEventArgs, ArgumentNullException, PropertyInfo, ReflectionHelper, TextBox, PasswordBox, syncComponentAndModel} from "smcomponents";
import { Component, Input, Optional, ElementRef} from "@angular/core";
import { HttpClient} from "@angular/common/http";
@Component({
   selector : "custom-data-form",
   template : `<div></div>`
})
export class CustomDataFormComponent {
   model : any;
   constructor (@Optional() injectedModel : CustomDataForm,private element : ElementRef <HTMLElement>) {
   }
}
/// <summary>
///     Enhances <see cref="DataForm" /> functionality by using a <see cref="PasswordBox" /> 
///     control for password fields and exposing a <see cref="CustomDataForm.Fields"/> collection 
///     to allow runtime access to <see cref="DataForm" /> fields.
/// </summary>
export class CustomDataForm extends DataForm {
   angularComponent : any = CustomDataFormComponent;
   private fields : SimpleDictionary <string, DataField> = new SimpleDictionary <string, DataField> ();
   get Fields() : SimpleDictionary <string, DataField> {
      return this.fields;
   }
   /**
    * 
    *     Extends <see cref="DataForm.OnAutoGeneratingField" /> by replacing <see cref="TextBox"/>es with <see cref="PasswordBox"/>es
    *     whenever applicable
    * 
    */
   public OnAutoGeneratingField (e : DataFormAutoGeneratingFieldEventArgs) : void {
      if (e == null) {
         throw new ArgumentNullException ("e");
      }
      var propertyInfo : PropertyInfo = ReflectionHelper.getTypeInfo(this.CurrentItem).getProperty(e.PropertyName);
      // Do the password field replacement if that is the case
      if (e.Field.Content instanceof TextBox && this.IsPasswordProperty(propertyInfo)) {
         DataFieldExtensions.ReplaceTextBox__overload_0(e.Field, new PasswordBox (), PasswordBox.PasswordProperty);
      }
      // Keep this newly generated field accessible through the Fields property
      this.fields.setItem(e.PropertyName,e.Field);
      // Call base implementation (which will call other event listeners)
      super.OnAutoGeneratingField(e);
   }
   /**
    * @param propertyInfo The entity property being analyzed
    * 
    *     Returns whether the given property should be represented by a <see cref="PasswordBox" /> or not.
    *     The default implementation will simply use a naming convention and returns true if the
    *     property contains the word "Password"
    * 
    */
   public IsPasswordProperty (propertyInfo : PropertyInfo) : boolean {
      if (propertyInfo == null) {
         throw new ArgumentNullException ("propertyInfo");
      }
      // Suggestion: to handle more complex scenarios, allow an entity to override
      // this mechanism by using the System.ComponentModel.DataAnnotations.UIHintAttribute 
      return propertyInfo.Name.search(new RegExp("Password","i")) != -1;
   }
}