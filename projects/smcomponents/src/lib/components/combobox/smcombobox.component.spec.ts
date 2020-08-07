import { SmSimpleComboBox } from "./smcombobox.component";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Injector, Component, ViewChild } from '@angular/core';
import { ComboBox } from '../../models/controls/ComboxModel';

describe('SmComboBox default initialization', () => {
    let component: SmSimpleComboBox;
    let fixture: ComponentFixture<SmSimpleComboBox>;
    beforeEach(() => {
       TestBed.configureTestingModule({
           declarations: [ SmSimpleComboBox ],
           providers: [
           ]
       }).compileComponents();

    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SmSimpleComboBox);
        component = fixture.componentInstance;
        
        fixture.detectChanges();
    });

    it('should create a the canvas component', () =>  {
       expect(component).toBeDefined();
    }) ;

    it('should have a default model', () =>  {
        expect(component.model).toBeDefined();
        expect(component.model).toBeInstanceOf(ComboBox);
     }) ;
});

@Component({
  selector: 'combobox-test-app',
  template: `
     <sm-simple-combobox
         [data]="exampleData"
         valueField="deptId"
         displayField="deptName">
    </sm-simple-combobox>
  `
})
class ComboBoxTestApp1 {
    @ViewChild(SmSimpleComboBox)
    innerCombo : SmSimpleComboBox;

    exampleData : {deptName : string, depthId : number}[] = [
        { deptName: 'IT', depthId: 10 },
        { deptName: 'HR', depthId: 20 },
        { deptName: 'Finance', depthId: 30 },
    ] 
}
 

describe('ComboBox without model interaction', () =>{
    let fixture: ComponentFixture<ComboBoxTestApp1>;
    let component: ComboBoxTestApp1;
    beforeEach(() => {
       TestBed.configureTestingModule({
           declarations: [ ComboBoxTestApp1, SmSimpleComboBox ],
           providers: [
           ]
       }).compileComponents();

    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ComboBoxTestApp1);
        component = fixture.componentInstance;
        
        fixture.detectChanges();
    });

    it("should create the inner combobox",() =>{
       expect(component.innerCombo).toBeDefined();
       expect(component.innerCombo.model).toBeDefined();
       expect(component.innerCombo.data.length).toBe(3);
    });
});

/**
 *  Create combo with model
 */ 

@Component({
    selector: 'combobox-test-app',
    template: `
       <sm-simple-combobox [model]="myCombo">
      </sm-simple-combobox>
    `
  })
  class ComboBoxTestAppWithCombo {
      @ViewChild(SmSimpleComboBox)
      innerCombo : SmSimpleComboBox;
  
      myCombo : ComboBox;
      constructor() {
         this.myCombo = new ComboBox();
         this.myCombo.addChild("First");
         this.myCombo.addChild("Second");
      }
  }
   
  
  describe('ComboBox model ', () =>{
      let fixture: ComponentFixture<ComboBoxTestAppWithCombo>;
      let component: ComboBoxTestAppWithCombo;
      beforeEach(() => {
         TestBed.configureTestingModule({
             declarations: [ ComboBoxTestAppWithCombo, SmSimpleComboBox ],
             providers: [
             ]
         }).compileComponents();
  
      });
  
      beforeEach(() => {
          fixture = TestBed.createComponent(ComboBoxTestAppWithCombo);
          component = fixture.componentInstance;
          
          fixture.detectChanges();
      });
  
      it("should create the inner combobox",() =>{
         expect(component.innerCombo).toBeDefined();
         expect(component.innerCombo.model).toBeDefined();
         expect(component.innerCombo.model._items.length).toBe(2);
      });
  });



  /**
 *  Create combo with model
 */ 

@Component({
    selector: 'combobox-test-app',
    template: `
       <sm-simple-combobox  [data]="exampleData"
                            valueField="deptId"
                            displayField="deptName">
       <ng-template #itemsTemplate="" let-dataItem="">
          <span class="itemTemplateItem">
              {{dataItem}}
          </span>
       </ng-template>
       <ng-template #listValueTemplate ="" let-dataItem="">
         <span class="valueTemplateItem">
              {{dataItem}}
          </span>
        </ng-template>
      </sm-simple-combobox>
    `
  })
  class ComboBoxTestAppWithTemplate {
      @ViewChild(SmSimpleComboBox)
      innerCombo : SmSimpleComboBox;

      exampleData : {deptName : string, depthId : number}[] = [
        { deptName: 'IT', depthId: 10 },
        { deptName: 'HR', depthId: 20 },
        { deptName: 'Finance', depthId: 30 },
    ] 
  }
  
  /**
   *   Create combo with template
   */
  
  describe('ComboBox with template ', () =>{
      let fixture: ComponentFixture<ComboBoxTestAppWithTemplate>;
      let component: ComboBoxTestAppWithTemplate;
      beforeEach(() => {
         TestBed.configureTestingModule({
             declarations: [ ComboBoxTestAppWithTemplate, SmSimpleComboBox ],
             providers: [
             ]
         }).compileComponents();
  
      });
  
      beforeEach(() => {
          fixture = TestBed.createComponent(ComboBoxTestAppWithTemplate);
          component = fixture.componentInstance;
          
          fixture.detectChanges();
      });
  
      it("should create the inner combobox with the template",() =>{
         expect(component.innerCombo).toBeDefined();
         expect(component.innerCombo.model).toBeDefined();
         expect(component.innerCombo.data.length).toBe(3);

         expect(fixture.nativeElement.querySelector('.valueTemplateItem')).toBeDefined();
      });
  });