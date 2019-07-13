import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsfileComponent } from './logsfile.component';

describe('LogsfileComponent', () => {
  let component: LogsfileComponent;
  let fixture: ComponentFixture<LogsfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogsfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
