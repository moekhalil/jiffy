/*
  Code Project Notes:

  Example of reducer/actions using Redux createSlice[*].
  I find this function useful in scenarios where the actions are small and simple
  as long as it is a fit within the project structure.

  [*] createSlice: A function that accepts an initial state, an object with
                reducer functions, and a "slice name", and automatically
                generates action creators and action types that correspond
                to the reducers and state.

*/

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTrendingImages } from '../../api/gifpy';
import { ITrendingStore, GifPayload, Image } from './types';

const initialState: ITrendingStore = {
  loading: 'idle',
  offset: 0,
  limit: 12,
  gifs: [] as Image[],
};

export const fetchTrending = createAsyncThunk(
  'trending/fetchTrending',
  async (_, { getState }: { getState: Function }) => {
    const { offset, limit } = getState().trending as ITrendingStore;
    return {
      gifs: await getTrendingImages({ offset, limit }),
    };
  }
);

export const fetchMoreTrending = createAsyncThunk(
  'trending/fetchTrending',
  async (_, { getState }: { getState: Function }) => {
    const { offset, limit } = getState().trending as ITrendingStore;
    return {
      gifs: await getTrendingImages({ offset, limit }),
    };
  }
);

const fulfillState = (state: ITrendingStore, action: PayloadAction<GifPayload>) => {
  state.loading = 'succeeded';
  state.offset = state.offset + state.limit;
  state.gifs = state.gifs.concat(action.payload.gifs);
};

const fetchTrendingSlice = createSlice({
  name: 'trending',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTrending.pending as any](state) {
      state.loading = 'pending';
    },
    [fetchTrending.fulfilled as any](state, action: PayloadAction<GifPayload>) {
      fulfillState(state, action);
    },
    [fetchMoreTrending.pending as any](state) {
      state.loading = 'pending';
    },
    [fetchMoreTrending.fulfilled as any](state, action: PayloadAction<GifPayload>) {
      fulfillState(state, action);
    },
  },
});

export default fetchTrendingSlice.reducer;
