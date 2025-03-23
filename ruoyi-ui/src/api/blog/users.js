import request from '@/utils/request'

// 查询博客系统的用户信息列表
export function listUsers(query) {
  return request({
    url: '/blog/users/list',
    method: 'get',
    params: query
  })
}

// 查询博客系统的用户信息详细
export function getUsers(userId) {
  return request({
    url: '/blog/users/' + userId,
    method: 'get'
  })
}

// 新增博客系统的用户信息
export function addUsers(data) {
  return request({
    url: '/blog/users',
    method: 'post',
    data: data
  })
}

// 修改博客系统的用户信息
export function updateUsers(data) {
  return request({
    url: '/blog/users',
    method: 'put',
    data: data
  })
}

// 删除博客系统的用户信息
export function delUsers(userId) {
  return request({
    url: '/blog/users/' + userId,
    method: 'delete'
  })
}
