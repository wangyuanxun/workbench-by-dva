import { getMenuList, menuStateChange, getParentMenu, addOrUpdateMenu, delMenu, loadMenu, moveMenu } from '../../services/sys/menu'
import { message } from 'antd'

export default {
    namespace: 'menu',
    state: {
        menuData: [],
        parentMenuData: [],
        visibleModal: false,
        sysMenu: null
    },
    reducers: {
        loadMenuList(state, { payload }) {
            return { ...state, menuData: payload };
        },
        changeParentMenuData(state, { payload }) {
            return { ...state, parentMenuData: payload };
        },
        visibleModal(state) {
            return { ...state, visibleModal: true };
        },
        invisibleModal(state) {
            return { ...state, visibleModal: false };
        },
        loadSysMenu(state, { payload }) {
            return { ...state, sysMenu: payload };
        }
    },
    effects: {
        *getMenuList({ payload }, { put, call }) {
            const response = yield call(getMenuList, payload);
            if (response.code === 1) {
                yield put({ type: 'loadMenuList', payload: response.data || [] });
            } else {
                message.error(response.message);
            }
        },
        *menuStateChange({ payload }, { put, call }) {
            const response = yield call(menuStateChange, payload);
            if (response.code === 1) {
                yield put({ type: 'getMenuList', payload: { all: true } });
                yield put({ type: 'layout/getMenuList' })
            } else {
                message.error(response.message);
            }
        },
        *getParentMenu({ payload }, { put, call }) {
            const response = yield call(getParentMenu);
            if (response.code === 1) {
                yield put({ type: 'changeParentMenuData', payload: response.data || [] });
            } else {
                message.error(response.message);
            }
        },
        *addOrUpdateMenu({ payload }, { put, call }) {
            const response = yield call(addOrUpdateMenu, payload);
            if (response.code === 1) {
                yield put({ type: 'invisibleModal' });
                yield put({ type: 'getMenuList', payload: { all: true } });
                yield put({ type: 'layout/getMenuList' })
                message.info(response.message);
            } else {
                message.error(response.message);
            }
        },
        *delMenu({ payload }, { put, call }) {
            const response = yield call(delMenu, payload);
            if (response.code === 1) {
                yield put({ type: 'getMenuList', payload: { all: true } });
                yield put({ type: 'layout/getMenuList' })
                message.info(response.message);
            } else {
                message.error(response.message);
            }
        },
        *loadMenu({ payload }, { put, call }) {
            const response = yield call(loadMenu, payload);
            if (response.code === 1) {
                yield put({ type: 'loadSysMenu', payload: response.data });
            } else {
                message.error(response.message);
            }
        },
        *moveMenu({ payload }, { put, call }) {
            const response = yield call(moveMenu, payload);
            if (response.code === 1) {
                yield put({ type: 'getMenuList', payload: { all: true } });
                yield put({ type: 'layout/getMenuList' })
                message.info(response.message);
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