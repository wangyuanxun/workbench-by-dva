import request from '../../utils/request'

export async function getMenuList() {
    return request('/manage/api/menu/getMenuList')
}