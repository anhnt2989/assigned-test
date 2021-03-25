import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the nestedFormAntd state domain
 */

const selectNestedFormAntdDomain = state =>
  state.nestedFormAntd || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by NestedFormAntd
 */

const makeSelectNestedFormAntd = () =>
  createSelector(
    selectNestedFormAntdDomain,
    substate => substate,
  );

export default makeSelectNestedFormAntd;
export { selectNestedFormAntdDomain };
