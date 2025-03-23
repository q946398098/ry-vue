import request from '@/utils/request'

// 查询博客系统的文章评论信息列表
export function listComments(query) {
  return request({
    url: '/blog/comments/list',
    method: 'get',
    params: query
  })
}

// 查询博客系统的文章评论信息详细
export function getComments(commentId) {
  return request({
    url: '/blog/comments/' + commentId,
    method: 'get'
  })
}

// 新增博客系统的文章评论信息
export function addComments(data) {
  return request({
    url: '/blog/comments',
    method: 'post',
    data: data
  })
}

// 修改博客系统的文章评论信息
export function updateComments(data) {
  return request({
    url: '/blog/comments',
    method: 'put',
    data: data
  })
}

// 删除博客系统的文章评论信息
export function delComments(commentId) {
  return request({
    url: '/blog/comments/' + commentId,
    method: 'delete'
  })
}
