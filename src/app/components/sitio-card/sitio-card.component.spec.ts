import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SitioCardComponent } from './sitio-card.component';

describe('SitioCardComponent', () => {
  let component: SitioCardComponent;
  let fixture: ComponentFixture<SitioCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitioCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SitioCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
