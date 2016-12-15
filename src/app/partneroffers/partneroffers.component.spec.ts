/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PartneroffersComponent } from './partneroffers.component';

describe('PartneroffersComponent', () => {
  let component: PartneroffersComponent;
  let fixture: ComponentFixture<PartneroffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartneroffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartneroffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
