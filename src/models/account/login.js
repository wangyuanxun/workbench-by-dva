import { message } from 'antd'
import { routerRedux } from 'dva/router'
import { login } from '../../services/account/login'

export default {
    namespace: 'account',
    state: {},
    effects: {
        *login({ payload }, { put, call }) {
            const response = yield call(login, payload);
            if (response.code === 1) {
                localStorage.setItem("TOKEN", response.TOKEN);
                localStorage.setItem("REAL_NAME", response.real_name);
                yield put(routerRedux.push('/'));
            } else {
                message.error(response.message);
            }
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
                if (pathname === '/account/login' && localStorage.getItem('TOKEN')) {
                    dispatch(routerRedux.push('/'));
                }
            })
        }
    }
}