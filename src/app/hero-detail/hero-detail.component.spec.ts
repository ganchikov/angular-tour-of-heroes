import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { moduleDef } from '../common.spec';
import { HeroService } from '../hero.service';
import { DebugElement } from '@angular/core';
import {By} from '@angular/platform-browser';
import {Hero} from '../hero';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let heroService: HeroService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule(moduleDef)
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    heroService = TestBed.get(HeroService);
    component.hero = {
      _id: '1',
       id: 1,
       name: 'Hero'
    };
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
});
