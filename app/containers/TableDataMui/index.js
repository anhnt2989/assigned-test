/**
 *
 * TableDataMui
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
import makeSelectTableDataMui from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function TableDataMui() {
  useInjectReducer({ key: 'tableDataMui', reducer });
  useInjectSaga({ key: 'tableDataMui', saga });

  return (
    <div>
      <Helmet>
        <title>TableDataMui</title>
        <meta name="description" content="Description of TableDataMui" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

TableDataMui.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tableDataMui: makeSelectTableDataMui(),
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
)(TableDataMui);
