import { queryNotices,getCurrentIP,getBaqInfo,getServiceByHaIdType } from '@/services/api';

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    notices: [],
  },

  effects: {
    *fetchNotices(_, { call, put }) {
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data,
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: data.length,
      });
    },
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select(state => state.global.notices.length);
      yield put({
        type: 'user/changeNotifyCount',
        payload: count,
      });
    },
    //获取当前IP
    *fetchCurrentIP({ payload, callback }, { call }) {
      const response = yield call(getCurrentIP, payload);
      if (callback && response) {
        callback(response);
      }
    },
    *fetchBaqInfo({ payload, callback }, { call }) {
      const response = yield call(getBaqInfo, payload);
      if (callback && response && response.data && response.data.list && response.data.list.length) {
        callback(response.data.list)
      }
    },
    *fetchServiceByHaIdType({ payload, callback }, { call }) {
      const response = yield call(getServiceByHaIdType, payload);
      if (callback && response) {
        callback(response.data);
      }
    },
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveNotices(state, { payload }) {
      return {
        ...state,
        notices: payload,
      };
    },
    saveClearedNotices(state, { payload }) {
      return {
        ...state,
        notices: state.notices.filter(item => item.type !== payload),
      };
    },
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
