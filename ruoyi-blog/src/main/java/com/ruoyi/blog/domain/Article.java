package com.ruoyi.blog.domain;

import java.util.Date;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import com.ruoyi.common.annotation.Excel;
import com.ruoyi.common.core.domain.BaseEntity;

/**
 * 【请填写功能名称】对象 ARTICLE
 * 
 * @author ruoyi
 * @date 2025-03-21
 */
public class Article extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    /** $column.columnComment */
    private Long cdArtcile;

    /** $column.columnComment */
    @Excel(name = "${comment}", readConverterExp = "$column.readConverterExp()")
    private String dsArticle;

    /** $column.columnComment */
    @Excel(name = "${comment}", readConverterExp = "$column.readConverterExp()")
    private String dsArticleContent;

    /** url */
    @Excel(name = "url")
    private String dsCoverImgUrl;

    /** $column.columnComment */
    @Excel(name = "${comment}", readConverterExp = "$column.readConverterExp()")
    private Date dtRecord;

    /** $column.columnComment */
    @Excel(name = "${comment}", readConverterExp = "$column.readConverterExp()")
    private Date dtDeactivated;

    public void setCdArtcile(Long cdArtcile) 
    {
        this.cdArtcile = cdArtcile;
    }

    public Long getCdArtcile() 
    {
        return cdArtcile;
    }

    public void setDsArticle(String dsArticle) 
    {
        this.dsArticle = dsArticle;
    }

    public String getDsArticle() 
    {
        return dsArticle;
    }

    public void setDsArticleContent(String dsArticleContent) 
    {
        this.dsArticleContent = dsArticleContent;
    }

    public String getDsArticleContent() 
    {
        return dsArticleContent;
    }

    public void setDsCoverImgUrl(String dsCoverImgUrl) 
    {
        this.dsCoverImgUrl = dsCoverImgUrl;
    }

    public String getDsCoverImgUrl() 
    {
        return dsCoverImgUrl;
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
            .append("cdArtcile", getCdArtcile())
            .append("dsArticle", getDsArticle())
            .append("dsArticleContent", getDsArticleContent())
            .append("dsCoverImgUrl", getDsCoverImgUrl())
            .append("dtRecord", getDtRecord())
            .append("dtDeactivated", getDtDeactivated())
            .toString();
    }
}
