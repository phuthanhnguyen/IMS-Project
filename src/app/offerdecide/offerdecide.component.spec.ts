/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OfferdecideComponent } from './offerdecide.component';

describe('OfferdecideComponent', () => {
  let component: OfferdecideComponent;
  let fixture: ComponentFixture<OfferdecideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferdecideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferdecideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
