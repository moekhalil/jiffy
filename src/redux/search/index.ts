/*
  Code Project Notes:

  Example of using the more conventional Redux approach of having a seperate file
  for action and reducers. Usually, they are placed under a different folder structure.
  But in this case I chose to "containerizing" them in the same folder
*/

import reducer from './searchReducer';
import { requestGifs } from './searchActions';

export const SearchActions = { requestGifs };
export const SearchReducer = reducer;

const SearchGifs = () => ({
  reducer,
  actions: { requestGifs },
});

export default SearchGifs;
