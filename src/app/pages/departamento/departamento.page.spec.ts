import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DepartamentoPage } from './departamento.page';

describe('DepartamentoPage', () => {
  let component: DepartamentoPage;
  let fixture: ComponentFixture<DepartamentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartamentoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DepartamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
