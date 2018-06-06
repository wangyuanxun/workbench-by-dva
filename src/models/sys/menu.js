import { getMenuList, menuStateChange, getParentMenu, addOrUpdateMenu, delMenu, loadMenu } from '../../services/sys/menu'
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
        changeMenuState(state, { payload }) {
            let id = payload.id,
                menuState = payload.checked ? 1 : 2,
                forEachMenuData = (data) => {
                    data.map((item) => {
                        if (item.id === id)
                            item.state = menuState;
                        if (item.children && item.children.length > 0)
                            forEachMenuData(item.children);
                        return item;
                    })
                    return data;
                }
            let menuData = forEachMenuData(state.menuData);
            return { ...state, menuData: menuData };
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
                yield put({ type: 'changeMenuState', payload: payload });
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
                message.info(response.message);
            } else {
                message.error(response.message);
            }
        },
        *delMenu({ payload }, { put, call }) {
            const response = yield call(delMenu, payload);
            if (response.code === 1) {
                yield put({ type: 'getMenuList', payload: { all: true } });
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