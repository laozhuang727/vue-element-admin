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
      this.addTrainDataForm = {type: '', createTime: ''}
      this.addTrainDataDialogFormVisible = true
    },
    querySearch: function () {

    },
    handleIconClick: function () {
      console.log(this.searchText)
      this.loadData(1)
    },
    submitForm: function (formName) {
      var valResult
      this.$refs[formName].validate((valid) => {
        if (valid) {
          valResult = valid
        } else {
          valResult = valid
          console.log('error submit!!');
        }
      });

      return valResult
    },
    addTrainData: function () {
      if (this.submitForm('addTrainDataForm') === false)
        return;

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
      var validateResult = this.submitForm('editTrainDataForm')

      if (validateResult == false)
        return;
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
      calendarTypeOptions: [
        {value: 'law', label: '法律'},
        {value: 'tax', label: '交税'},
        {value: 'science', label: '科教'},
        {value: 'other', label: '其他'}
      ],
      rules: {
        title: [
          {required: true, message: '请输入标题', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ]
      }
    };
  },

}
