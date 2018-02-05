import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement, Injectable } from '@angular/core';
import {By} from '@angular/platform-browser';
import { convertToParamMap, ParamMap, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {APP_BASE_HREF} from '@angular/common';

import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '../hero.service';
import {MessageService} from '../message.service';

import {Hero} from '../hero';
import { Observable } from 'rxjs/Observable';



describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let heroService: HeroService;
  let activatedRoute: ActivatedRouteStub;
  let el: DebugElement;

  class ActivatedRouteStub  {
    // ActivatedRoute.paramMap is Observable
    private subject = new BehaviorSubject(convertToParamMap(this.testParamMap));
    paramMap = this.subject.asObservable();

    // Test parameters
    private _testParamMap: ParamMap;
    get testParamMap() { return this._testParamMap; }
    set testParamMap(params: {}) {
      this._testParamMap = convertToParamMap(params);
      this.subject.next(this._testParamMap);
    }

    // ActivatedRoute.snapshot.paramMap
    get snapshot() {
      return { paramMap: this.testParamMap };
    }
  }

  @Injectable()
  class MessageServiceStub  {
    messages: string[] = [];
    add(message: string) {}
    clear() {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeroDetailComponent,
      ],
      imports: [
        BrowserModule,
        FormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        HeroService,
        {provide: MessageService, useClass: MessageServiceStub},
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    heroService = TestBed.get(HeroService);
    spyOn(heroService, 'getHero').and.returnValue(new Observable(subscriber => {
      subscriber.next(new Hero('1', 1, 'Hero'));
    }));
    spyOn(heroService, 'updateHero').and.returnValue(new Observable(subscriber => {
      subscriber.next(new Hero('1', 1, 'Hero'));
    }));

    component.hero = {
      _id: '1',
       id: 1,
       name: 'Hero'
    };
    activatedRoute = TestBed.get(ActivatedRoute);
    activatedRoute.testParamMap = {id: 1};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display hero fields', () => {
    const idFieldRef = fixture.debugElement.query(By.css('#id'));
    const nameFieldRef = fixture.debugElement.query(By.css('#name'));
    expect(idFieldRef.nativeElement.lastChild.data).toBe('1');
    expect(nameFieldRef.nativeElement.lastChild.data).toBe('Hero');
  });

  it('should return relevant hero based on the provided id', () => {

  });
});
