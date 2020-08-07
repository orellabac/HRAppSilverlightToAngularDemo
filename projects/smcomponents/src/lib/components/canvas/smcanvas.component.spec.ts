import { SmCanvasPanel, SmCanvasItem } from "./smcanvas.component";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Injector } from '@angular/core';
import { CanvasModel } from '../../models/controls/CanvasModel';
import { ButtonModel } from '../../models/controls/ButtonModel';

describe('Canvas default initialization', () => {
    let component: SmCanvasPanel;
    let fixture: ComponentFixture<SmCanvasPanel>;
    let injectorMock = jasmine.createSpyObj("Injector", ["get"]);
    beforeEach(() => {
       TestBed.configureTestingModule({
           declarations: [ SmCanvasPanel ],
           providers: [
               { provide: Injector, useValue: injectorMock }
           ]
       }).compileComponents();

    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SmCanvasPanel);
        component = fixture.componentInstance;
        
        fixture.detectChanges();
    });

    it('should create a the canvas component', () =>  {
       expect(component).toBeDefined();
    }) ;

    it('should have a default model', () =>  {
        expect(component.model).toBeDefined();
        expect(component.model).toBeInstanceOf(CanvasModel);
     }) ;
});


describe('Canvas adding simple controls on existing model', () => {
    let component: SmCanvasPanel;
    let fixture: ComponentFixture<SmCanvasPanel>;
    let injectorMock = jasmine.createSpyObj("Injector", ["get"]);
    let canvasModel = new CanvasModel();
    beforeEach(() => {
       TestBed.configureTestingModule({
           declarations: [ SmCanvasPanel, SmCanvasItem ],
           providers: [
               { provide: Injector, useValue: injectorMock },
               { provide: CanvasModel, useValue: canvasModel }
           ]
       }).compileComponents();

    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SmCanvasPanel);
        component = fixture.componentInstance;
        
        fixture.detectChanges();
    });

    it('should create a the canvas component', () =>  {
       expect(component).toBeDefined();
    }) ;

    it('should have the injected model', () =>  {
        expect(component.model).toBeDefined();
        expect(component.model).toBe(canvasModel);
     });


    it('should have one child after adding one element', () => {
        expect(fixture.nativeElement.querySelectorAll('sm-canvas-item').length).toBe(0);
        let newButton = new ButtonModel();
        canvasModel.Children.add(newButton);
        CanvasModel.SetTop(newButton, 20);
        CanvasModel.SetLeft(newButton, 40);
        fixture.detectChanges();        
        expect(fixture.nativeElement.querySelectorAll('sm-canvas-item').length).toBe(1);
        expect(fixture.debugElement.children[0].children[0].componentInstance.top).toBe("20px");
        expect(fixture.debugElement.children[0].children[0].componentInstance.left).toBe("40px");
     });

     afterAll(() => {

        document.body.removeChild(fixture.nativeElement);
     });
});