import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PokemonsService } from './pokemons.service';
import { PokemonApiResponse, SimplePokemon } from '../interfaces';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';

const mockPokeApiResponse: PokemonApiResponse = {
  count: 1118,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: 'https',
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
    {
      name: 'venusaur',
      url: 'https://pokeapi.co/api/v2/pokemon/3/',
    },
  ],
};

const expectedPokemons: SimplePokemon[] = [
  {
    id: '1',
    name: 'bulbasaur',
  },
  {
    id: '2',
    name: 'ivysaur',
  },
  {
    id: '3',
    name: 'venusaur',
  },
];

const mockPokemon = {
  id: 1,
  name: 'bulbasaur',
  //TODO: Include other fields as needed.
};

describe('Pokemon Service', () => {
  let service: PokemonsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PokemonsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should load page of simple pokemons', () => {
    service.loadPage(1).subscribe((pokemons) => {
      expect(pokemons).toEqual(expectedPokemons);
    });

    const request = httpMock.expectOne(
      'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
    );
    expect(request.request.method).toBe('GET');
    request.flush(mockPokeApiResponse);
  });

  it('should load the page of 5 simple pokemons', () => {
    service.loadPage(5).subscribe((pokemons) => {
      expect(pokemons).toEqual(expectedPokemons);
    });

    const request = httpMock.expectOne(
      'https://pokeapi.co/api/v2/pokemon?limit=20&offset=80'
    );

    expect(request.request.method).toBe('GET');

    request.flush(mockPokeApiResponse);
  });

  it('should load a pokemon by ID', () => {
    const pokemonId = '1';

    service.loadPokemon(pokemonId).subscribe((pokemon: any) => {
      expect(pokemon).toEqual(mockPokemon);
    });

    const request = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );
    expect(request.request.method).toBe('GET');
    request.flush(mockPokemon);
  });

  it('should load pokemon by name', () => {
    const pokemonName = 'bulbasaur';

    service.loadPokemon(pokemonName).subscribe((pokemon: any) => {
      expect(pokemon).toEqual(mockPokemon);
    });

    const request = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    expect(request.request.method).toBe('GET');
    request.flush(mockPokemon);
  });

  //? Trigger errors
  it('should catch error if pokemon is not found', () => {
    const pokemonName = 'missingno';

    service
      .loadPokemon(pokemonName)
      .pipe(
        catchError((error) => {

          // console.log(error);
          expect(error.message).toContain('Not Found');
          return [];
        })
      )
      .subscribe();

    const request = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    expect(request.request.method).toBe('GET');

    request.flush('Pokemon not found', {
      status: 404,
      statusText: 'Not Found',
    });
  });
});
