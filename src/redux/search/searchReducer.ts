import { ISearchStore, Image } from '../features/types';
import { actionTypes } from './searchActions';

type Action = { type: any; payload: any[] & string };

const initialState: ISearchStore = {
  loading: 'idle',
  offset: 0,
  limit: 12,
  gifs: [] as Image[],
  query: '',
  queryHistory: JSON.parse(sessionStorage.getItem('queries') || '[]'),
};

const searchReducer = (state = initialState, action: Action): ISearchStore => {
  switch (action.type) {
    case actionTypes.REQUEST: {
      return {
        ...state,
        loading: 'pending',
        query: action.payload,
        gifs: [] as Image[],
        offset: 0,
      };
    }
    case actionTypes.RECIEVE: {
      const queryHistory = state.queryHistory.concat(state.query);
      sessionStorage.setItem('queries', JSON.stringify(queryHistory));
      return {
        ...state,
        loading: 'succeeded',
        offset: state.offset + state.limit,
        gifs: action.payload,
        queryHistory,
      };
    }
    case actionTypes.REQUEST_MORE: {
      return {
        ...state,
        loading: 'pending',
      };
    }
    case actionTypes.RECIEVE_MORE: {
      return {
        ...state,
        loading: 'succeeded',
        offset: state.offset + state.limit,
        gifs: state.gifs.concat(action.payload),
      };
    }
    default:
      return state;
  }
};

export default searchReducer;
