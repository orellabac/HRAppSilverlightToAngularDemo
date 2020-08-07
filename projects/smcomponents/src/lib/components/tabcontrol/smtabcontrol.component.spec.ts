import { SmTabControl, TabControlModel, SmTabItem } from "./smtabcontrol.component";
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';

describe('SmTabControl default initialization', () => {
    let component: SmTabControl;
    let fixture: ComponentFixture<SmTabControl>;
    beforeEach(() => {
       TestBed.configureTestingModule({
           declarations: [ SmTabControl ],
           providers: [
           ]
       }).compileComponents();

    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SmTabControl);
        component = fixture.componentInstance;
        
        fixture.detectChanges();
    });

    it('should create a the tabcontrol component', () =>  {
       expect(component).toBeDefined();
    });

    it('should have a default model', () =>  {
        expect(component.model).toBeDefined();
        expect(component.model).toBeInstanceOf(TabControlModel);
     });
});

@Component({
   selector: 'tab-test1',
   template: `
   <sm-tabcontrol>
      <sm-tabitem title='First tab'>
         <ng-template #itemContentTemplate="">
           <button>a button</button>
         </ng-template>
      </sm-tabitem>
      <sm-tabitem title='Second tab'>
         <ng-template #itemContentTemplate="">
            <input type="text">
         </ng-template>
      </sm-tabitem>
    </sm-tabcontrol>`
})
class TabTestWithTabsComponent {
    @ViewChild(SmTabControl) tabComponent : SmTabControl;
}

describe('TabControl with design time tabs', () =>{
    let fixture: ComponentFixture<TabTestWithTabsComponent>;
    let component: TabTestWithTabsComponent;
    beforeEach(() => {
       TestBed.configureTestingModule({
           declarations: [ TabTestWithTabsComponent, SmTabControl, SmTabItem ],
           providers: [
           ]
       }).compileComponents();       
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(TabTestWithTabsComponent);
        component = fixture.componentInstance;
        
        fixture.detectChanges();
    });
    it("should create model items", () =>{
       expect(component.tabComponent).toBeDefined();
       // Sadly we need to call `whenStable` because of a 
       // call to `setTimeout`
       fixture.whenStable().then(() =>{
          expect(component.tabComponent.model.items.count).toBe(2);
       });
    });
});