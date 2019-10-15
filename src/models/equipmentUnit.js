import { getEUList } from '@/services/equipmentUnit';

export default {
    namespace: 'equipmentUnit',

    state: {
        data: {
            list: [],
            page: {}
        },
    },

    effects: {
        *fetchEquipmentUnit({ payload }, { call, put }) {
            const response = yield call(getEUList, payload);
            yield put({
                type: 'saveEUList',
                payload: response.data ? response.data : [],
            });
        },
    },

    reducers: {
        saveEUList(state, action) {
            return {
                ...state,
                data: action.payload,
            };
        },
    },
};
