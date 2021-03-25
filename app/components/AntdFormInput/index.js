/**
 *
 * AntdFormInput
 *
 */

import React, { Children } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Form from 'antd/lib/form';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import Wrapper from './AntdFormInputStyle';

const { Item } = Form;

function AntdFormInput(props) {
  const { children, ...rest } = props;
  return (
    <Wrapper>
      <Item {...rest}>{children}</Item>
    </Wrapper>
  );
}

AntdFormInput.propTypes = {};

export default AntdFormInput;
