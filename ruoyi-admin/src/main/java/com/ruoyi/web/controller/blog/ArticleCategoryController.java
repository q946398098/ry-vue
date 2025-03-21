package com.ruoyi.web.controller.blog;

import java.util.List;
import javax.servlet.http.HttpServletResponse;

import com.ruoyi.blog.domain.ArticleCategory;
import com.ruoyi.blog.service.IArticleCategoryService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ruoyi.common.annotation.Log;
import com.ruoyi.common.core.controller.BaseController;
import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.common.enums.BusinessType;
import com.ruoyi.common.utils.poi.ExcelUtil;
import com.ruoyi.common.core.page.TableDataInfo;

/**
 * 【请填写功能名称】Controller
 * 
 * @author ruoyi
 * @date 2025-03-21
 */
@RestController
@RequestMapping("blog/article/category")
public class ArticleCategoryController extends BaseController
{
    @Autowired
    private IArticleCategoryService articleCategoryService;

    /**
     * 查询【请填写功能名称】列表
     */
    @PreAuthorize("@ss.hasPermi('blog:blog:article:category:list')")
    @GetMapping("/list")
    public TableDataInfo list(ArticleCategory articleCategory)
    {
        startPage();
        List<ArticleCategory> list = articleCategoryService.selectArticleCategoryList(articleCategory);
        return getDataTable(list);
    }

    /**
     * 导出【请填写功能名称】列表
     */
    @PreAuthorize("@ss.hasPermi('blog:article:category:export')")
    @Log(title = "【请填写功能名称】", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(HttpServletResponse response, ArticleCategory articleCategory)
    {
        List<ArticleCategory> list = articleCategoryService.selectArticleCategoryList(articleCategory);
        ExcelUtil<ArticleCategory> util = new ExcelUtil<ArticleCategory>(ArticleCategory.class);
        util.exportExcel(response, list, "【请填写功能名称】数据");
    }

    /**
     * 获取【请填写功能名称】详细信息
     */
    @PreAuthorize("@ss.hasPermi('blog:article:category:query')")
    @GetMapping(value = "/{cdArticleCategory}")
    public AjaxResult getInfo(@PathVariable("cdArticleCategory") Long cdArticleCategory)
    {
        return success(articleCategoryService.selectArticleCategoryByCdArticleCategory(cdArticleCategory));
    }

    /**
     * 新增【请填写功能名称】
     */
    @PreAuthorize("@ss.hasPermi('blog:article:category:add')")
    @Log(title = "【请填写功能名称】", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody ArticleCategory articleCategory)
    {
        return toAjax(articleCategoryService.insertArticleCategory(articleCategory));
    }

    /**
     * 修改【请填写功能名称】
     */
    @PreAuthorize("@ss.hasPermi('blog:article:category:edit')")
    @Log(title = "【请填写功能名称】", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody ArticleCategory articleCategory)
    {
        return toAjax(articleCategoryService.updateArticleCategory(articleCategory));
    }

    /**
     * 删除【请填写功能名称】
     */
    @PreAuthorize("@ss.hasPermi('blog:article:category:remove')")
    @Log(title = "【请填写功能名称】", businessType = BusinessType.DELETE)
	@DeleteMapping("/{cdArticleCategorys}")
    public AjaxResult remove(@PathVariable Long[] cdArticleCategorys)
    {
        return toAjax(articleCategoryService.deleteArticleCategoryByCdArticleCategorys(cdArticleCategorys));
    }
}
