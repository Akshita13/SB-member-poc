import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {
  Button,
  Select,
  Card,
  Col,
  Form,
  Row
} from 'antd';
import StepsComp from './components/StepsComp';
import FooterToolbar from './components/FooterToolbar/index'

const Member = (props) => {

  const { form: { getFieldDecorator } } = props;

  const handleChange = (value) => {
    console.log(value, "value");
  }

  const handleSubmit = (value) => {
    // const { form } = props;
    const { form, onSubmitCapture } = props;
    if (form) {
      console.log(value,'value');
      
      console.log(form.getFieldsValue(), "fdgsdg");
      form.validateFields(
        (err, values) => {
          if (!err) {
            console.log("values",values);
            onSubmitCapture(values);
          }
        },
      );
    }
  }
  return (
    <>
      <PageHeaderWrapper content="Members portal">
        <Card bordered={false} >

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
                  })(<Select
                    placeholder="Select Checkout Instance"
                    mode="single"
                    allowClear={false}
                    onSelect={handleChange}
                  >
                    {props.selectionData
                      ? props.selectionData.map(data => (
                        <Select.Option value={data.id['$oid']} selected={true}>{data.checkout_label}</Select.Option>
                      ))
                      : ''}
                  </Select>)}
                </Form.Item>
              </Col>
            </Row>
            <StepsComp props={props} />

            <FooterToolbar>

              <>
                <Form.Item >
                  <Button htmlType="submit" loading={false} style={{marginTop:'10px'}}>
                    Save
                </Button>
                </Form.Item>

              </>

            </FooterToolbar>

          </Form>

        </Card>
      </PageHeaderWrapper>


    </>
  )
}

export default Form.create()(Member)