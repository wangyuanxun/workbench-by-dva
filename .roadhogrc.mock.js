import { delay } from 'roadhog-api-doc'

const noProxy = process.env.NO_PROXY === 'true'

const proxy = {
  'POST /manage/api/*': 'http://localhost:8070/'
}

export default (noProxy ? {} : delay(proxy, 1000))
