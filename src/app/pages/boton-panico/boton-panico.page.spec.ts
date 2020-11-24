import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BotonPanicoPage } from './boton-panico.page';

describe('BotonPanicoPage', () => {
  let component: BotonPanicoPage;
  let fixture: ComponentFixture<BotonPanicoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotonPanicoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BotonPanicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
