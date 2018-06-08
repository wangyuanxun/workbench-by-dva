import { getMenuList } from '../../services/sys/menu'
import { message } from 'antd'
import { noLayout } from '../../utils/util'

export default {
    namespace: 'layout',
    state: {
        menuData: [],
        defaultOpenKeys: [],
        defaultSelectedKeys: []
    },
    reducers: {
        load(state, { payload }) {
            let { menuData, pathname } = payload;
            let openKeys = [],
                selectedKeys = [];

            let getMenuKeys = (data, parentId) => {
                data.forEach((item) => {
                    if (item.linkUrl === pathname) {
                        selectedKeys.length = 0;
                        selectedKeys.push(parentId + '_' + item.id);
                        if (parentId !== '') {
                            openKeys.length = 0;
                            openKeys.push(parentId);
                        }
                    }
                    if (item.children && item.children.length > 0)
                        getMenuKeys(item.children, item.id + '');
                })
            }
            getMenuKeys(menuData, '');

            return { ...state, menuData: menuData, defaultOpenKeys: openKeys, defaultSelectedKeys: selectedKeys };
        }
    },
    effects: {
        *getMenuList({ payload }, { put, call }) {
            let { pathname } = payload;
            const response = yield call(getMenuList);
            if (response.code === 1) {
                yield put({ type: 'load', payload: { pathname: pathname, menuData: response.data || [] } });
            } else {
                message.error(response.message);
            }
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
                if (!noLayout(pathname)) {
                    dispatch({ type: 'getMenuList', payload: { pathname: pathname } });
                }
            })
        }
    }
}