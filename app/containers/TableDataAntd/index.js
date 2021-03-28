/**
 *
 * TableDataAntd
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Table from 'antd/lib/table';
import Input from 'antd/lib/input';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Slider from 'antd/lib/slider';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import Form from 'antd/lib/form';
import Select from 'antd/lib/select';
import { SearchOutlined } from '@ant-design/icons';
import ReactDragListView from 'react-drag-listview';
import NumberFormat from 'react-number-format';
import { filter, includes, isEmpty, maxBy, minBy, isEqual } from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import uuid from 'react-uuid';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import MockData from 'constants/mockup';

import AntdFormInput from 'components/AntdFormInput';

import makeSelectTableDataAntd from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import TableDataAntdWrapper from './TableDataAntdStyle';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Price',
    dataIndex: 'price',
    sorter: (a, b) => a.price - b.price,
    render: value => (
      <NumberFormat value={value} displayType="text" thousandSeparator />
    ),
  },
  {
    title: 'Type',
    dataIndex: 'type',
  },
  {
    title: 'Origin',
    dataIndex: 'origin',
    sorter: (a, b) => a.origin.localeCompare(b.origin),
  },
  {
    title: 'Actions',
    dataIndex: '',
    render: () => (
      <div style={{ display: 'flex' }}>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    ),
  },
];

// I was gonna create Draggable-Columns Table here
// in real-proj, I used to separate it into defined component (with its own props) to re-use
// table styling is specific too, should make it in inner styling
function DraggableTable(props) {
  const { dataSource, columns } = props;
  const [innerColumns, setColumns] = useState(columns);
  const onDragEnd = (fromIndex, toIndex) => {
    const columnsCopy = innerColumns.slice();
    const item = columnsCopy.splice(fromIndex, 1)[0];
    columnsCopy.splice(toIndex, 0, item);
    setColumns(columnsCopy);
  };

  return (
    <ReactDragListView.DragColumn onDragEnd={onDragEnd} nodeSelector="th">
      <Table
        tableLayout="auto"
        bordered
        columns={innerColumns}
        dataSource={dataSource}
      />
    </ReactDragListView.DragColumn>
  );
}

// please ignore fu**ing unique key warning, I could manage it but I did not have enough of time =))
export function TableDataAntd() {
  useInjectReducer({ key: 'tableDataAntd', reducer });
  useInjectSaga({ key: 'tableDataAntd', saga });

  const [form] = Form.useForm();
  const { Option } = Select;

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const toastConfigs = {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
  };

  const [tableData, setTableData] = useState(MockData.products);
  const [filterText, setFilterText] = useState('');
  const [minPrice] = useState(
    minBy(MockData.products, product => product.price).price,
  );
  const [maxPrice] = useState(
    maxBy(MockData.products, product => product.price).price,
  );
  const [isProductAdderOpened, setProductAdderStatus] = useState(false);

  const handleFilterChange = evt => {
    setFilterText(evt.target.value);
  };
  const handlePriceSliderChange = prices => {
    console.log(prices);
  };
  const onSubmit = formData => {
    console.log('formData: >>>', formData);
    const clonedData = [...tableData];
    clonedData.unshift({
      id: uuid(),
      ...formData,
    });
    setTableData(clonedData);
    setProductAdderStatus(false);
    toast.success('You have added a product successfully!', toastConfigs);
  };

  const handleFilterProductsbyPrice = prices => {
    console.log(prices);
    const clonedData = [...tableData];
    const filteredData = filter(
      clonedData,
      product => product.price <= prices[1] && product.price >= prices[0],
    );
    setTableData(filteredData);
    // reset filtered data
    if (isEqual(prices[0], minPrice) && isEqual(prices[1], maxPrice)) {
      setTableData(MockData.products);
    }
  };

  useEffect(() => {
    const clonedData = [...tableData];
    let filteredData = [];
    if (filterText && !isEmpty(filterText)) {
      filteredData = filter(
        clonedData,
        product =>
          includes(product.name.toLowerCase(), filterText.toLowerCase()) ||
          includes(product.type.toLowerCase(), filterText.toLowerCase),
      );
    } else {
      // reset filtered data
      filteredData = MockData.products;
    }
    setTableData(filteredData);
  }, [filterText]);

  return (
    <TableDataAntdWrapper>
      <ToastContainer />
      <Row className="my-5 text-center">
        <Col xs={24}>
          <Button
            onClick={() => setProductAdderStatus(true)}
            shape="round"
            type="primary"
          >
            Add new product
          </Button>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col xs={24} md={12}>
          <Input
            autoFocus
            placeholder="Search by name, type,..."
            onChange={handleFilterChange}
            value={filterText}
            prefix={<SearchOutlined />}
            allowClear
          />
        </Col>
        <Col xs={24} md={12} className="px-5">
          <Slider
            tooltipVisible
            tipFormatter={text => (
              <NumberFormat
                value={text}
                displayType="text"
                thousandSeparator
                suffix=" đ"
              />
            )}
            range
            marks={{
              0: {
                label: (
                  <NumberFormat
                    displayType="text"
                    value={minPrice}
                    thousandSeparator
                    suffix=" đ"
                  />
                ),
              },
              7127123: {
                label: (
                  <NumberFormat
                    style={{ whiteSpace: 'nowrap' }}
                    displayType="text"
                    value={maxPrice}
                    thousandSeparator
                    suffix=" đ"
                  />
                ),
              },
            }}
            max={maxPrice}
            min={minPrice}
            defaultValue={[minPrice, maxPrice]}
            onAfterChange={handleFilterProductsbyPrice}
            onChange={handlePriceSliderChange}
            draggableTrack
          />
        </Col>
      </Row>
      <Row className="my-5">
        <Col xs={24}>
          <DraggableTable columns={columns} dataSource={tableData} />
        </Col>
      </Row>
      <Modal
        centered
        visible={isProductAdderOpened}
        onCancel={() => setProductAdderStatus(false)}
        onOk={() => form.submit()}
        title="Add new Product"
      >
        <Form {...layout} form={form} onFinish={onSubmit} name="control-hooks">
          <AntdFormInput
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Error' }]}
            hasFeedback
          >
            <Input />
          </AntdFormInput>
          <AntdFormInput
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Error' }]}
            hasFeedback
          >
            <Input type="number" />
          </AntdFormInput>
          <Row>
            <Col xs={24} md={12}>
              <AntdFormInput name="type" label="Loại">
                <Select defaultValue="different">
                  <Option value="computer">Máy tính</Option>
                  <Option value="washing">Máy giặt</Option>
                  <Option value="car">Ô tô</Option>
                  <Option value="motorbike">Xe máy</Option>
                  <Option value="phone">Điện thoại</Option>
                  <Option value="different">Khác</Option>
                </Select>
              </AntdFormInput>
            </Col>
            <Col xs={24} md={12}>
              <AntdFormInput name="origin" label="Xuất xứ">
                <Select defaultValue="DIFF">
                  <Option value="US">Mỹ</Option>
                  <Option value="JP">Nhật</Option>
                  <Option value="VN">Việt Nam</Option>
                  <Option value="EU">Châu Âu</Option>
                  <Option value="KO">Hàn Quốc</Option>
                  <Option value="DIFF">Khác</Option>
                </Select>
              </AntdFormInput>
            </Col>
          </Row>
        </Form>
      </Modal>
    </TableDataAntdWrapper>
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
