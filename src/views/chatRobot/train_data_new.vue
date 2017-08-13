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
          <el-button type="danger" icon="delete" @click.native.prevent="showDeleteConformMessageDialog(scope.$index)">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="total,sizes,prev,pager,next,jumper" :total="totalPage" :current-page="currentPage"
                   :page-size="pageSize" @size-change="setsize" @current-change="pagechange">
    </el-pagination>
    <el-dialog title="新增训练数据" :visible.sync="addTrainDataDialogFormVisible">
      <el-form class="small-space" :model="addTrainDataForm" :rules="rules" ref="addTrainDataForm" label-position="left"
               label-width="70px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item label="标题" prop="title">
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
            <el-option v-for="item in calendarTypeOptions" :key="item.value"
                       :label="item.label" :value="item.value">
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
      <el-form class="small-space" :model="editTrainDataForm" :rules="rules" ref="editTrainDataForm"
               label-position="left" label-width="70px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item label="标题" prop="title">
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
            <el-option v-for="item in calendarTypeOptions" :key="item.value"
                       :label="item.label" :value="item.value">
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
  //把Vue单个文件，把js抽取出去
  import trainDataJs from "./trainData.js"
  export default {
    ...trainDataJs
  }


</script>

<style>
  .el-pagination {
    margin-top: 20px;
  }

  .el-row {
    margin-bottom: 10px;
  }
</style>
