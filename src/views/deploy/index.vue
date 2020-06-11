<template>
  <div class="deploy_main">
    <h2> Your Deployments</h2>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Deployment name">
        <template slot-scope="scope">
          <router-link to="/"> {{ scope.row.name }}</router-link>
        </template>
      </el-table-column>
      <!-- <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getList, getDeploymentsList } from '@/api/table'

  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        list: null,
        listLoading: true
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      // fetchData() {
      //   this.listLoading = true
      //   getList().then(response => {
      //     console.log(response)
      //     this.list = response.data.items.slice(-6)
      //     this.listLoading = false
      //   })
      // }
      fetchData() {
        this.listLoading = true
        getDeploymentsList().then(response => {
          let data = JSON.parse(response);
          console.log(data)
          this.list = data.deployments
          this.listLoading = false
        })
      }
    }
  }
</script>

<style scoped>
  .deploy_main {
    padding-top: 2%;
    padding-left: 2%;
    padding-right: 2%;
  }
</style>