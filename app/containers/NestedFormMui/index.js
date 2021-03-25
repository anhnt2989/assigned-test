/**
 *
 * NestedFormMui
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
import makeSelectNestedFormMui from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function NestedFormMui() {
  useInjectReducer({ key: 'nestedFormMui', reducer });
  useInjectSaga({ key: 'nestedFormMui', saga });

  return (
    <div>
      <Helmet>
        <title>NestedFormMui</title>
        <meta name="description" content="Description of NestedFormMui" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

NestedFormMui.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  nestedFormMui: makeSelectNestedFormMui(),
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
)(NestedFormMui);
