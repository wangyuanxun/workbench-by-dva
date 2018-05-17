import { getMenuList } from '../../services/sys/sys'
import { message } from 'antd'

export default {
    namespace: 'sys',
    state: {
        menuData: []
    },
    reducers: {
        load(state, { payload }) {
            return { ...state, menuData: payload }
        }
    },
    effects: {
        *getMenuList({ payload }, { select, put, call }) {
            const response = yield call(getMenuList)
            if (response.code === 1) {
                yield put({ type: 'load', payload: response.data })
            } else {
                message.error(response.message)
            }
        }
    }
}