import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgentePage } from './agente.page';

describe('AgentePage', () => {
  let component: AgentePage;
  let fixture: ComponentFixture<AgentePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
