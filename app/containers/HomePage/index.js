/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { Fragment } from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Tabs from 'antd/lib/tabs';
import { FormOutlined, DatabaseOutlined } from '@ant-design/icons';

import NestedFormAntd from 'containers/NestedFormAntd/Loadable';
import TableDataAntd from 'containers/TableDataAntd/Loadable';

const { TabPane } = Tabs;

export default function HomePage() {
  return (
    <Fragment>
      <Row>
        <Col xs={24} md={4} />
        <Col xs={24} md={16}>
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={<span><FormOutlined />Form</span>}
              key="1"
            >
              <NestedFormAntd />
            </TabPane>
            <TabPane
              tab={<span><DatabaseOutlined />Table</span>}
              key="2"
            >
              <TableDataAntd />
            </TabPane>
          </Tabs>
          
        </Col>
        <Col xs={24} md={4} />
      </Row>
      
    </Fragment>
  );
}
