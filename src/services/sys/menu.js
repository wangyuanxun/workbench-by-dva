import request from '../../utils/request'

export async function getMenuList(params) {
    return request('/manage/api/menu/getMenuList', { body: params });
}

export async function menuStateChange(params) {
    return request('/manage/api/menu/menuStateChange', { body: params })
}

export async function getParentMenu() {
    return request('/manage/api/menu/getParentMenu')
}

export async function addOrUpdateMenu(params) {
    return request('/manage/api/menu/addOrUpdateMenu', { body: params })
}

export async function delMenu(params){
    return request('/manage/api/menu/delMenu', { body: params })
}

export async function loadMenu(params){
    return request('/manage/api/menu/loadMenu', { body: params })
}