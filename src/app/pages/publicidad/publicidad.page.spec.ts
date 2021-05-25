import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PublicidadPage } from './publicidad.page';

describe('PublicidadPage', () => {
  let component: PublicidadPage;
  let fixture: ComponentFixture<PublicidadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicidadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PublicidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
