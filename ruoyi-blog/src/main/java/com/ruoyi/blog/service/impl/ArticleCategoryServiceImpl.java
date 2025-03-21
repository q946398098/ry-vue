package com.ruoyi.blog.service.impl;

import java.util.List;

import com.ruoyi.blog.domain.ArticleCategory;
import com.ruoyi.blog.mapper.ArticleCategoryMapper;
import com.ruoyi.blog.service.IArticleCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 【请填写功能名称】Service业务层处理
 * 
 * @author ruoyi
 * @date 2025-03-21
 */
@Service
public class ArticleCategoryServiceImpl implements IArticleCategoryService
{
    @Autowired
    private ArticleCategoryMapper articleCategoryMapper;

    /**
     * 查询【请填写功能名称】
     * 
     * @param cdArticleCategory 【请填写功能名称】主键
     * @return 【请填写功能名称】
     */
    @Override
    public ArticleCategory selectArticleCategoryByCdArticleCategory(Long cdArticleCategory)
    {
        return articleCategoryMapper.selectArticleCategoryByCdArticleCategory(cdArticleCategory);
    }

    /**
     * 查询【请填写功能名称】列表
     * 
     * @param articleCategory 【请填写功能名称】
     * @return 【请填写功能名称】
     */
    @Override
    public List<ArticleCategory> selectArticleCategoryList(ArticleCategory articleCategory)
    {
        return articleCategoryMapper.selectArticleCategoryList(articleCategory);
    }

    /**
     * 新增【请填写功能名称】
     * 
     * @param articleCategory 【请填写功能名称】
     * @return 结果
     */
    @Override
    public int insertArticleCategory(ArticleCategory articleCategory)
    {
        return articleCategoryMapper.insertArticleCategory(articleCategory);
    }

    /**
     * 修改【请填写功能名称】
     * 
     * @param articleCategory 【请填写功能名称】
     * @return 结果
     */
    @Override
    public int updateArticleCategory(ArticleCategory articleCategory)
    {
        return articleCategoryMapper.updateArticleCategory(articleCategory);
    }

    /**
     * 批量删除【请填写功能名称】
     * 
     * @param cdArticleCategorys 需要删除的【请填写功能名称】主键
     * @return 结果
     */
    @Override
    public int deleteArticleCategoryByCdArticleCategorys(Long[] cdArticleCategorys)
    {
        return articleCategoryMapper.deleteArticleCategoryByCdArticleCategorys(cdArticleCategorys);
    }

    /**
     * 删除【请填写功能名称】信息
     * 
     * @param cdArticleCategory 【请填写功能名称】主键
     * @return 结果
     */
    @Override
    public int deleteArticleCategoryByCdArticleCategory(Long cdArticleCategory)
    {
        return articleCategoryMapper.deleteArticleCategoryByCdArticleCategory(cdArticleCategory);
    }
}
