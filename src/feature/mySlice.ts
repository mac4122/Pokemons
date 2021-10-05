import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as _ from 'lodash';
import { sortBy } from 'lodash';
import { AppState, PokemonFeature, PokemonFeatures, SortMethod} from '../models/AppStateModels';
import { RootState } from '../Store';

const initialState: AppState = {
  pokemons: {},
  showCount: 10,
  pageNumber: 1,
  sort: '',
  search: ''
}

export const MySlice = createSlice({
  name: 'mySlice',
  initialState,
  reducers: {
    update_pokemons: (state, action: PayloadAction<PokemonFeatures>) => { 
      state.pokemons = action.payload
    },
    updateShowCount: (state, action: PayloadAction<number>) => {
      state.showCount = action.payload
    },
    searchString: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    nextPage: (state) => {
      state.pageNumber = 
        state.pageNumber < Math.ceil(_.map(state.pokemons).length/state.showCount) ? 
        state.pageNumber+1 :
        Math.ceil(_.map(state.pokemons).length/state.showCount)
    },
    prevPage: (state) => {
        state.pageNumber = state.pageNumber > 1 ? state.pageNumber-1 : 1
    },
    updateSortingKey: (state, action: PayloadAction<string>) => {
        state.sort = action.payload
    }
  }
});

export const { update_pokemons, updateShowCount, searchString, nextPage, prevPage, updateSortingKey } = MySlice.actions;

export const getPokemons = (state: RootState) => state.data.pokemons;

const search = (state: RootState, sortedPokemons: PokemonFeature[]) => 
  state.data.search === '' ? sortedPokemons :
  _.filter(sortedPokemons, pokemon => 
    _.includes(pokemon.name, state.data.search) || 
    _.filter(pokemon.abilities, a => _.includes(a, state.data.search)).length > 0
    );

export const searchPokemon = (state: RootState) => {
  if(state.data.sort.length) {
    switch(state.data.sort) {
        case SortMethod.NAME:
            return _.keyBy(search(state, _.sortBy(state.data.pokemons, ['name'])), 'name');
        case SortMethod.HEIGHT:
            return _.keyBy(search(state, _.sortBy(state.data.pokemons, ['height'])), 'name');
        case SortMethod.WEIGHT:
            return _.keyBy(search(state, _.sortBy(state.data.pokemons, ['weight'])), 'name');
    }
  }
  return state.data.search === '' ? state.data.pokemons :
  _.keyBy(
    _.filter(state.data.pokemons, pokemon => 
      _.includes(pokemon.name, state.data.search) || 
      _.filter(pokemon.abilities, a => _.includes(a, state.data.search)).length > 0
  ), 'name');
};

export const currentPage = (state: RootState) => state.data.pageNumber;

export const itemCount = (state: RootState) => state.data.showCount;

export const selectSort = (state: RootState) => state.data.sort;

export default MySlice.reducer;

