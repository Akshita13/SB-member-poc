import {
  Modal,
  Button,
  Row,
  Col,
  List,
  Skeleton,
  Avatar,
  Popconfirm,
  message,
  Icon,
  Empty,
  Table,
  Input,
} from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import styles from '../../../style.less';
import { connect } from 'dva';

const AdMangeModal = props => {
  console.log(props, 'props');
  const { Search } = Input;
  const [selectedProducts, setselectedProducts] = useState([]);
  let obj = {};
  const columns = [
    {
      title: 'Product',
      dataIndex: 'product_name',
      width: 200,
      render: (text, record) => (
        <div className={'ant-list-item-meta'}>
          <a className={'ant-list-item-meta-avatar'}>
            <Avatar src={record.product_img_url} icon={'file-image'} shape="square" size="large" />
          </a>
          <div className={'ant-list-item-meta-content'}>
            <h4 className={'ant-list-item-meta-title'}>
              <a>{record.product_name}</a>
            </h4>
          </div>
        </div>
      ),
    },
    {
      title: 'Product Type',
      dataIndex: 'product_type',
      width: 100,
      render: text => (
        <span>
          {text == 1 ? 'Sticky.io' : ''}
          {text == 2 ? 'Shopify' : ''}
          {text == 4 ? 'Magento' : ''}
        </span>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      width: 100,
      render: text => <span>${parseFloat(text).toFixed(2)}</span>,
    },
    {
      title: 'Discount Price',
      dataIndex: 'product_discount_price',
      width: 100,
      render: text => <span>{text ? `$${parseFloat(text).toFixed(2)}` : '$0.00'}</span>,
    },
  ];

  useEffect(() => {
    const { dispatch } = props;

    if (dispatch) {
      dispatch({
        type: 'user/getProducts',
      });
    }
  }, [1]);

  useEffect(() => {
    if (props.selectedProducts && props.selectedProducts.length > 0) {
      setselectedProducts(props.selectedProducts);
    }
  }, [1]);

  const handleProductSelection = id => {
    setselectedProducts(id);
  };

  const saveSelectedList = () => {
    props.onSave(selectedProducts);
  };

  return (
    <Modal
      title={'Manage ad products'}
      width={760}
      destroyOnClose
      visible={props.isOpen}
      onCancel={saveSelectedList}
      footer={[
        <Button key="back" onClick={saveSelectedList}>
          Close
        </Button>,
        <Button key="ok" type="primary" onClick={saveSelectedList}>
          Save
        </Button>,
      ]}
    >
      {/* <div className={styles.searchFlexContainer}>
                <div className={styles.productSearch}>
                    <Search
                        placeholder="Search.."
                        // loading={this.state.searching}
                        enterButton
                        // onSearch={(event) => (this.getProducts(event))} 
                        />
                </div>
            </div> */}

      <Table
        rowKey={record => record.id['$oid']}
        rowSelection={{
          selectedRowKeys: selectedProducts,
          selections: true,
          onChange: handleProductSelection,
        }}
        columns={columns}
        dataSource={props.products}
      />
    </Modal>
  );
};

export default connect(({ user }) => ({
  products: user.products,
}))(AdMangeModal);
