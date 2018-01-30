import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {APP_BASE_HREF} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import { HeroSearchComponent } from './hero-search.component';
import {HeroesComponent} from '../heroes/heroes.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import { AppRoutingModule } from '../app-routing.module';
import {HeroDetailComponent} from '../hero-detail/hero-detail.component';

import {HeroService} from '../hero.service';
import {MessageService} from '../message.service';


describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroSearchComponent, HeroesComponent, DashboardComponent, HeroDetailComponent],
      imports: [AppRoutingModule, FormsModule, HttpClientModule],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}, HeroService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
