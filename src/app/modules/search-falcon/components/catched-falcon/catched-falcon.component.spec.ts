import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchedFalconComponent } from './catched-falcon.component';

describe('CatchedFalconComponent', () => {
  let component: CatchedFalconComponent;
  let fixture: ComponentFixture<CatchedFalconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatchedFalconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatchedFalconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
