/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CvsComponent } from './cvs.component';

describe('CvsComponent', () => {
  let component: CvsComponent;
  let fixture: ComponentFixture<CvsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
