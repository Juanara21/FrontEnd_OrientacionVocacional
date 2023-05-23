import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesIdComponent } from './reportes-id.component';

describe('ReportesIdComponent', () => {
  let component: ReportesIdComponent;
  let fixture: ComponentFixture<ReportesIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
