import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Select, Card, Col, Form, Row } from 'antd';
import StepsComp from './components/StepsComp';
import FooterToolbar from './components/FooterToolbar/index';
import { useEffect, useState } from 'react';
import { defaultPermissions } from './constant';
const Member = props => {
  const {
    form: { getFieldDecorator },
    selectedItems,
  } = props;
  const [selectedProducts, setselectedProducts] = useState([]);
  const [notifications, setnotifications] = useState([]);
  const [memberPortalActions, setmemberPortalActions] = useState(defaultPermissions);

  const changePermission = (permission, status) => {
    setmemberPortalActions({
      memberPortalActions: { ...memberPortalActions, [permission]: status },
    });
    console.log(memberPortalActions, permission, 'memberPortalActions');
  };

  const handleChange = value => {
    console.log(value, 'value');
  };

  const handleProductSubmit = selectedPoducts => {
    setselectedProducts(selectedPoducts);
  };

  const notificationSave = notification => {
    setnotifications(notification);
  };

  const handleSubmit = value => {
    const { form } = props;
    const { dispatch } = props.mainProps;
    if (form) {
      form.validateFields((err, values) => {
        if (!err) {
          var formData = values;
          formData.member_portal_ad_products = selectedProducts;
          formData.notifications = notifications;
          formData.memberPortalActions = memberPortalActions;
          delete formData.notification;
          delete formData.ad_manage;
          delete formData.change_delivery_address;
          if (dispatch) {
            dispatch({
              type: 'user/submitForm',
              payload: formData,
            });
          }
        }
      });
    }
  };
  return (
    <>
      <PageHeaderWrapper content="Members portal">
        <Card bordered={false}>
          <Form layout="vertical" style={{ paddingLeft: '8px' }} onSubmitCapture={handleSubmit}>
            <Row gutter={24}>
              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="Select checkout"
                  extra="Select checkout, to manage go to Checkouts > Add new checkout"
                >
                  {getFieldDecorator('member_portal_checkout_id', {
                    rules: [
                      {
                        required: true,
                        message: 'Select checkout is a required field',
                      },
                    ],
                  })(
                    <Select
                      placeholder="Select Checkout Instance"
                      mode="single"
                      allowClear={false}
                      onSelect={handleChange}
                    >
                      {props.selectionData
                        ? props.selectionData.map(data => (
                            <Select.Option value={data.id['$oid']} selected={true}>
                              {data.checkout_label}
                            </Select.Option>
                          ))
                        : ''}
                    </Select>,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <StepsComp
              props={props}
              handleProductSubmit={handleProductSubmit}
              notificationSave={notificationSave}
              changePermission={changePermission}
              permissions={defaultPermissions}
            />

            <FooterToolbar>
              <>
                <Form.Item>
                  <Button htmlType="submit" loading={false} style={{ marginTop: '10px' }}>
                    Save
                  </Button>
                </Form.Item>
              </>
            </FooterToolbar>
          </Form>
        </Card>
      </PageHeaderWrapper>
    </>
  );
};

export default Form.create()(Member);
