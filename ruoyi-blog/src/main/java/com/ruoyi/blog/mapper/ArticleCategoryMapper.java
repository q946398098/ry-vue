package com.ruoyi.blog.mapper;

import com.ruoyi.blog.domain.ArticleCategory;

import java.util.List;

/**
 * 【请填写功能名称】Mapper接口
 * 
 * @author ruoyi
 * @date 2025-03-21
 */
public interface ArticleCategoryMapper 
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
     * 删除【请填写功能名称】
     * 
     * @param cdArticleCategory 【请填写功能名称】主键
     * @return 结果
     */
    public int deleteArticleCategoryByCdArticleCategory(Long cdArticleCategory);

    /**
     * 批量删除【请填写功能名称】
     * 
     * @param cdArticleCategorys 需要删除的数据主键集合
     * @return 结果
     */
    public int deleteArticleCategoryByCdArticleCategorys(Long[] cdArticleCategorys);
}
