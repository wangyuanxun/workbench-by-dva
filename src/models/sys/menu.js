import { getMenuList, menuStateChange, getParentMenu } from '../../services/sys/sys'
import { message } from 'antd'

export default {
    namespace: 'sys',
    state: {
        menuData: [],
        parentMenuData: []
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