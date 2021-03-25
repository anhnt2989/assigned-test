/**
 *
 * TableDataReactstrap
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectTableDataReactstrap from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function TableDataReactstrap() {
  useInjectReducer({ key: 'tableDataReactstrap', reducer });
  useInjectSaga({ key: 'tableDataReactstrap', saga });

  return (
    <div>
      <Helmet>
        <title>TableDataReactstrap</title>
        <meta name="description" content="Description of TableDataReactstrap" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

TableDataReactstrap.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tableDataReactstrap: makeSelectTableDataReactstrap(),
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
)(TableDataReactstrap);
