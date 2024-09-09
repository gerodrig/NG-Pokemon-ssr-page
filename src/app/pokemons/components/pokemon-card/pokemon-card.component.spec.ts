import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCardComponent } from './pokemon-card.component';
import { provideRouter } from '@angular/router';
import { SimplePokemon } from '../../interfaces';

const mockPokemon: SimplePokemon = {
  id: '25',
  name: 'pikachu',
};

describe('PokemonCardComponent', () => {
  let fixture: ComponentFixture<PokemonCardComponent>;
  let compiled: HTMLElement;
  let component: PokemonCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    fixture.componentRef.setInput('pokemon', mockPokemon);

    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the app ', () => {
    expect(component).toBeTruthy();
  });

  it('should have the SimplePokemon singal inputValue', () => {
    expect(component.pokemon()).toEqual(mockPokemon);
  });

  it('should render the pokemon name and image correctly', () => {
    const image = compiled.querySelector('img') as HTMLImageElement;
    expect(image).toBeDefined();
    expect(image.src).toContain(mockPokemon.id);

    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`;
    expect(image.src).toContain(imageUrl);
    expect(compiled.textContent?.trim()).toBe(mockPokemon.name);
  });

  it('shoudl have the proper ng-reflect-router-link', () => {
    const divWithLink = compiled.querySelector('div') as HTMLDivElement;

    expect(divWithLink).toBeDefined();
    expect(
      divWithLink?.attributes.getNamedItem('ng-reflect-router-link')?.value
    ).toBe(`/pokemons,${mockPokemon.name}`);
  });
});
