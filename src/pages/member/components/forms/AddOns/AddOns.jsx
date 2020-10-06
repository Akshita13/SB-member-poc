import React, { useState, Fragment } from 'react';
import { Form, Row, Col, Input, InputNumber, Switch, Tooltip } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import AdMangeModal from './AdMangeModal';
import NotificationModal from './NotificationModal';
import { connect } from 'dva';

const AddOns = props => {
  const {
    form: { getFieldDecorator },
    form,
  } = props.props.props;
  const [modalVisible, setmodalVisible] = useState(false);
  const [settingIconVisible, setsettingIconVisible] = useState(false);
  const [notificationModalVisible, setnotificationModalVisible] = useState(false);
  const [settingsNotificationVisible, setsettingsNotificationVisible] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const [productList, setproductList] = useState([]);
  const [isNotificationOpen, setisNotificationOpen] = useState(false);

  const { permissions } = props;

  const changePermission = (permission, status) => {
    props.changePermission(permission, status);
  };

  const getproductsDetails = switchName => {
    if (switchName === 'ad_manage') {
      setmodalVisible(true);
      setsettingIconVisible(true);
      setisOpen(true);
    }

    if (switchName === 'notification') {
      setisNotificationOpen(true);
      setnotificationModalVisible(true);
      setsettingsNotificationVisible(true);
    }
  };

  const handlePermissionChange = (name, value) => {
    permissions[name] = value;
    changePermission(name, value);
    if (name === 'ad_manage') {
      if (value) {
        getproductsDetails('ad_manage');
      } else {
        setsettingIconVisible(false);
      }
    }
    if (name === 'user_notification') {
      if (value) {
        getproductsDetails('notification');
      } else {
        setsettingsNotificationVisible(false);
      }
    }
  };

  const onSave = selectedProducts => {
    props.handleProductSubmit(selectedProducts);
    setproductList(selectedProducts);
    setmodalVisible(false);
  };

  const onNotificationClose = () => {
    setisNotificationOpen(false);
  };

  return (
    <>
      <Row gutter={24}>
        <Col lg={8} md={12} sm={24}>
          <Form.Item
            label="Change delivery address"
            extra="This will enable the customers to change the delivery address"
          >
            {getFieldDecorator('change_delivery_address', {
              initialValue: permissions && permissions.change_delivery_address,
            })(
              <Switch
                checked={permissions.change_delivery_address}
                onChange={(checked, e) => {
                  handlePermissionChange('change_delivery_address', checked);
                }}
              />,
            )}
          </Form.Item>
        </Col>

        <Col lg={8} md={12} sm={24}>
          <Form.Item
            label="Manage ads"
            extra={
              <div>
                <span style={{ flexGrow: 1 }}>
                  This will enable the customers to view related products on the subscription list
                </span>
                {permissions.ad_manage || settingIconVisible ? (
                  <div style={{ flexGrow: 1 }}>
                    <Tooltip title="Click here to configure products">
                      <SettingOutlined
                        onClick={() => getproductsDetails('ad_manage')}
                        style={{ color: 'black' }}
                      />
                    </Tooltip>
                  </div>
                ) : (
                  ''
                )}
              </div>
            }
          >
            {getFieldDecorator('ad_manage', {
              initialValue: permissions && permissions.ad_manage,
            })(
              <Switch
                checked={form.getFieldValue('ad_manage')}
                onChange={(checked, e) => {
                  handlePermissionChange('ad_manage', checked);
                }}
              />,
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col lg={8} md={12} sm={24}>
          <Form.Item
            label="User Notification"
            extra={
              <div>
                <span style={{ flexGrow: 1 }}>
                  This will enable the customers to view related products on the shop
                </span>
                {permissions.user_notification || settingsNotificationVisible ? (
                  <div style={{ flexGrow: 1 }}>
                    <Tooltip title="Click here to configure shop products">
                      <SettingOutlined
                        onClick={() => getproductsDetails('notification')}
                        style={{ color: 'black' }}
                      />
                    </Tooltip>
                  </div>
                ) : (
                  ''
                )}
              </div>
            }
          >
            {getFieldDecorator('notification', {
              initialValue: permissions && permissions.user_notification,
            })(
              <Switch
                checked={permissions.user_notification}
                onChange={(checked, e) => {
                  handlePermissionChange('user_notification', checked);
                }}
              />,
            )}
          </Form.Item>
        </Col>
      </Row>
      {modalVisible && (
        <AdMangeModal
          isOpen={isOpen}
          onSave={onSave}
          selectedProducts={productList ? productList : []}
          props={props}
        />
      )}
      {notificationModalVisible && (
        <NotificationModal
          isOpen={isNotificationOpen}
          close={onNotificationClose}
          notificationList={props.notificationList}
          notificationSave={props.notificationSave}
          // selectedProducts={productList ? productList : []}
          props={props}
        />
      )}
    </>
  );
};

export default connect(({ user }) => ({
  notificationList: user.notificationList,
}))(AddOns);
