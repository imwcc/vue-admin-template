import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

export function getDeploymentsList(params) {
  return request({
    url: '/deployments',
    method: 'get',
    params
  })
}