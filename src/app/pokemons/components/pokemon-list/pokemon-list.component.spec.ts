import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { provideRouter } from '@angular/router';
import { SimplePokemon } from '../../interfaces';

const mockPokemons: SimplePokemon[] = [
  {
    id: '25',
    name: 'pikachu',
  },
  {
    id: '150',
    name: 'mewtwo',
  },
  {
    id: '151',
    name: 'mew',
  },
  {
    id: '249',
    name: 'lugia',
  },
];

describe('PokemonListComponent', () => {
  let fixture: ComponentFixture<PokemonListComponent>;
  let compiled: HTMLElement;
  let component: PokemonListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render the pokemon list with 4 pokemon cards', () => {
    fixture.componentRef.setInput('pokemons', mockPokemons);
    fixture.detectChanges();

    const pokemonCards = compiled.querySelectorAll('pokemon-card').length;
    expect(pokemonCards).toBe(mockPokemons.length);
  });

  it('should render No pokemons if Pokemons list is empty"', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();

    expect(compiled.querySelector('div')?.textContent?.trim()).toContain(
      'No pokemons'
    );
  });
});
