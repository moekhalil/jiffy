import { searchImages } from '../../api/gifpy';
import { Image, ISearchStore } from '../features/types';

export const actionTypes = {
  REQUEST: 'QUERY_REQUEST',
  RECIEVE: 'QUERY_RECIEVE',
  REQUEST_MORE: 'QUERY_REQUEST_MORE',
  RECIEVE_MORE: 'QUERY_RECIEVE_MORE',
};

const onRequestGifs = ({ query }: { query: string }) => ({
  type: actionTypes.REQUEST,
  payload: query,
});

const onReceiveGifs = (gifs: Image[]) => ({
  type: actionTypes.RECIEVE,
  payload: gifs,
});

export const requestGifs = ({ query }: { query: string }) => {
  return (dispatch: any, getState: () => { search: ISearchStore }) => {
    dispatch(onRequestGifs({ query }));
    if (query && query.trim().length === 0) {
      return dispatch(onReceiveGifs([]));
    }
    const { offset, limit } = getState().search;
    searchImages({ offset, limit, query }).then((gifs) => dispatch(onReceiveGifs(gifs)));
  };
};

const onRequestMoreGifs = () => ({
  type: actionTypes.REQUEST_MORE,
});

const onReceiveMoreGifs = (gifs: Image[]) => ({
  type: actionTypes.RECIEVE_MORE,
  payload: gifs,
});

export const requestMoreGifs = () => {
  return (dispatch: any, getState: () => { search: ISearchStore }) => {
    const { offset, limit, query } = getState().search;
    dispatch(onRequestMoreGifs());
    searchImages({ offset, limit, query }).then((gifs) => dispatch(onReceiveMoreGifs(gifs)));
  };
};
