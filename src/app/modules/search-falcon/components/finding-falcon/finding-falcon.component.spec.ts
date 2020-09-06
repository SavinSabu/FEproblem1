import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindingFalconComponent } from './finding-falcon.component';

describe('FindingFalconComponent', () => {
  let component: FindingFalconComponent;
  let fixture: ComponentFixture<FindingFalconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindingFalconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindingFalconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
