import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularMultiselectComponent } from './angular-multiselect.component';

describe('AngularMultiselectComponent', () => {
  let component: AngularMultiselectComponent;
  let fixture: ComponentFixture<AngularMultiselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularMultiselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularMultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
