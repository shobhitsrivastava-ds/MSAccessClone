import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDragComponent } from './list-drag.component';

describe('ListDragComponent', () => {
  let component: ListDragComponent;
  let fixture: ComponentFixture<ListDragComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDragComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
