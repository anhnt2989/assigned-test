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
import { SearchOutlined } from '@ant-design/icons';
import ReactDragListView from "react-drag-listview";
import NumberFormat from 'react-number-format';
import { filter, includes, isEmpty, maxBy, minBy } from 'lodash';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import MockData from 'constants/mockup';

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
    render: value => <NumberFormat value={value} displayType="text" thousandSeparator />
  },
  {
    title: 'Type',
    dataIndex: 'type',
  },
  {
    title: 'Origin',
    dataIndex: 'origin',
  },
  {
    title: 'Actions',
    dataIndex: '',
    render: () => (
      <div style={{display: 'flex'}}>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    )
  },

];

//I was gonna create Draggable-Columns Table here
//in real-proj, I used to separate it into defined component (with its own props) to re-use
//table styling is specific too, should make it in inner styling
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
    <ReactDragListView.DragColumn
        onDragEnd={onDragEnd}
        nodeSelector="th"
      >
      <Table bordered columns={innerColumns} dataSource={dataSource} />
    </ReactDragListView.DragColumn>
  );
}

//please ignore fu**ing unique key warning, I could manage it but I did not have enough of time =))
export function TableDataAntd() {
  useInjectReducer({ key: 'tableDataAntd', reducer });
  useInjectSaga({ key: 'tableDataAntd', saga });

  const [tableData, setTableData] = useState(MockData.products);
  const [filterText, setFilterText] = useState('');
  const [minPrice, ] = useState(minBy(MockData.products, product => product.price).price);
  const [maxPrice, ] = useState(maxBy(MockData.products, product => product.price).price);

  const handleFilterChange = evt => {
    setFilterText(evt.target.value);
  };
  const handlePriceSliderChange = prices => {
    console.log(prices);
  };

  const handleFilterProductsbyPrice = prices => {
    console.log(prices);
    let clonedData = [...tableData];
    let filteredData = filter(clonedData, product => product.price <= prices[1] && product.price >= prices[0]);
    setTableData(filteredData);
  };

  useEffect(() => {
    let clonedData = [...tableData];
    let filteredData = [];
    if (filterText && !isEmpty(filterText)) {
      filteredData = filter(clonedData, product => {
        return (includes(product.name.toLowerCase(), filterText.toLowerCase()) || includes(product.type.toLowerCase(), filterText.toLowerCase));
      });
    } else {
      filteredData = MockData.products;
    }
    setTableData(filteredData);
  }, [filterText]);

  return (
    <TableDataAntdWrapper>
      <Row className="mt-5">
        <Col xs={24} md={12}>
          <Input placeholder="Search by name, type,..." onChange={handleFilterChange} value={filterText} prefix={<SearchOutlined />} allowClear />
        </Col>
        <Col xs={24} md={12} className="px-5">
          <Slider 
            tooltipVisible
            tipFormatter={text => <NumberFormat value={text} displayType="text" thousandSeparator suffix=" đ" />}
            range 
            marks={{
              0: {label: <NumberFormat displayType="text" value={minPrice} thousandSeparator suffix=" đ" />},
              7127123: {label: <NumberFormat displayType="text" value={maxPrice} thousandSeparator suffix=" đ" />}
            }}
            max={maxPrice} 
            min={minPrice} 
            defaultValue={[minPrice, maxPrice]} 
            onAfterChange={handleFilterProductsbyPrice} 
            onChange={handlePriceSliderChange} 
          />
        </Col>
      </Row>
      <Row className="my-5">
        <Col xs={24}>
          <DraggableTable columns={columns} dataSource={tableData} />
        </Col>
      </Row>
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
