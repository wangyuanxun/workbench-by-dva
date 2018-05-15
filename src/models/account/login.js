import { message } from 'antd'
import { routerRedux } from 'dva/router'
import { login } from '../../services/account/login'

export default {
    namespace: 'account',
    state: null,
    effects: {
        *login({ payload }, { put, call }) {
            const response = yield call(login, payload)
            if (response.code === 1) {
                yield put(routerRedux.push('/'))
            } else {
                message.error(response.message)
            }
        }
    }
}