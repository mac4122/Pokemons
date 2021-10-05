import React from 'react';
import * as _ from 'lodash';
import { PokemonFeatures } from '../models/AppStateModels';

interface PokemonCardProps {
  pokemonStore: PokemonFeatures
  pokemonName: string;
}

export function PokemonCard({ pokemonStore, pokemonName }: PokemonCardProps) {
  return (
    <div className="card">
      <div className="card__image" style={{
        backgroundImage: `url(${_.get(pokemonStore[pokemonName],'imageUrl', '')})`
      }} />
      <div className="card__content">
        <div className="card__title">{pokemonName}</div>
          <div className="card__text">
            <span>Height: </span>
            {_.get(pokemonStore[pokemonName], 'height', '')}
          </div>
          <div className="card__text">
            <span>Weight: </span>
            {_.get(pokemonStore[pokemonName], 'weight', '')}
          </div>
          <div className="card__text">
            <span>Pokemon abilities: </span>
            {_.map(_.get(pokemonStore[pokemonName], 'abilities', []), ability => (
            <span key={pokemonName+ability}>{ability},&nbsp;</span>
          ))}
        </div>
      </div>
    </div>
  );
}