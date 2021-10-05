import React from 'react';
import * as _ from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useAppDispatch, useAppSelector } from './hooks/appHooks';
import { 
  update_pokemons, 
  searchPokemon, 
  currentPage, 
  itemCount
} from './feature/mySlice';
import { ApiResults, PokemonFeature } from './models/AppStateModels';
import { mapPokemon } from './mappers/appMapper';
import { url_pokemons } from './constants';
import { fetchData } from './services/appServices';
import { Navigation } from './components/Navingation';
import { PokemonCard } from './components/PokemonCard';

function App() {
  const allPokemons = useAppSelector(searchPokemon);
  const currentpage = useAppSelector(currentPage);
  const itemsCount = useAppSelector(itemCount);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    fetchData(url_pokemons)
    .then(async (response: ApiResults) => {
      const pokemonAbilities: PokemonFeature[] = [];
      if(response.results && response.results.length) {
        const data = response.results;
        for(let i=0; i<data.length; i++) {
          const fetched = await fetch(data[i].url);
          const jsonFormat = await fetched.json();
          pokemonAbilities.push({
            name: jsonFormat.name,
            imageUrl: jsonFormat.sprites.other['official-artwork']['front_default'],
            abilities: _.map(jsonFormat.abilities, ab => ab.ability.name),
            height: jsonFormat.height,
            weight: jsonFormat.weight
          });
        }
        dispatch(update_pokemons(mapPokemon(response, pokemonAbilities)));
    }
  });
  }, []);

  return (
    <>
    <Navigation isEnhanced />
    <ul className="cards">
      {_.map(allPokemons).length > 0 ?
      _.map(_.map(allPokemons).slice(
        (itemsCount*(currentpage-1)), (currentpage*itemsCount)), 
        pokemon => (
        <li key={pokemon.name} className="cards__item">
        <PokemonCard pokemonName={pokemon.name} pokemonStore={allPokemons} />
      </li>
      )): <div className="card__title">No pokemon available</div>}
    </ul>
    <Navigation isEnhanced={false} />
  </>
  );
}

export default App;
