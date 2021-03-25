/**
 *
 * TableDataAntd
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectTableDataAntd from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function TableDataAntd() {
  useInjectReducer({ key: 'tableDataAntd', reducer });
  useInjectSaga({ key: 'tableDataAntd', saga });

  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

TableDataAntd.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tableDataAntd: makeSelectTableDataAntd(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TableDataAntd);
