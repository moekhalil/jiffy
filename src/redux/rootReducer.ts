import { combineReducers } from '@reduxjs/toolkit';
import TrendingReducer from './features/fetchTrending';
import { SearchReducer } from './search';

const rootReducer = combineReducers({
  trending: TrendingReducer,
  search: SearchReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
