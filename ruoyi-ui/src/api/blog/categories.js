import request from '@/utils/request'

// 查询博客系统的文章与分类关联，用于实现多对多关系列表
export function listCategories(query) {
  return request({
    url: '/blog/categories/list',
    method: 'get',
    params: query
  })
}

// 查询博客系统的文章与分类关联，用于实现多对多关系列表
export function listCategoriesAll(query) {
  return request({
    url: '/blog/categories/listAll',
    method: 'get',
    params: query
  })
}

// 查询博客系统的文章与分类关联，用于实现多对多关系详细
export function getCategories(categoryId) {
  return request({
    url: '/blog/categories/' + categoryId,
    method: 'get'
  })
}

// 新增博客系统的文章与分类关联，用于实现多对多关系
export function addCategories(data) {
  console.log(data.value)
  return request({
    method: 'post',
    url: '/blog/categories',
    data: data
  })
}

// 修改博客系统的文章与分类关联，用于实现多对多关系
export function updateCategories(data) {
  return request({
    url: '/blog/categories',
    method: 'put',
    data: data
  })
}

// 删除博客系统的文章与分类关联，用于实现多对多关系
export function delCategories(categoryIds) {
  return request({
    url: '/blog/categories/' + categoryIds,
    method: 'delete'
  })
}
