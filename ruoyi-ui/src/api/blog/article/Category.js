import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listCATEGORY(query) {
  return request({
    url: '/blog/article/category/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getCATEGORY(cdArticleCategory) {
  return request({
    url: '/blog/article/category/' + cdArticleCategory,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addCATEGORY(data) {
  return request({
    url: '/blog/article/category',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateCATEGORY(data) {
  return request({
    url: '/blog/article/category',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delCATEGORY(cdArticleCategory) {
  return request({
    url: '/blog/article/category/' + cdArticleCategory,
    method: 'delete'
  })
}
