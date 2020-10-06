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
  Form,
  Divider,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useEffect, useState } from 'react';
const NotificationModal = props => {
  const FormItem = Form.Item;
  const {
    form: { getFieldDecorator, resetFields, validateFieldsAndScroll, getFieldValue },
  } = props;
  const [notificationList, setnotificationList] = useState([]);
  const [editingKey, seteditingKey] = useState('');

  const components = {
    body: {
      cell: EditableComp,
    },
  };
  const notificationColumns = [
    {
      title: 'ID',
      width: '10%',
      editable: false,
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      width: '30%',
      editable: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '30%',
      editable: true,
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      width: '20%',

      render: (text, record, index) => {
        const editable = isEditing(index);
        return editable ? (
          <span>
            <EditableContext.Consumer>
              {form => (
                <a
                  onClick={() => save(form, index, record.id ? record.id : '')}
                  style={{ marginRight: 8 }}
                >
                  Save
                </a>
              )}
            </EditableContext.Consumer>
            <Divider type="vertical" />
            <a onClick={cancel}>Cancel</a>
          </span>
        ) : (
          <span>
            <a onClick={() => editAndDelete('edit', record, index)}>Edit</a>
            <Divider type="vertical" />
            <a onClick={() => editAndDelete('delete', record, index)}>Delete</a>
          </span>
        );
      },
    },
  ];

  const column = notificationColumns.map(col => {
    if (!col.editable && col.dataIndex === 'title') {
      return {
        ...col,
        onCell: (record, index) => ({
          record,
          inputType: 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(index),
        }),
      };
    }

    if (col.editable && col.dataIndex === 'description') {
      return {
        ...col,
        onCell: (record, index) => ({
          record,
          inputType: col.dataIndex === 'textarea',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(index),
        }),
      };
    }
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record, index) => ({
        record,
        inputType: col.dataIndex === 'title' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(index),
      }),
    };
  });

  useEffect(() => {
    if (props.notificationList && props.notificationList.length > 0) {
      setnotificationList(props.notificationList);
      console.log(props.notificationList, 'props.notificationList');
    }
  }, [1]);

  useEffect(() => {
    const { dispatch } = props.props.props;

    if (dispatch) {
      dispatch({
        type: 'user/getNotifications',
      });
    }
  }, [1]);

  const editAndDelete = (action, currentItem, index) => {
    if (action === 'edit') seteditingKey(index);
    if (action === 'delete') {
      Modal.confirm({
        title: `Delete ${currentItem.title}`,
        content: 'Are you sure want to delete ?',
        okText: 'Yes',
        cancelText: 'Cancel',
        onOk: () => deleteItem(currentItem, index),
      });
    }
  };

  const deleteItem = (curr, i) => {
    // const { dispatch } = props.props.props;

    // if (dispatch) {
    //     dispatch({
    //         type: 'user/deleteNotification',
    //         payload: curr.id
    //     });
    // }

    if (i > -1) {
      notificationList.splice(i, 1);
    }
    setnotificationList([...notificationList]);
    props.notificationSave([...notificationList]);
  };

  const cancel = () => {
    seteditingKey('');
  };

  const isEditing = index => {
    return index === editingKey;
  };

  const save = (form, index, id) => {
    let errors = form.getFieldsError(['title', 'description']);
    if (!errors.title && !errors.description) {
      var notification = {
        title: form.getFieldValue('title'),
        description: form.getFieldValue('description'),
      };
      // const { dispatch } = props.props.props;

      // if (dispatch) {
      //     dispatch({
      //         type: 'user/submitNotification',
      //         payload: { notification: notification, id: id }
      //     });
      // }
      notificationList[index] = notification;
      setnotificationList([...notificationList]);
      props.notificationSave([...notificationList]);
      seteditingKey('');
    }
  };

  const resetForm = () => {
    resetFields();
  };

  const handleSubmit = () => {
    validateFieldsAndScroll((error, fieldsValue) => {
      if (!error) {
        var notification = {
          title: getFieldValue('notification_title'),
          description: getFieldValue('notification_description'),
        };
        // const { dispatch } = props.props.props;
        setTimeout(() => {
          setnotificationList([...notificationList, notification]);

          console.log(notificationList, 'notificationList--submit');
        }, 0);
        props.notificationSave([...notificationList, notification]);
        // if (dispatch) {
        //     dispatch({
        //         type: 'user/submitNotification',
        //         payload: {notification:notification,id:null}
        //     });
        // }
        resetForm();
      }
    });
  };
  return (
    <Modal
      title={'Notification'}
      width={760}
      destroyOnClose
      visible={props.isOpen}
      onCancel={props.close}
      footer={null}
      maskClosable={false}
    >
      <Form
        hideRequiredMark={true}
        form={props.form}
        style={{
          border: '1px solid #d9d9d9',
          padding: '10px',
          borderRadius: '3px',
        }}
      >
        <FormItem label="Title">
          {getFieldDecorator('notification_title', {
            rules: [
              {
                required: true,
                message: 'Title is a required field',
              },
            ],
          })(<Input placeholder="Title" maxLength={255} />)}
        </FormItem>
        <FormItem label="Description">
          {getFieldDecorator('notification_description', {
            rules: [
              {
                required: true,
                message: 'Description is a required field',
              },
            ],
          })(<TextArea placeholder="Description" maxLength={255} />)}
        </FormItem>
        <div style={{ textAlign: 'right' }}>
          <Button onClick={resetForm} style={{ marginRight: '5px' }}>
            Reset
          </Button>
          <Button type="primary" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </Form>

      <EditableContext.Provider value={props.form}>
        <Table
          components={components}
          columns={column}
          dataSource={
            notificationList
              ? notificationList
              : props.notificationList
              ? props.notificationList
              : []
          }
          rowClassName="editable-row"
          style={{ marginTop: 50 }}
          locale={{
            emptyText: (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No notifications" />
            ),
          }}
        />
      </EditableContext.Provider>
    </Modal>
  );
};

export default Form.create()(NotificationModal);
const EditableContext = React.createContext();
class EditableComp extends React.Component {
  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;

    return (
      <td {...restProps}>
        {editing ? (
          dataIndex === 'title' ? (
            <Form.Item style={{ margin: '0px', padding: '0px', height: '45px' }}>
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: `${title} is required`,
                  },
                ],
                initialValue: record[dataIndex],
              })(<Input maxLength={255} />)}
            </Form.Item>
          ) : (
            <Form.Item style={{ margin: '0px', padding: '0px', height: '45px' }}>
              {getFieldDecorator(dataIndex, {
                rules: [
                  {
                    required: true,
                    message: `${title} is required`,
                  },
                ],
                initialValue: record[dataIndex],
              })(<TextArea placeholder="Description" maxLength={255} rows={1} />)}
            </Form.Item>
          )
        ) : (
          children
        )}
      </td>
    );
  };
  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}
