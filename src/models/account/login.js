import { message } from 'antd'
import { routerRedux } from 'dva/router'
import { login } from '../../services/account/login'
import { userLogin, isLogin } from '../../utils/auth'

export default {
    namespace: 'account',
    state: {},
    effects: {
        *login({ payload }, { put, call }) {
            const response = yield call(login, payload);
            if (response.code === 1) {
                userLogin(response.TOKEN, response.real_name);
                yield put(routerRedux.push('/'));
            } else {
                message.error(response.message);
            }
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
                if (pathname === '/account/login' && isLogin()) {
                    dispatch(routerRedux.push('/'));
                }
            })
        }
    }
}