import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {APP_BASE_HREF} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from '../app-routing.module';
import {HeroDetailComponent} from '../hero-detail/hero-detail.component';

import {HeroesComponent} from '../heroes/heroes.component';
import {HeroSearchComponent} from '../hero-search/hero-search.component';

import {HeroService} from '../hero.service';
import {MessageService} from '../message.service';

import { DashboardComponent } from './dashboard.component';


describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroDetailComponent, HeroesComponent, DashboardComponent, HeroSearchComponent],
      imports: [FormsModule, AppRoutingModule, HttpClientModule],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}, HeroService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
