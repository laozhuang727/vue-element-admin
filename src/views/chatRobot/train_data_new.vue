<template>
  <div class="app-container calendar-list-container">
    <el-row>
      <el-autocomplete popper-class="my-autocomplete" name="title" custom-item="my-item-zh" placeholder="请输入内容"
                       icon="search" :on-icon-click="handleIconClick" v-model="searchText"></el-autocomplete>
      <el-button type="primary" icon="plus" @click="showAddTrainDataDialog"></el-button>
    </el-row>

    <el-table :data="tableData" border stripe style="width: 100%" :default-sort="{prop: 'name', order: 'ascending'}"
              @sort-change="handleSortChange">
      <el-table-column prop="id" label="编号" sortable width="100">
      </el-table-column>
      <el-table-column prop="title" label="标题" sortable width="180">
      </el-table-column>
      <el-table-column prop="content" label="训练文本">
      </el-table-column>
      <el-table-column prop="status" label="状态">
      </el-table-column>
      <el-table-column prop="createTime" label="训练时间">
      </el-table-column>
      <el-table-column prop="log" label="日志">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="primary" icon="edit" @click.native.prevent="showEditConformMessageDialog(scope.$index)">
          </el-button>
          <el-button type="primary" icon="delete" @click.native.prevent="showDeleteConformMessageDialog(scope.$index)">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="total,sizes,prev,pager,next,jumper" :total="totalPage" :current-page="currentPage"
                   :page-size="pageSize" @size-change="setsize" @current-change="pagechange">
    </el-pagination>
    <el-dialog title="新增训练数据" :visible.sync="addTrainDataDialogFormVisible">
      <el-form class="small-space" :model="addTrainDataForm" label-position="left" label-width="70px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item label="标题">
          <el-input v-model="addTrainDataForm.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="训练文本">
          <el-input v-model="addTrainDataForm.content" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-input v-model="addTrainDataForm.status" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select class="filter-item" v-model="addTrainDataForm.type" placeholder="请选择">
            <el-option
              v-for="item in calendarTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="训练时间">
          <el-date-picker v-model="addTrainDataForm.createTime" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="日志">
          <el-input v-model="addTrainDataForm.log" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addTrainDataDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTrainData">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑品类" :visible.sync="editTrainDataDialogFormVisible">
      <el-form class="small-space" :model="editTrainDataForm" label-position="left" label-width="70px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item label="标题">
          <el-input v-model="editTrainDataForm.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="训练文本">
          <el-input v-model="editTrainDataForm.content" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="editTrainDataForm.status" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select class="filter-item" v-model="editTrainDataForm.type" placeholder="请选择">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name"
                       :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="训练时间">
          <el-date-picker v-model="editTrainDataForm.createTime" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="日志">
          <el-input v-model="editTrainDataForm.log" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editTrainDataDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editTrainData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import $ from 'jquery'
  import ElRow from "element-ui/packages/row/src/row";



  export default {
    components: {ElRow},
    methods: {
      loadData: function (page) {
        var scope = this;
        page = page || this.currentPage || 1
        if (!scope.pageSize) {
          scope.pageSize = 10
        }
        if (!scope.searchOrder) {
          scope.searchOrder = 'ascending'
        }
        if (!scope.searchText) {
          scope.searchText = ''
        }
        $.ajax({
          url: './api/trainData/search_all?page=' + page + '&pageSize=' + this.pageSize + '&searchOrder=' + scope.searchOrder.toUpperCase() + '&searchText=' + scope.searchText,
          success: function (data) {
            console.log(data)

            scope.tableData = data.data.list
            scope.totalPage = data.data.totalCount
          }
        })
      },
      pagechange: function (page) {
        this.currentPage = page
        this.loadData(this.currentPage)
      },
      setsize: function (size) {
        this.pageSize = size
        this.loadData(1)
      },
      handleSortChange: function (event) {
        this.searchOrder = event.order
        this.loadData(1)
      },
      showAddTrainDataDialog: function () {
        this.addTrainDataForm = {type:'',createTime:''}
        this.addTrainDataDialogFormVisible = true
      },
      querySearch: function () {

      },
      handleIconClick: function () {
        console.log(this.searchText)
        this.loadData(1)
      },
      addTrainData: function () {
        var scope = this
        $.ajax({
          url: './api/trainData/create',
          data: {
            title: this.addTrainDataForm.title,
            content: this.addTrainDataForm.content,
            status: this.addTrainDataForm.status,
            type: this.addTrainDataForm.type,
//            createTime: this.addTrainDataForm.createTime,
            createTime: +new Date(),
            log: this.addTrainDataForm.log
          },
          method: 'post',
          success: function (data) {
            scope.addTrainDataDialogFormVisible = false
            scope.$message({
              type: 'success',
              message: '新增成功'
            })
            scope.loadData()
          }
        })
      },
      showEditConformMessageDialog: function (index) {
        this.editTrainDataForm = Object.assign({}, this.tableData[index])
        this.editTrainDataDialogFormVisible = true
      },
      editTrainData: function () {
        var scope = this
        $.ajax({
          url: './api/trainData/update',
          data: {
            id: this.editTrainDataForm.id,
            title: this.editTrainDataForm.title,
            content: this.editTrainDataForm.content,
            status: this.editTrainDataForm.status,
            type: this.editTrainDataForm.type,
            createTime: this.editTrainDataForm.createTime,
            log: this.editTrainDataForm.log
          },
          method: 'post',
          success: function (data) {
            scope.editTrainDataDialogFormVisible = false
            scope.$message({
              type: 'success',
              message: '更新成功'
            })
            scope.loadData()
          }
        })
      },
      showDeleteConformMessageDialog: function (index) {
        var scope = this
        this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $.ajax({
            url: './api/trainData/delete',
            method: 'post',
            data: {
              id: scope.tableData[index].id
            },
            success: function (data) {
              scope.$message({
                type: 'success',
                message: '删除成功'
              })
              scope.loadData()
            }
          })
        })
      }
    },
    data() {
      this.loadData(1)
      return {
        searchText: '',
        tableData: [],
        totalPage: 0,
        pageSize: 10,
        currentPage: 1,
        searchSort: 'ascending',
        addTrainDataDialogFormVisible: false,
        addTrainDataForm: {},
        editTrainDataDialogFormVisible: false,
        editTrainDataForm: {},
        calendarTypeOptions : [
          {value: 'law', label: '法律'},
          {value: 'tax', label: '交税'},
          {value: 'science', label: '科教'},
          {value: 'other', label: '其他'}
        ],
      };
    }
  }

</script>

<style>
  .el-pagination {
    margin-top: 20px;
  }
</style>
