import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BitacoraVisitasPage } from './bitacora-visitas.page';

describe('BitacoraVisitasPage', () => {
  let component: BitacoraVisitasPage;
  let fixture: ComponentFixture<BitacoraVisitasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BitacoraVisitasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BitacoraVisitasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
