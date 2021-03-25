import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExtraPage } from './extra.page';

describe('ExtraPage', () => {
  let component: ExtraPage;
  let fixture: ComponentFixture<ExtraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExtraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
