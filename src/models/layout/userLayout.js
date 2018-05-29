import { getMenuList } from '../../services/sys/sys'
import { message } from 'antd'
import { noLayout } from '../../utils/util'

export default {
    namespace: 'layout',
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
            const response = yield call(getMenuList);
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
                if (!noLayout(pathname)) {
                    dispatch({
                        type: 'getMenuList'
                    });
                }
            })
        }
    }
}