import request from '../../utils/request'

export async function getMenuList(params) {
    return request('/manage/api/menu/getMenuList', { body: params });
}