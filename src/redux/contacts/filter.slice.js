import { createSlice } from '@reduxjs/toolkit';
import { contactsInitState } from './contacts.init-state';

const filterSlice = createSlice({
  name: 'filter',
  initialState: contactsInitState.filter,
  reducers: {
    filterContactsAction: (_, { payload }) => payload,
  },
});
export const filterReducer = filterSlice.reducer;
export const { filterContactsAction } = filterSlice.actions;