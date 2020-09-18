import React from 'react';
import Member from './member/index'
import { connect } from 'dva';
import { useEffect } from 'react';

const Welcome = (props) => {

  const { dispatch } = props;

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchSelectionData',
      });
    }
  }, [1]);
  return (

    <Member selectionData={props.selectionData}/>
  )
}

export default connect(({ user }) => ({
  selectionData: user.selectionData
}))(Welcome)
