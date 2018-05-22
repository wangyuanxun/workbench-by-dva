import { routerRedux } from 'dva/router'
import { notification } from 'antd'
import fetch from 'dva/fetch'
import store from '../index'
import config from './config'

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  }

  let [status, msg] = [response.status, response.statusText || '系统异常']

  notification.error({
    message: '请求错误',
    description: status + ' - ' + msg
  })

  const error = new Error(msg);
  error.status = response.status;
  throw error;
}

function checkLogin(response) {
  const { dispatch } = store;
  if (response.code === config.logout_code) {
    dispatch(routerRedux.push('/account/login'))
  }
  return response;
}

function catchExption(err) {
  const { status } = err;
  const { dispatch } = store;
  let error_response = {
    code: 0,
    message: '系统出错'
  }
  if (status >= 404 && status < 422) {
    dispatch(routerRedux.push('/exception/404'))
    return error_response;
  }
  if (status >= 500 && status <= 504) {
    dispatch(routerRedux.push('/exception/500'))
    return error_response;
  }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const defaultOptions = {
    credentials: 'include',
    method: 'POST'
  }
  const newOption = { ...defaultOptions, ...options }
  if (newOption.method === 'POST') {
    if (newOption.body && !(newOption.body instanceof FormData)) {
      newOption.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'TOKEN': localStorage.getItem('TOKEN'),
        ...newOption.headers
      }
      newOption.body = JSON.stringify(newOption.body)
    } else {
      newOption.headers = {
        Accept: 'application/json',
        'TOKEN': localStorage.getItem('TOKEN'),
        ...newOption.headers
      }
    }
  }
  return fetch(url, newOption)
    .then(checkStatus)
    .then(checkLogin)
    .catch(catchExption);
}
