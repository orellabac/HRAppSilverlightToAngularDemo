import { DataBindingExtensions} from "./DataBindingExtensions";
import { DataField, FrameworkElement, DependencyProperty, Binding, ArgumentNullException, TextBox} from "smcomponents";
/// <summary>
///     Provides extension methods for performing operations on a <see cref="DataField"/>.
/// </summary>
export class DataFieldExtensions {
   /**
    * 
    *     Replaces a <see cref="DataField" />'s <see cref="TextBox" /> control with another control,
    *     taking care of automatically updating the bindings.
    * 
    * @param newControl The new control you're going to set as <see cref="DataField.Content" />
    * @param dataBindingProperty The control's property that will be used for data binding        
    */
   public static ReplaceTextBox__overload_0 (field : DataField,newControl : FrameworkElement,dataBindingProperty : DependencyProperty) : void {
      DataFieldExtensions.ReplaceTextBox__overload_1(field, newControl, dataBindingProperty, (binding) => {
      });
   }
   /**
    * 
    *     Replaces a <see cref="DataField" />'s <see cref="TextBox" /> control with another control,
    *     taking care of automatically updating the bindings and overriding the existing converter
    *     with another one
    * 
    * @param newControl The new control you're going to set as <see cref="DataField.Content" />
    * @param dataBindingProperty The control's property that will be used for data binding        
    * @param bindingSetupFunction 
    *     A function you can use to change parameters on the newly generated binding before
    *     it is applied to <paramref name="newControl"/>
    * 
    */
   public static ReplaceTextBox__overload_1 (field : DataField,newControl : FrameworkElement,dataBindingProperty : DependencyProperty,bindingSetupFunction : (p0 : Binding) => void) : void {
      if (field == null) {
         throw new ArgumentNullException ("field");
      }
      if (newControl == null) {
         throw new ArgumentNullException ("newControl");
      }
      var newBinding : Binding = DataBindingExtensions.CreateCopy(field.Content.GetBindingExpression(TextBox.TextProperty).ParentBinding);
      if (bindingSetupFunction != null) {
         bindingSetupFunction(newBinding);
      }
      // Replace field
      newControl.setBinding(dataBindingProperty, newBinding);
      field.Content = newControl;
   }
}