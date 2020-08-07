import { Component } from "@angular/core";
import { SmContentComponent } from './smcontent.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';


/**
 *  Create content with initial content
 */
 

@Component({
    selector: 'content-test-app1',
    template: `
       <sm-content>
          <p>hello</p>
       </sm-content>
    `
  })
  class ContentTestApp1 {
  }
   
  
  describe('Test content creation with literal content ', () =>{
      let fixture: ComponentFixture<ContentTestApp1>;
      let component: ContentTestApp1;
      beforeEach(() => {
         TestBed.configureTestingModule({
             declarations: [ ContentTestApp1, SmContentComponent ],
             providers: [
             ]
         }).compileComponents();
  
      });
  
      beforeEach(() => {
          fixture = TestBed.createComponent(ContentTestApp1);
          component = fixture.componentInstance;
          
          fixture.detectChanges();
      });
  
      it("should create the inner content",() =>{
         expect(component).toBeDefined();
         expect(fixture.nativeElement.querySelector('p')).toBeDefined();
      });
  });