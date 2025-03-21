<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="${comment}" prop="dsArticle">
        <el-input
          v-model="queryParams.dsArticle"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="url" prop="dsCoverImgUrl">
        <el-input
          v-model="queryParams.dsCoverImgUrl"
          placeholder="请输入url"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="dtRecord">
        <el-date-picker clearable
          v-model="queryParams.dtRecord"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择${comment}">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="${comment}" prop="dtDeactivated">
        <el-date-picker clearable
          v-model="queryParams.dtDeactivated"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择${comment}">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:ARTICLE:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:ARTICLE:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:ARTICLE:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:ARTICLE:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="ARTICLEList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="${comment}" align="center" prop="cdArtcile" />
      <el-table-column label="${comment}" align="center" prop="dsArticle" />
      <el-table-column label="${comment}" align="center" prop="dsArticleContent" />
      <el-table-column label="url" align="center" prop="dsCoverImgUrl" />
      <el-table-column label="${comment}" align="center" prop="dtRecord" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.dtRecord, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="${comment}" align="center" prop="dtDeactivated" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.dtDeactivated, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:ARTICLE:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:ARTICLE:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改【请填写功能名称】对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="${comment}" prop="dsArticle">
          <el-input v-model="form.dsArticle" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}">
          <editor v-model="form.dsArticleContent" :min-height="192"/>
        </el-form-item>
        <el-form-item label="url" prop="dsCoverImgUrl">
          <el-input v-model="form.dsCoverImgUrl" placeholder="请输入url" />
        </el-form-item>
        <el-form-item label="${comment}" prop="dtRecord">
          <el-date-picker clearable
            v-model="form.dtRecord"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择${comment}">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="${comment}" prop="dtDeactivated">
          <el-date-picker clearable
            v-model="form.dtDeactivated"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择${comment}">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listARTICLE, getARTICLE, delARTICLE, addARTICLE, updateARTICLE } from "@/api/blog/article/Article";

export default {
  name: "ARTICLE",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 【请填写功能名称】表格数据
      ARTICLEList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        dsArticle: null,
        dsArticleContent: null,
        dsCoverImgUrl: null,
        dtRecord: null,
        dtDeactivated: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        dsArticle: [
          { required: true, message: "$comment不能为空", trigger: "blur" }
        ],
        dsArticleContent: [
          { required: true, message: "$comment不能为空", trigger: "blur" }
        ],
        dtRecord: [
          { required: true, message: "$comment不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询【请填写功能名称】列表 */
    getList() {
      this.loading = true;
      listARTICLE(this.queryParams).then(response => {
        this.ARTICLEList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        cdArtcile: null,
        dsArticle: null,
        dsArticleContent: null,
        dsCoverImgUrl: null,
        dtRecord: null,
        dtDeactivated: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.cdArtcile)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加【请填写功能名称】";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const cdArtcile = row.cdArtcile || this.ids
      getARTICLE(cdArtcile).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改【请填写功能名称】";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.cdArtcile != null) {
            updateARTICLE(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addARTICLE(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const cdArtciles = row.cdArtcile || this.ids;
      this.$modal.confirm('是否确认删除【请填写功能名称】编号为"' + cdArtciles + '"的数据项？').then(function() {
        return delARTICLE(cdArtciles);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/ARTICLE/export', {
        ...this.queryParams
      }, `ARTICLE_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
