import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatUserCardComponent } from './chat-user-card.component';

describe('ChatUserCardComponent', () => {
  let component: ChatUserCardComponent;
  let fixture: ComponentFixture<ChatUserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatUserCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
