import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import {HttpClientModule} from '@angular/common/http';

import { HeroesComponent } from './heroes.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {HeroDetailComponent} from '../hero-detail/hero-detail.component';
import {HeroSearchComponent} from '../hero-search/hero-search.component';

import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesComponent, DashboardComponent, HeroDetailComponent, HeroSearchComponent],
      imports: [AppRoutingModule, FormsModule, HttpClientModule ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}, HeroService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
