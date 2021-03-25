import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the nestedFormReactstrap state domain
 */

const selectNestedFormReactstrapDomain = state =>
  state.nestedFormReactstrap || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by NestedFormReactstrap
 */

const makeSelectNestedFormReactstrap = () =>
  createSelector(
    selectNestedFormReactstrapDomain,
    substate => substate,
  );

export default makeSelectNestedFormReactstrap;
export { selectNestedFormReactstrapDomain };
