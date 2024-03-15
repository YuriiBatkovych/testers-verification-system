import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugDeclareComponent } from './bug-declare.component';

describe('BugDeclareComponent', () => {
  let component: BugDeclareComponent;
  let fixture: ComponentFixture<BugDeclareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugDeclareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BugDeclareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
