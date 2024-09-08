import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

import { tap } from 'rxjs';

import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { Pokemon } from '../../pokemons/interfaces';

@Component({
  selector: 'pokemon-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit {
  private pokemonsService = inject(PokemonsService);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);

  public pokemon = signal<Pokemon | null>(null);
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.pokemonsService
      .loadPokemon(id)
      .pipe(
        tap(({ name, id }) => {
          const pageTitle = `${name} #${id}`;
          const pageDescription = `This is the page for ${name}`;
          this.title.setTitle(pageTitle);

          this.meta.updateTag({
            name: 'description',
            content: pageDescription,
          });
          //? Meta OG tags
          this.meta.updateTag({
            property: 'og:title',
            content: pageTitle,
          });
          this.meta.updateTag({
            property: 'og:description',
            content: pageDescription,
          });
          this.meta.updateTag({
            property: 'og:image',
            content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          });
        })
      )
      .subscribe(this.pokemon.set);
  }
}
