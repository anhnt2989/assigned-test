import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tableDataReactstrap state domain
 */

const selectTableDataReactstrapDomain = state =>
  state.tableDataReactstrap || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TableDataReactstrap
 */

const makeSelectTableDataReactstrap = () =>
  createSelector(
    selectTableDataReactstrapDomain,
    substate => substate,
  );

export default makeSelectTableDataReactstrap;
export { selectTableDataReactstrapDomain };
