import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the nestedFormMui state domain
 */

const selectNestedFormMuiDomain = state => state.nestedFormMui || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by NestedFormMui
 */

const makeSelectNestedFormMui = () =>
  createSelector(
    selectNestedFormMuiDomain,
    substate => substate,
  );

export default makeSelectNestedFormMui;
export { selectNestedFormMuiDomain };
