import { getMenuList } from '../../services/sys/sys'
import { message } from 'antd'

export default {
    namespace: 'sys',
    state: {
        menuData: []
    },
    reducers: {
        load(state, { payload }) {
            return { ...state, menuData: payload };
        }
    },
    effects: {
        *getMenuList({ payload }, { put, call }) {
            const response = yield call(getMenuList, payload);
            if (response.code === 1) {
                yield put({ type: 'load', payload: response.data || [] });
            } else {
                message.error(response.message);
            }
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
                if (pathname === '/menu') {
                    dispatch({
                        type: 'getMenuList',
                        payload: { all: true }
                    });
                }
            })
        }
    }
}