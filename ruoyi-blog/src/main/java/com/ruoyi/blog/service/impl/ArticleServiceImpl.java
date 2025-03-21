package com.ruoyi.blog.service.impl;

import java.util.List;

import com.ruoyi.blog.domain.Article;
import com.ruoyi.blog.mapper.ArticleMapper;
import com.ruoyi.blog.service.IArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 【请填写功能名称】Service业务层处理
 * 
 * @author ruoyi
 * @date 2025-03-21
 */
@Service
public class ArticleServiceImpl implements IArticleService
{
    @Autowired
    private ArticleMapper aRTICLEMapper;

    /**
     * 查询【请填写功能名称】
     * 
     * @param cdArtcile 【请填写功能名称】主键
     * @return 【请填写功能名称】
     */
    @Override
    public Article selectARTICLEByCdArtcile(Long cdArtcile)
    {
        return aRTICLEMapper.selectARTICLEByCdArtcile(cdArtcile);
    }

    /**
     * 查询【请填写功能名称】列表
     * 
     * @param aRTICLE 【请填写功能名称】
     * @return 【请填写功能名称】
     */
    @Override
    public List<Article> selectARTICLEList(Article aRTICLE)
    {
        return aRTICLEMapper.selectARTICLEList(aRTICLE);
    }

    /**
     * 新增【请填写功能名称】
     * 
     * @param aRTICLE 【请填写功能名称】
     * @return 结果
     */
    @Override
    public int insertARTICLE(Article aRTICLE)
    {
        return aRTICLEMapper.insertARTICLE(aRTICLE);
    }

    /**
     * 修改【请填写功能名称】
     * 
     * @param aRTICLE 【请填写功能名称】
     * @return 结果
     */
    @Override
    public int updateARTICLE(Article aRTICLE)
    {
        return aRTICLEMapper.updateARTICLE(aRTICLE);
    }

    /**
     * 批量删除【请填写功能名称】
     * 
     * @param cdArtciles 需要删除的【请填写功能名称】主键
     * @return 结果
     */
    @Override
    public int deleteARTICLEByCdArtciles(Long[] cdArtciles)
    {
        return aRTICLEMapper.deleteARTICLEByCdArtciles(cdArtciles);
    }

    /**
     * 删除【请填写功能名称】信息
     * 
     * @param cdArtcile 【请填写功能名称】主键
     * @return 结果
     */
    @Override
    public int deleteARTICLEByCdArtcile(Long cdArtcile)
    {
        return aRTICLEMapper.deleteARTICLEByCdArtcile(cdArtcile);
    }
}
