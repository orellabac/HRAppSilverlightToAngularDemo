import { SmButton } from "./smbutton.component";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Injector, NgModule, Component } from '@angular/core';
import { SmContentComponent, ContentControlModel } from '../contentcontrol/smcontent.component';
import { ButtonModel } from '../../models/controls/ButtonModel';

describe('SmButton default initialization', () => {
    let component: SmButton;
    let fixture: ComponentFixture<SmButton>;
    let injectorMock = jasmine.createSpyObj("Injector", ["get"]);
    beforeEach(() => {
       TestBed.configureTestingModule({
           declarations: [ SmButton ],
           providers: [
               { provide: Injector, useValue: injectorMock }
           ]
       }).compileComponents();

    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SmButton);
        component = fixture.componentInstance;
        
        fixture.detectChanges();
    });

    it('should create a button component', () =>  {
       expect(component).toBeDefined();
    }) ;

    it('should have a default model', () =>  {
        expect(component.model).toBeDefined();
     }) ;
});

describe('SmButton argument model initialization', () => {
    let component: SmButton;
    let fixture: ComponentFixture<SmButton>;
    let injectorMock = jasmine.createSpyObj("Injector", ["get"]);
    let model = new ButtonModel();
    model.Name = "customButton1";
    beforeEach(() => {
       TestBed.configureTestingModule({
           declarations: [ SmButton ],
           providers: [
               { provide: Injector, useValue: injectorMock },
               { provide: ButtonModel, useValue: model },
           ]
       }).compileComponents();

    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SmButton);
        component = fixture.componentInstance;
        
        fixture.detectChanges();
    });

    it('should create a button component with custom model', () =>  {
       expect(component).toBeDefined();
    }) ;

    it('should have a default model defined', () =>  {
        expect(component.model).toBeDefined();
        expect(component.model.Name).toBe("customButton1");
        fixture.destroy();
     }) ;

     afterEach(() => {
        document.body.removeChild(fixture.nativeElement);
      });
});

@NgModule({
    declarations: [
         SmButton, SmContentComponent
    ],
    imports: [],
    providers: [],
    exports: [
        SmButton, SmContentComponent
    ]
})
class MySampleModuleForDynamicCreation { }

@Component({
    selector: 'my-dynamic-button-app',
    template: `<sl-content [model]='content'></sl-content>`
})
class MyDynamicButtonApp { 
    public content = new ContentControlModel();
}

describe('SmButton with dynamic creation', () => {
    let fixture: ComponentFixture<MyDynamicButtonApp>;
    let component: MyDynamicButtonApp;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ MySampleModuleForDynamicCreation],
            declarations: [ MyDynamicButtonApp ]            
        }).compileComponents();
     });
 
     beforeEach(() => {
         fixture = TestBed.createComponent(MyDynamicButtonApp);
         component = fixture.componentInstance;
         fixture.detectChanges();
     });

     it('should create a test component', () =>  {
        expect(component).toBeDefined();
     }) ;

     it('should create add a new button to content', () =>  {
         let button = new ButtonModel();         
         expect(fixture.nativeElement.querySelector("sm-button")).toBeNull(); 
         component.content.Content =  button;
         fixture.detectChanges();
         expect(fixture.nativeElement.querySelector("sm-button")).toBeDefined();
     }) ; 

     afterEach(() => {
        document.body.removeChild(fixture.nativeElement);
      });
});