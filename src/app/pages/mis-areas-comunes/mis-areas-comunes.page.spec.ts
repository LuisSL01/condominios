import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MisAreasComunesPage } from './mis-areas-comunes.page';

describe('MisAreasComunesPage', () => {
  let component: MisAreasComunesPage;
  let fixture: ComponentFixture<MisAreasComunesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisAreasComunesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MisAreasComunesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
