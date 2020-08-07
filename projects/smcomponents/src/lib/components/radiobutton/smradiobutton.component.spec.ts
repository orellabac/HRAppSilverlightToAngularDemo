/**
 */

import { Component, QueryList, ContentChildren } from "@angular/core";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SmRadioButton } from './smradiobutton.component';
import { GenerateRadioGroupDirective } from '../../directives/generateradiogroup.directive';

@Component({
    selector: 'radio-test-app1',
    template: `
      <div>
        <div generateRadioGroups="" name="block1">
            <sm-radio-button>Opt1</sm-radio-button>
            <sm-radio-button>Opt2</sm-radio-button>
        </div>
        <div generateRadioGroups="" name="block2">
            <sm-radio-button>Opt3</sm-radio-button>
            <sm-radio-button>Opt4</sm-radio-button>
        </div>
      </div>
    `
  })
  class RadiosContainerTest {
  }
   
  
  describe('Test radio button group assignment ', () =>{
      let fixture: ComponentFixture<RadiosContainerTest>;
      let component: RadiosContainerTest;
      beforeEach(() => {
         TestBed.configureTestingModule({
             declarations: [ RadiosContainerTest, SmRadioButton, GenerateRadioGroupDirective ],
             providers: [
             ]
         }).compileComponents();
  
      });
  
      beforeEach(() => {
          fixture = TestBed.createComponent(RadiosContainerTest);
          component = fixture.componentInstance;
          
          fixture.detectChanges();
      });
  
      it("should create the inner content",() =>{
        fixture.detectChanges();
         expect(component).toBeDefined();
         expect(fixture.nativeElement.querySelectorAll('sm-radio-button input[type="radio"]').length).toBe(4);
         let innerRadios =
                fixture.debugElement.queryAll((e) => e.name == "sm-radio-button" && e.componentInstance instanceof SmRadioButton);
         expect(innerRadios.length).toBe(4);
      });

      afterAll(() => {
         document.body.removeChild(fixture.nativeElement);
      });
  });