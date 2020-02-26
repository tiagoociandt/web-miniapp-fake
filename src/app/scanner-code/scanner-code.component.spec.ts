import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannerCodeComponent } from './scanner-code.component';

describe('ScannerCodeComponent', () => {
  let component: ScannerCodeComponent;
  let fixture: ComponentFixture<ScannerCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScannerCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannerCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
