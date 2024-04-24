import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WowResourceTableComponent } from './wow-resource-table.component';

describe('WowResourceTableComponent', () => {
  let component: WowResourceTableComponent;
  let fixture: ComponentFixture<WowResourceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WowResourceTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WowResourceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
