import request from '@/utils/request'

// 查询博客系统的文章信息列表
export function listArticles(query) {
  return request({
    url: '/blog/articles/list',
    method: 'get',
    params: query
  })
}

// 查询博客系统的文章信息详细
export function getArticles(articleId) {
  return request({
    url: '/blog/articles/' + articleId,
    method: 'get'
  })
}

// 新增博客系统的文章信息
export function addArticles(data) {
  data.tags = data.tags.join(',')
  return request({
    url: '/blog/articles',
    method: 'post',
    data: data
  })
}

// 修改博客系统的文章信息
export function updateArticles(data) {
  data.tags = data.tags.join(',')
  return request({
    url: '/blog/articles',
    method: 'put',
    data: data
  })
}

// 删除博客系统的文章信息
export function delArticles(articleId) {
  return request({
    url: '/blog/articles/' + articleId,
    method: 'delete'
  })
}
