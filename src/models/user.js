import {
  queryCurrent,
  query as queryUsers,
  selectCheckout,
  productDetails,
  submitNotificationForm,
  updateNotificationForm,
  getNotification,
  notificationDel,
  submitMembership,
  getMembership,
} from '@/services/user';
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *fetchSelectionData(_, { call, put }) {
      const response = yield call(selectCheckout);
      yield put({
        type: 'loadCheckoutData',
        payload: response,
      });
    },
    *getProducts(_, { call, put }) {
      const response = yield call(productDetails);
      yield put({
        type: 'getProductDetails',
        payload: response,
      });
    },
    *getNotifications(_, { call, put }) {
      const response = yield call(getNotification);
      yield put({
        type: 'notifications',
        payload: response,
      });
    },
    *submitNotification({ payload }, { call, put }) {
      let callback;
      let newPayload;
      if (payload.id) {
        callback = updateNotificationForm;
        newPayload = payload;
      } else {
        callback = submitNotificationForm;
        newPayload = payload;
      }
      const response = yield call(callback, newPayload);

      if (response) {
        const res = yield call(getNotification);
        yield put({
          type: 'notifications',
          payload: res,
        });
      }
    },
    *deleteNotification({ payload }, { call, put }) {
      const response = yield call(notificationDel, payload);
      if (response) {
        const res = yield call(getNotification);
        yield put({
          type: 'notifications',
          payload: res,
        });
      }
    },
    *submitForm({ payload }, { call, put }) {
      const response = yield call(submitMembership, payload);
      if (response) {
        const res = yield call(getMembership);
        yield put({
          type: 'membership',
          payload: res,
        });
      }
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },
    loadCheckoutData(state, action) {
      return { ...state, selectionData: action.payload };
    },
    getProductDetails(state, action) {
      return { ...state, products: action.payload };
    },
    notifications(state, action) {
      return { ...state, notificationList: action.payload };
    },
    membership(state, action) {
      return { ...state, formValues: action.payload };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
