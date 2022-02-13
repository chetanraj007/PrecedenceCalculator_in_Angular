import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeNgTestComponent } from './prime-ng-test.component';

describe('PrimeNgTestComponent', () => {
  let component: PrimeNgTestComponent;
  let fixture: ComponentFixture<PrimeNgTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimeNgTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeNgTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
