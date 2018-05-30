import request from '../../utils/request'

export async function getMenuList(params) {
    return request('/manage/api/menu/getMenuList', { body: params });
}

export async function menuStateChange(params) {
    return request('/manage/api/menu/menuStateChange', { body: params })
}