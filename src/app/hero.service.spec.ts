import { TestBed, inject, fakeAsync, tick, getTestBed } from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';

import {BaseRequestOptions, Response, ResponseOptions, Http, HttpModule} from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { HeroService } from './hero.service';
import {MessageService} from './message.service';

import {Hero} from './hero';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// class MockHttpClient extends HttpClient {
//   public static get(url: string): Observable<Hero> {
//     return new Observable<Hero>(
//       observer => {
//         HEROES.forEach(hero => {
//           observer.next(hero);
//         });
//       }
//     );
//   }
// }

describe('HeroService', () => {

  let injector: TestBed;
  let heroService: HeroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService, MessageService]
    });

    injector = getTestBed();
    heroService = injector.get(HeroService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([HeroService], (service: HeroService) => {
    expect(service).toBeTruthy();
  }));

  it('should get list of heroes', () => {
    const response = [
      {_id: '1', id: 1, name: 'Hero1'},
      {_id: '2', id: 2, name: 'Hero2'},
      {_id: '3', id: 3, name: 'Hero3'},
    ];

    heroService.getHeroes().toPromise().then(results => {
      expect(results.length).toBe(3);
    });

    const req = httpMock.expectOne('http://localhost:8001/api/heroes');
    expect(req.request.method).toBe('GET');
    req.flush(response);

  });
});
