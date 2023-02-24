import { contactsInitState } from './contacts/contacts.init-state';
import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contacts/contacts.slice';
import { filterReducer } from './contacts/filter.slice';

export const store = configureStore({
  preloadedState: contactsInitState,
  devTools: true,
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
  },
});