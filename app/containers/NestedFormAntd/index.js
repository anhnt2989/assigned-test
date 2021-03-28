/**
 *
 * NestedFormAntd
 *
 */

import React, { memo, Fragment, useState, useEffect } from 'react';
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
import { isEmpty, map, last } from 'lodash';
import { ToastContainer, toast } from 'react-toastify';

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
  const toastConfigs = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
  };
  const [renderedForm, setRenderedForm] = useState(null);
  const [panes, setPanes] = useState(MockData.initialPanes);
  const [activeKey, setActiveKey] = useState(MockData.initialPanes[0].key);
  const [currentTemplate, setCurrentTemplate] = useState({
    1: { value: null },
  });

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 24 },
  };

  const onBasicFormSubmit = formData => {
    console.log('formData: >>>', formData);
    toast.success('Successful!', toastConfigs);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed: >>>', errorInfo);
    toast.error('Please fill out all fields!', toastConfigs);
  };

  const renderFormBySelectedTemplate = (templateName, key) => {
    let re_renderedForm = { ...renderedForm };
    const newNestedTemplate = { ...currentTemplate };
    switch (templateName) {
      case 'basic':
        re_renderedForm[key] = (
          <Fragment>
            <AntdFormInput
              name={`email--${key}`}
              label="E-mail"
              rules={[{ required: true, message: 'Error' }]}
              hasFeedback
            >
              <Input />
            </AntdFormInput>
            <AntdFormInput name={`age--${key}`} label="Age">
              <Input />
            </AntdFormInput>
            <AntdFormInput name={`gender--${key}`} label="Gender">
              <Input />
            </AntdFormInput>
          </Fragment>
        );
        break;
      case 'advanced':
        re_renderedForm[key] = (
          <Fragment>
            <AntdFormInput
              name={`id--${key}`}
              label="ID"
              rules={[{ required: true, message: 'Error' }]}
              hasFeedback
            >
              <Input />
            </AntdFormInput>
            <AntdFormInput
              name={`username--${key}`}
              label="Username"
              rules={[{ required: true, message: 'Error' }]}
              hasFeedback
            >
              <Input />
            </AntdFormInput>
            <AntdFormInput name={`password--${key}`} label="Password">
              <Input />
            </AntdFormInput>
          </Fragment>
        );
        break;
      default:
        re_renderedForm = <Fragment />;
    }
    newNestedTemplate[key] = { value: templateName };
    setRenderedForm(re_renderedForm);
    setCurrentTemplate(newNestedTemplate);
  };

  const onTemplateTabChange = activeKey => {
    setActiveKey(activeKey);
    const newNestedTemplate = { ...currentTemplate };
    newNestedTemplate[activeKey] = { value: null };
    setCurrentTemplate(newNestedTemplate);
  };

  const onTemplateTabEdit = (targetKey, action) => {
    switch (action) {
      case 'add':
        addTab(targetKey);
        break;
      case 'remove':
        removeTab(targetKey);
        break;
      default:
    }
  };

  const addTab = async () => {
    const activeKey = `newTab${panes.length}`;
    const newPanes = [...panes];
    let result = await form.validateFields().then(values => result = values).catch(errorInfo => errorInfo);
    if (form.isFieldsTouched() && isEmpty(result.errorFields)) {
      newPanes.push({
        id: panes.length + 1,
        title: `Template ${newPanes.length + 1}`,
        key: activeKey,
      });
      form.resetFields([`template--${activeKey}`]);
    }
    // form.submit();
    setPanes(newPanes);
    setActiveKey(newPanes.length > panes.length ? activeKey : last(panes).key);
  };

  const removeTab = targetKey => {
    let newActiveKey = activeKey;
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter(pane => pane.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setPanes(newPanes);
    setActiveKey(newActiveKey);
  };

  return (
    <div>
      <ToastContainer />
      <Wrapper>
        <Row>
          <Col xs={24} md={4} />
          <Col xs={24} md={16}>
            <Form
              {...layout}
              form={form}
              onFinish={onBasicFormSubmit}
              onFinishFailed={onFinishFailed}
              name="control-hooks"
              validateTrigger={['onChange', 'onBlur']}
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
                    rules={[{ required: true, message: 'Error' }]}
                    hasFeedback
                  >
                    <Input />
                  </AntdFormInput>
                  <AntdFormInput
                    name="title"
                    label="Title"
                    rules={[{ required: true, message: 'Error' }]}
                    hasFeedback
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
                  <Tabs
                    type="editable-card"
                    onChange={onTemplateTabChange}
                    activeKey={activeKey}
                    onEdit={onTemplateTabEdit}
                  >
                    {panes.map(pane => (
                      <TabPane
                        tab={pane.title}
                        key={pane.key}
                        closable={pane.closable}
                      >
                        <Item
                          name={`template--${pane.key}`}
                          label="Template"
                          rules={[{ required: true, message: 'Error' }]}
                        >
                          <Select
                            onChange={templateName =>
                              renderFormBySelectedTemplate(
                                templateName,
                                pane.key,
                              )
                            }
                            placeholder="Choose your own template"
                          >
                            {!isEmpty(MockData.templateOpts) &&
                              map(MockData.templateOpts, option => (
                                <Option
                                  key={`template-option--${option.id}`}
                                  value={option.value}
                                  disabled={option.disabled || false}
                                >
                                  {option.label}
                                </Option>
                              ))}
                          </Select>
                        </Item>
                        {renderedForm && renderedForm[pane.key]}
                      </TabPane>
                    ))}
                  </Tabs>
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
