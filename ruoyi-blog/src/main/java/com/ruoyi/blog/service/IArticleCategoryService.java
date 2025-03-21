package com.ruoyi.blog.service;

import com.ruoyi.blog.domain.ArticleCategory;

import java.util.List;

/**
 * 【请填写功能名称】Service接口
 * 
 * @author ruoyi
 * @date 2025-03-21
 */
public interface IArticleCategoryService 
{
    /**
     * 查询【请填写功能名称】
     * 
     * @param cdArticleCategory 【请填写功能名称】主键
     * @return 【请填写功能名称】
     */
    public ArticleCategory selectArticleCategoryByCdArticleCategory(Long cdArticleCategory);

    /**
     * 查询【请填写功能名称】列表
     * 
     * @param articleCategory 【请填写功能名称】
     * @return 【请填写功能名称】集合
     */
    public List<ArticleCategory> selectArticleCategoryList(ArticleCategory articleCategory);

    /**
     * 新增【请填写功能名称】
     * 
     * @param articleCategory 【请填写功能名称】
     * @return 结果
     */
    public int insertArticleCategory(ArticleCategory articleCategory);

    /**
     * 修改【请填写功能名称】
     * 
     * @param articleCategory 【请填写功能名称】
     * @return 结果
     */
    public int updateArticleCategory(ArticleCategory articleCategory);

    /**
     * 批量删除【请填写功能名称】
     * 
     * @param cdArticleCategorys 需要删除的【请填写功能名称】主键集合
     * @return 结果
     */
    public int deleteArticleCategoryByCdArticleCategorys(Long[] cdArticleCategorys);

    /**
     * 删除【请填写功能名称】信息
     * 
     * @param cdArticleCategory 【请填写功能名称】主键
     * @return 结果
     */
    public int deleteArticleCategoryByCdArticleCategory(Long cdArticleCategory);
}
