import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAdministratorListComponent } from './app-administrator-list.component';

describe('AppAdministratorListComponent', () => {
  let component: AppAdministratorListComponent;
  let fixture: ComponentFixture<AppAdministratorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppAdministratorListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppAdministratorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
