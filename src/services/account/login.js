import request from '../../utils/request'

export async function login(params) {
    return request('/manage/api/account/login', { body: params });
}