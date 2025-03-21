package com.ruoyi.blog.service;

import com.ruoyi.blog.domain.Article;

import java.util.List;

/**
 * 【请填写功能名称】Service接口
 * 
 * @author ruoyi
 * @date 2025-03-21
 */
public interface IArticleService
{
    /**
     * 查询【请填写功能名称】
     * 
     * @param cdArtcile 【请填写功能名称】主键
     * @return 【请填写功能名称】
     */
    public Article selectARTICLEByCdArtcile(Long cdArtcile);

    /**
     * 查询【请填写功能名称】列表
     * 
     * @param aRTICLE 【请填写功能名称】
     * @return 【请填写功能名称】集合
     */
    public List<Article> selectARTICLEList(Article aRTICLE);

    /**
     * 新增【请填写功能名称】
     * 
     * @param aRTICLE 【请填写功能名称】
     * @return 结果
     */
    public int insertARTICLE(Article aRTICLE);

    /**
     * 修改【请填写功能名称】
     * 
     * @param aRTICLE 【请填写功能名称】
     * @return 结果
     */
    public int updateARTICLE(Article aRTICLE);

    /**
     * 批量删除【请填写功能名称】
     * 
     * @param cdArtciles 需要删除的【请填写功能名称】主键集合
     * @return 结果
     */
    public int deleteARTICLEByCdArtciles(Long[] cdArtciles);

    /**
     * 删除【请填写功能名称】信息
     * 
     * @param cdArtcile 【请填写功能名称】主键
     * @return 结果
     */
    public int deleteARTICLEByCdArtcile(Long cdArtcile);
}
