import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesUserComponent } from './reportes-user.component';

describe('ReportesUserComponent', () => {
  let component: ReportesUserComponent;
  let fixture: ComponentFixture<ReportesUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
