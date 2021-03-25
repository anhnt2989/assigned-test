import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tableDataMui state domain
 */

const selectTableDataMuiDomain = state => state.tableDataMui || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TableDataMui
 */

const makeSelectTableDataMui = () =>
  createSelector(
    selectTableDataMuiDomain,
    substate => substate,
  );

export default makeSelectTableDataMui;
export { selectTableDataMuiDomain };
