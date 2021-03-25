import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tableDataAntd state domain
 */

const selectTableDataAntdDomain = state => state.tableDataAntd || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TableDataAntd
 */

const makeSelectTableDataAntd = () =>
  createSelector(
    selectTableDataAntdDomain,
    substate => substate,
  );

export default makeSelectTableDataAntd;
export { selectTableDataAntdDomain };
