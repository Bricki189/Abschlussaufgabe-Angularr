import { TestBed } from '@angular/core/testing';

import { FahrzeugService } from './fahrzeug.service';
import { Fahrzeug } from '../data/fahrzeug';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';

describe('FahrzeugService', () => {
  let service: FahrzeugService;
  let httpSpy: Spy<HttpClient>;

  const fakeFahrzeugs: Fahrzeug[] = [
    {
      id: 1,
      marke: 'Ford',
      model: 'Kuga',
      autoNr: 'Bl 123 456',
      rahmenNr:'17272727272727272'
    },
    {
      id: 2,
      marke: 'Ford',
      model: 'Explorer',
      autoNr: 'Bl 123 456',
      rahmenNr:'12345678912345678'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }
      ]
    });
    service = TestBed.inject(FahrzeugService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return a list of fahrzeuge', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakeFahrzeugs);

    service.getList().subscribe({
      next:
        fahrzeuge => {
          expect(fahrzeuge).toHaveSize(fakeFahrzeugs.length);
          done();
        },
      error: done.fail
    }
    );
    expect(httpSpy.get.calls.count()).toBe(1);
  });
  it('should create a new fahrzeug', (done: DoneFn) => {

    const newFahrzeug: Fahrzeug = {
      id: 2,
      marke: 'Ford',
      model: 'Explorer',
      autoNr: 'Bl 123 456',
      rahmenNr:'12345678912345678'
    };

    httpSpy.post.and.nextWith(newFahrzeug);

    service.save(newFahrzeug).subscribe({
      next: fahrzeug => {
        expect(fahrzeug).toEqual(newFahrzeug);
        done();
      },
      error: done.fail
    }
    );
    expect(httpSpy.post.calls.count()).toBe(1);
  });

  it('should update an fahrzeug', (done: DoneFn) => {

    const fahrzeug = fakeFahrzeugs[0];
    fahrzeug.marke = 'Updated Fahrzeug';

    httpSpy.put.and.nextWith(fahrzeug);

    service.update(fahrzeug).subscribe({
      next: fahrzeug => {
        expect(fahrzeug.marke).toEqual('Updated Fahrzeug');
        done();
      },
      error: done.fail
    });
    expect(httpSpy.put.calls.count()).toBe(1);
  });

  it('should delete an existing fahrzeug', (done: DoneFn) => {

    httpSpy.delete.and.nextWith(new HttpResponse({
      status: 200
    }));

    service.delete(1).subscribe({
      next: response => {
        expect(response.status).toBe(200);
        done();
      },
      error: done.fail
    });
    expect(httpSpy.delete.calls.count()).toBe(1);
  });
});

