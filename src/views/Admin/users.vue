<template>
   <div>
     <el-table :data="nowTableData" border style="width: 100%">
      <el-table-column prop="userHeader" label="用户头像">
        <template slot-scope="scope">
          <img class="userHeader" :src="scope.row.userHeader" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="date" label="注册日期"></el-table-column>
      <el-table-column prop="username" label="用户姓名"></el-table-column>
      <el-table-column prop="email" label="用户邮箱"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size='small' @click="handleToFreeze(scope.row)">{{scope.row.isFreeze ? '已冻结' : '未冻结'}}</el-button>
          <el-button size='small' type="danger" @click="handleToDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="page" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5,10,15]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length"></el-pagination>
   </div>
</template>

<script>
export default {
  data() {
    return {
      tableData:[],
      currentPage:1,
      pagesize: 10
    };
  },
  mounted(){
    this.getUserList()
  },
  computed:{
    nowTableData(){
      return this.tableData.slice((this.currentPage - 1) * this.pagesize, this.currentPage*this.pagesize) || []
    }
  },
  methods:{
    handleSizeChange(val){
      this.pagesize = val
    },
    handleCurrentChange(val){
      this.currentPage = val
    },
    getUserList(){
      this.$http.get('/api/userList').then(res => {
        if (res.data.status == 0) {
          this.tableData = res.data.data.userList
        } else {
          this.tableData = []
        }
      })
    },
    handleToFreeze(val){
      let params = {}
      params.email = val.email
      params.isFreeze = !val.isFreeze
      this.$http.post('/api/updateFreeze',params).then(res => {
        if (res.data.status == 0) {
          this.$message.success(res.data.msg)
          this.getUserList()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    handleToDelete(val){
      this.$http.post('/api/deleteUser',{email: val.email}).then(res => {
        if (res.data.status == 0) {
          this.$message.success(res.data.msg)
          this.getUserList()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  }
}
</script>

<style scoped lang='scss'>
  .page{
    margin-top: 20px;
  }
  .userHeader{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
  }
</style>