import React from 'react';
import Member from './member/index';
import { connect } from 'dva';
import { useEffect } from 'react';

const Welcome = props => {
  const { dispatch } = props;

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchSelectionData',
      });
    }
  }, [1]);
  return (
    <Member
      selectionData={props.selectionData}
      selectedItems={[]}
      mainProps={props}
      formValues={props.formValues}
    />
  );
};

export default connect(({ user }) => ({
  selectionData: user.selectionData,
  formValues: user.formValues,
}))(Welcome);
