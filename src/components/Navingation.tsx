import React from 'react';
import { 
    searchString, 
    itemCount,
    nextPage,
    prevPage,
    updateShowCount,
    updateSortingKey,
    selectSort
  } from '../feature/mySlice';
import { SortMethod } from '../models/AppStateModels';
import { useAppDispatch, useAppSelector } from '../hooks/appHooks';

interface NavigationProps {
  isEnhanced: boolean;
}

export function Navigation({ isEnhanced }: NavigationProps) {
  const itemsCount = useAppSelector(itemCount);
  const sortKey = useAppSelector(selectSort);
  const dispatch = useAppDispatch();

  const updateSearch = function(searchPatter: string) {
    dispatch(searchString(searchPatter));
  };

  const goBack = () => {
    dispatch(prevPage());
  };

  const goForward = () => {
    dispatch(nextPage());
  };

  const updateCount = (value: number) => {
    if(value)
    dispatch(updateShowCount(value));
  }

  const updateSorting = (value: string) => {
    dispatch(updateSortingKey(value));
  }

  return (
    <div className="navigation__buttons">
      <button onClick={goBack}>Previoud</button>
      {isEnhanced && 
      <>
      <div>
        <label>Search in Pokemons</label>
        <input placeholder="Search pokemon by name or ability" 
        className="card__input" type="text" onChange={(e) => updateSearch(e.target.value)} name="search pokemon" />
      </div>
      <div>
        <label>Items</label>
        <input className="card__input count__input" type='number' value={itemsCount} onChange={e => updateCount(+e.target.value)} min="1" />
        <label>per page</label>
      </div>
      <div>
        <label>Sort by</label>
        <select className="card__select" name='sorting' value={sortKey} onChange={e => updateSorting(e.target.value)}>
          <option value="">Default</option>
          <option value={SortMethod.NAME}>Name</option>
          <option value={SortMethod.HEIGHT}>Height</option>
          <option value={SortMethod.WEIGHT}>Weight</option>
        </select>
      </div>
      </>}
    <button onClick={goForward}>Next</button>
    </div>
  );
}