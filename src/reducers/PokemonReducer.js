export default function pokemonReducer(state, action) {
  if (action.type === 'success') {
    const newState = {
      pokemon: {
        hp: action.pokeData.stats[5].base_stat,
        name: action.pokeData.name,
        attack: action.pokeData.stats[4].base_stat,
        defense: action.pokeData.stats[3].base_stat,
      },
      imageUrl: action.imageUrl,
      invalidInput: false,
      descriptionText: action.descriptionText,
    };
    return newState;
  } else if (action.type === 'error') {
    console.error('Error: ', action.error);
    return {
      ...state,
      invalidInput: true
    }
  } else {
    throw new Error('This action type is invalid');
  }
};