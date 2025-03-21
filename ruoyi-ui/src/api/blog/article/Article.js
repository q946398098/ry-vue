import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listARTICLE(query) {
  return request({
    url: '/blog/article/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getARTICLE(cdArtcile) {
  return request({
    url: '/blog/article/' + cdArtcile,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addARTICLE(data) {
  return request({
    url: '/blog/article',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateARTICLE(data) {
  return request({
    url: '/blog/article',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delARTICLE(cdArtcile) {
  return request({
    url: '/blog/article/' + cdArtcile,
    method: 'delete'
  })
}
