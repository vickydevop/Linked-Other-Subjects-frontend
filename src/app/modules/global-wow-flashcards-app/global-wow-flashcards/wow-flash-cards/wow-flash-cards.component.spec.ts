import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WowFlashCardsComponent } from './wow-flash-cards.component';

describe('WowFlashCardsComponent', () => {
  let component: WowFlashCardsComponent;
  let fixture: ComponentFixture<WowFlashCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WowFlashCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WowFlashCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
