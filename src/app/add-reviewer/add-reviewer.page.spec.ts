import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddReviewerPage } from './add-reviewer.page';

describe('AddReviewerPage', () => {
  let component: AddReviewerPage;
  let fixture: ComponentFixture<AddReviewerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReviewerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddReviewerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
