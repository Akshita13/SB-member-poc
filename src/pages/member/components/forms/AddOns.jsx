import React, { useState, Fragment } from 'react';
import { Form, Row, Col, Input, InputNumber ,Switch} from "antd";
import defaultPermissions from '../../constant'
const AddOns = (props) => {
  const { form: { getFieldDecorator } } = props.props.props;
  const [validPhoneNoState, setValidPhoneNo] = useState(true);

  const handlePermissionChange = (name,value) =>{

  }
    return (
        <>
            <Row gutter={24}>
                <Col lg={8} md={12} sm={24}>
                    <Form.Item
                        label="Change delivery address"
                        extra="This will enable the customers to change the delivery address">
                        {getFieldDecorator('change_delivery_address', {
                            initialValue: defaultPermissions.change_delivery_address,
                        })(<Switch checked={true} 
                        // onChange={(checked, e) => { this.handlePermissionChange('change_delivery_address', checked) }} 
                        />)}
                    </Form.Item>
                </Col>

                <Col lg={8} md={12} sm={24}>
                    <Form.Item
                        label="Skip next shipment"
                        extra="This will allow the customers to skip the current shipment and move to the next">
                        {getFieldDecorator('skip_next_shipment', {
                            initialValue: defaultPermissions.skip_next_shipment,
                        })(<Switch checked={true} 
                        // onChange={(checked, e) => { this.handlePermissionChange('skip_next_shipment', checked) }} 
                        />)}
                    </Form.Item>
                </Col>

                <Col lg={8} md={12} sm={24}>
                    <Form.Item
                        label="Cancel order"
                        extra="This will allow the customers to cancel any order">
                        {getFieldDecorator('cancel_order', {
                            initialValue:defaultPermissions.cancel_order,
                        })(<Switch checked={true} 
                        // onChange={(checked, e) => { this.handlePermissionChange('cancel_order', checked) }} 
                        />)}
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col lg={8} md={12} sm={24}>
                    <Form.Item
                        label="Change subscription frequency"
                        extra="This will allow the customers to change the subscription frequency of orders">
                        {getFieldDecorator('subscription_frequency', {
                            initialValue: defaultPermissions.subscription_frequency,
                        })(<Switch checked={true} 
                        // onChange={(checked, e) => { this.handlePermissionChange('subscription_frequency', checked) }} 
                        />)}
                    </Form.Item>
                </Col>
                <Col lg={8} md={12} sm={24}>
                    <Form.Item
                        label="Talk to us"
                        extra="This will enable the customers to use the “Talk to us” option for further support">
                        {getFieldDecorator('talk_to_us', {
                            initialValue:defaultPermissions.talk_to_us,
                        })(<Switch checked={true} 
                        // onChange={(checked, e) => { this.handlePermissionChange('talk_to_us', checked) }} 
                        />)}

                    </Form.Item>
                </Col>
                <Col lg={8} md={12} sm={24}>
                    <Form.Item
                        label="Manage ads"
                        extra={
                            <div>
                                <span style={{ flexGrow: 1 }}>This will enable the customers to view related products on the subscription list</span>
                                {/* {permissions.ad_manage || this.state.settingIconVisible ?
                                    <div style={{ flexGrow: 1 }}>
                                        <Tooltip title='Click here to configure products'>
                                            <SettingOutlined onClick={() => this.getproductsDetails('ad_manage')} style={{ color: 'black' }} />
                                        </Tooltip>
                                    </div> : ''}                                    */}
                            </div>}>
                        {getFieldDecorator('ad_manage', {
                            initialValue: defaultPermissions.ad_manage,
                        })(<Switch
                            checked={true}
                            // checkedChildren={<CheckOutlined />}
                            // unCheckedChildren={<CloseOutlined />}
                            // onChange={(checked, e) => { this.handlePermissionChange('ad_manage', checked) }} 
                            />)}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col lg={8} md={12} sm={24}>
                    <Form.Item
                        label="Manage shop"
                        extra={
                            <div>
                                <span style={{ flexGrow: 1 }}>This will enable the customers to view related products on the shop</span>
                                {/* {permissions.catalog_manage || this.state.settingCatalogVisible ?
                                    <div style={{ flexGrow: 1 }}>
                                        <Tooltip title='Click here to configure shop products'>
                                            <SettingOutlined onClick={() => this.getproductsDetails('catalog')} style={{ color: 'black' }} />
                                        </Tooltip>
                                    </div> : ''} */}
                            </div>}>
                        {getFieldDecorator('catalog_manage', {
                            initialValue:defaultPermissions.catalog_manage,
                        })(<Switch
                            checked={true}
                            // checkedChildren={<CheckOutlined />}
                            // unCheckedChildren={<CloseOutlined />}
                            // onChange={(checked, e) => { this.handlePermissionChange('catalog_manage', checked) }}
                             />)}
                    </Form.Item>
                </Col>
                <Col lg={8} md={12} sm={24}>
                    {/* <DownsellProduct
                        handlePermissionChange={this.handlePermissionChange}
                        getDownsellDetails={this.getDownsellDetails}
                        updateForm={this.props.updateForm}
                        downsellPermission={permissions.downsell_offer}
                        downsellRowDetails={this.props.downsellRowDetails}
                    /> */}
                </Col>
            </Row>
        </>
    )
}

export default AddOns