import { Form, Row, Col, Input, InputNumber } from "antd"

const GeneralSettingsForm = (props) => {

  const { form: { getFieldDecorator } } = props.props.props;

  return (

    <Row gutter={24}>
      <Col lg={8} md={12} sm={24}>
        <Form.Item
          label="Site name"
          extra="Enter store/portal name"
        >
          {getFieldDecorator('member_portal_name', {
            rules: [
              {
                required: true,
                message: 'Site Name is a required field',
              },
              {
                whitespace: true,
                message: 'Site Name is a required field',
              }
            ],
          })(<Input placeholder="Enter store/ portal name" />)}
        </Form.Item>
      </Col>

      <Col lg={8} md={12} sm={24}>
        <Form.Item
          label="Skip shipment day count"
          extra="Allowed days to skip the product subscription"
        >
          {getFieldDecorator('member_portal_shipment_daycount', {
            initialValue:0,
          })(<InputNumber/>)}
        </Form.Item>
      </Col>
    </Row>

  )
}

export default GeneralSettingsForm