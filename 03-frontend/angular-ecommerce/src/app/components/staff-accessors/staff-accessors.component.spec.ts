import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAccessorsComponent } from './staff-accessors.component';

describe('StaffAccessorsComponent', () => {
  let component: StaffAccessorsComponent;
  let fixture: ComponentFixture<StaffAccessorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffAccessorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffAccessorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
