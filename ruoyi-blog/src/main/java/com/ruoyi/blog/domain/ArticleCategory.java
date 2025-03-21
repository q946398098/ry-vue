package com.ruoyi.blog.domain;

import java.util.Date;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import com.ruoyi.common.annotation.Excel;
import com.ruoyi.common.core.domain.BaseEntity;

/**
 * 【请填写功能名称】对象 ARTICLE_CATEGORY
 * 
 * @author ruoyi
 * @date 2025-03-21
 */
public class ArticleCategory extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    /** $column.columnComment */
    private Long cdArticleCategory;

    /** $column.columnComment */
    @Excel(name = "${comment}", readConverterExp = "$column.readConverterExp()")
    private String dsArticleCategory;

    /** $column.columnComment */
    @Excel(name = "${comment}", readConverterExp = "$column.readConverterExp()")
    private Date dtRecord;

    /** $column.columnComment */
    @Excel(name = "${comment}", readConverterExp = "$column.readConverterExp()")
    private Date dtDeactivated;

    public void setCdArticleCategory(Long cdArticleCategory) 
    {
        this.cdArticleCategory = cdArticleCategory;
    }

    public Long getCdArticleCategory() 
    {
        return cdArticleCategory;
    }

    public void setDsArticleCategory(String dsArticleCategory) 
    {
        this.dsArticleCategory = dsArticleCategory;
    }

    public String getDsArticleCategory() 
    {
        return dsArticleCategory;
    }

    public void setDtRecord(Date dtRecord) 
    {
        this.dtRecord = dtRecord;
    }

    public Date getDtRecord() 
    {
        return dtRecord;
    }

    public void setDtDeactivated(Date dtDeactivated) 
    {
        this.dtDeactivated = dtDeactivated;
    }

    public Date getDtDeactivated() 
    {
        return dtDeactivated;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this,ToStringStyle.MULTI_LINE_STYLE)
            .append("cdArticleCategory", getCdArticleCategory())
            .append("dsArticleCategory", getDsArticleCategory())
            .append("dtRecord", getDtRecord())
            .append("dtDeactivated", getDtDeactivated())
            .toString();
    }
}
