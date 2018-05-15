import { routerRedux } from 'dva/router'
import { notification } from 'antd'
import fetch from 'dva/fetch'
import store from '../index'
import config from './config'

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
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

function parseJSON(response) {
  const json = response.json();
  const { dispatch } = store;
  if (json.code === config.sys.logout_code) {
    dispatch(routerRedux.push('/account/logout'))
    return;
  }
  return json;
}

function catchExption(err) {
  const { status } = err;
  const { dispatch } = store;
  if (status === 403) {
    dispatch(routerRedux.push('/exption/404'))
    return;
  }
  if (status >= 404 && status < 422) {
    dispatch(routerRedux.push('/exption/404'))
    return;
  }
  if (status >= 500 && status <= 504) {
    dispatch(routerRedux.push('/exption/404'))
    return;
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
    if (!(options.body instanceof FormData)) {
      newOption.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOption.headers
      }
      newOption.body = JSON.stringify(newOption.body)
    } else {
      newOption.headers = {
        Accept: 'application/json',
        ...newOption.headers
      }
    }
  }
  return fetch(url, newOption)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => data)
    .catch(catchExption);
}
