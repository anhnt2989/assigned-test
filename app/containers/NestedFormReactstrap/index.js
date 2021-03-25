/**
 *
 * NestedFormReactstrap
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
import makeSelectNestedFormReactstrap from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function NestedFormReactstrap() {
  useInjectReducer({ key: 'nestedFormReactstrap', reducer });
  useInjectSaga({ key: 'nestedFormReactstrap', saga });

  return (
    <div>
      <Helmet>
        <title>NestedFormReactstrap</title>
        <meta
          name="description"
          content="Description of NestedFormReactstrap"
        />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

NestedFormReactstrap.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  nestedFormReactstrap: makeSelectNestedFormReactstrap(),
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
)(NestedFormReactstrap);
