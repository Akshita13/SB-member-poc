
import React, { useState, Fragment } from 'react';
import { Form, Row, Col, Input, InputNumber } from "antd"
const SupportContentForm = (props) => {
    const ph_no_reg = /^(?=.*[0-9])[- +()0-9]+$/;
    const validPhoneNo = path => ph_no_reg.test(path);
    const { form: { getFieldDecorator } } = props.props.props;

    const [validPhoneNoState, setValidPhoneNo] = useState(true);
    const validatePhoneNo = (e) => {
        if (e.target.value)
            validPhoneNo(e.target.value) && e.target.value.length > 8 ? setValidPhoneNo(true) : setValidPhoneNo(false)
        else
            setValidPhoneNo(true)
    }
    return (
        <>

            <Row gutter={24}>
                <Col lg={8} md={12} sm={24}>
                    <Form.Item
                        label="Member login slug"
                        extra="Membership login slug to get the configuration of the membership portal"
                    >
                        {getFieldDecorator('member_portal_login_url_slug', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Member Login Slug is a required field',
                                },
                            ],
                            initialValue: '',
                        })(<Input />)}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col lg={8} md={12} sm={24}>
                    <Form.Item
                        label="Support email"
                        extra="Enter support email which customers can connect from “Talk to us” section for further support"
                    >
                        {getFieldDecorator('member_portal_support_email', {
                            rules: [
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Support Email is a required field',
                                },
                            ],

                        })(<Input placeholder="Enter Support Email" />)}
                    </Form.Item>
                </Col>

                <Col lg={8} md={12} sm={24}>
                    <Form.Item
                        label="Support phone"
                        extra="Enter the support phone number which customers can connect from “Talk to us” section for further support"
                        validateStatus={validPhoneNoState ? "success" : "error"}
                        help={validPhoneNoState ? '' : "Should be a valid phone number. Blank space, -, ( ) are allowed only"}
                    >

                        {getFieldDecorator('member_portal_support_phone', {

                        })(<Input
                            maxLength={10}
                            onChange={(value) => validatePhoneNo(value)}
                            placeholder="Enter Support Phone" />)}

                    </Form.Item>

                </Col>
            </Row>

        </>
    )
}

export default SupportContentForm