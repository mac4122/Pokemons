import * as _ from 'lodash';
import { ApiResults, PokemonFeature, PokemonFeatures } from "../models/AppStateModels";

export const mapPokemon = (
  apiResults: ApiResults, 
  abilities: PokemonFeature[]
): PokemonFeatures => {
    const keyByFeatures = _.keyBy(abilities, 'name');
    
    return _.keyBy(_.map(apiResults.results, res => ({
        name: res.name,
        url: res.url,
        imageUrl: keyByFeatures[res.name].imageUrl,
        abilities: keyByFeatures[res.name].abilities,
        height: keyByFeatures[res.name].height,
        weight: keyByFeatures[res.name].weight
    })), 'name');
} 