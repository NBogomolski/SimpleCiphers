import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VigenerComponent } from './vigener.component';

describe('VigenerComponent', () => {
  let component: VigenerComponent;
  let fixture: ComponentFixture<VigenerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VigenerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VigenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
