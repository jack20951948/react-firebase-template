import {
  createSlice,
  PayloadAction,
  createAction,
  ActionCreatorWithoutPayload,
  Reducer
} from '@reduxjs/toolkit';
import Database from '../../types/Database';
import { ISessionState, IWorkItemsState, TWorkItemsSlice } from './types';

export const initialState: IWorkItemsState = {
  selectedWorkItem: {
    id: '',
    title: '',
    artist: '',
    author: '',
    year: 0,
    publishingHouse: '',
    bookName: '',
    timestamp: 0,
    isRepublicEra: false,
    imageUrl: ''
  },
  sessionState: {
    isAuthenticating: false,
    isAdmin: false,
    user: null
  }
};

const name: string = 'workItems';

// use createSlice for actions that manipulate store
const workItemsSlice: TWorkItemsSlice = createSlice({
  name,
  initialState,
  reducers: {
    setSelectedWorkItem(
      state: IWorkItemsState,
      action: PayloadAction<Database.WorkItem>
    ) {
      state.selectedWorkItem = action.payload;
    },
    setSessionState(
      state: IWorkItemsState,
      action: PayloadAction<ISessionState>
    ) {
      state.sessionState = action.payload;
    }
  }
});

// use createAction for actions that only exists to call sagas
export const workItemsAction: ActionCreatorWithoutPayload<string> =
  createAction(`${name}/workItemsAction`);

// export actions created by slice
export const { setSelectedWorkItem, setSessionState } = workItemsSlice.actions;

// export reducer created by slice
export const workItemsReducer: Reducer<IWorkItemsState> =
  workItemsSlice.reducer;
