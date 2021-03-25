/**
 *
 * NestedFormAntd
 *
 */

import React, { memo, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Tabs from 'antd/lib/tabs';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Select from 'antd/lib/select';
import { UserOutlined, CopyOutlined } from '@ant-design/icons';
import { isEmpty, map } from 'lodash';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import MockData from 'constants/mockup';

import AntdFormInput from 'components/AntdFormInput';

import makeSelectNestedFormAntd from './selectors';
import reducer from './reducer';
import saga from './saga';
import Wrapper from './NestedFormAntdStyle';

const { TabPane } = Tabs;
const { Item } = Form;
const { Option } = Select;

export function NestedFormAntd() {
  useInjectReducer({ key: 'nestedFormAntd', reducer });
  useInjectSaga({ key: 'nestedFormAntd', saga });

  const [form] = Form.useForm();

  const [renderedForm, setRenderedForm] = useState(null);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 24 },
  };

  const onBasicFormSubmit = formData => {
    console.log(formData);
  };

  const renderFormBySelectedTemplate = templateName => {
    let renderedForm;
    switch (templateName) {
      case 'basic':
        renderedForm = (
          <Fragment>
            <AntdFormInput
              name="email"
              label="E-mail"
              rules={[{ required: true }]}
            >
              <Input />
            </AntdFormInput>
            <AntdFormInput name="age" label="Age">
              <Input />
            </AntdFormInput>
            <AntdFormInput name="gender" label="Gender">
              <Input />
            </AntdFormInput>
          </Fragment>
        );
        break;
      case 'advanced':
        renderedForm = (
          <Fragment>
            <AntdFormInput name="id" label="ID" rules={[{ required: true }]}>
              <Input />
            </AntdFormInput>
            <AntdFormInput
              name="username"
              label="Username"
              rules={[{ required: true }]}
            >
              <Input />
            </AntdFormInput>
            <AntdFormInput name="password" label="Password">
              <Input />
            </AntdFormInput>
          </Fragment>
        );
        break;
      default:
        renderedForm = <Fragment />;
    }
    setRenderedForm(renderedForm);
  };

  return (
    <div>
      <Wrapper>
        <Row>
          <Col xs={24} md={4} />
          <Col xs={24} md={16}>
            <Form
              {...layout}
              form={form}
              onFinish={onBasicFormSubmit}
              name="control-hooks"
            >
              <Tabs defaultActiveKey="1">
                <TabPane
                  tab={
                    <span>
                      <UserOutlined />
                      Basic Information
                    </span>
                  }
                  key="1"
                >
                  <AntdFormInput
                    name="name"
                    label="Name"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </AntdFormInput>
                  <AntdFormInput
                    name="title"
                    label="Title"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </AntdFormInput>
                </TabPane>
                <TabPane
                  tab={
                    <span>
                      <CopyOutlined />
                      Templates
                    </span>
                  }
                  key="2"
                >
                  <Item
                    name="template"
                    label="Template"
                    rules={[{ required: true }]}
                  >
                    <Select
                      onChange={renderFormBySelectedTemplate}
                      allowClear
                      placeholder="Choose your own template"
                    >
                      {!isEmpty(MockData.templateOpts) &&
                        map(MockData.templateOpts, option => (
                          <Option
                            key={`template-option--${option.id}`}
                            value={option.value}
                          >
                            {option.label}
                          </Option>
                        ))}
                    </Select>
                  </Item>
                  {renderedForm}
                </TabPane>
              </Tabs>
              <Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Item>
            </Form>
          </Col>
          <Col xs={24} md={4} />
        </Row>
      </Wrapper>
    </div>
  );
}

NestedFormAntd.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  nestedFormAntd: makeSelectNestedFormAntd(),
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
)(NestedFormAntd);
