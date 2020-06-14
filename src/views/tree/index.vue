<template>
  <div class="app-container">
    <!-- <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" /> -->

    <!-- <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="id" border default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">

      <el-tree ref="tree2" :data="data2" :props="defaultProps" :filter-node-method="filterNode" class="filter-tree"
        default-expand-all />
    </el-table> -->
    <el-table :data="tableData1" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <h3>1 device group</h3>
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
          </el-checkbox>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox style="display:block;" v-for="city in cities" :label="city" :key="city">
              {{city}}
            </el-checkbox>
          </el-checkbox-group>
        </template>
      </el-table-column>

      <el-table-column prop="date" label="Group" width="180">
      </el-table-column>
      <el-table-column prop="name" label="Device" width="180">
      </el-table-column>
      <el-table-column prop="address" label="Operation">
      </el-table-column>

      <el-table-column v-show="seen">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">EDIT</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
  const cityOptions = ['上海', '北京', '广州', '深圳'];

  const testData = [{
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          // hasChildren: true,
          // children: [{
          //   id: 6,
          //   date: '2016-06-06',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1519 弄',
          //   },
          //   {
          //   id: 7,
          //   date: '2016-06-07',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1519 弄',
          //   }
          // ]
        }]

  const testData2 = [{
          id: 1,
          label: 'Level one 1',
          children: [{
            id: 4,
            label: 'Level two 1-1',
            children: [{
              id: 9,
              label: 'Level three 1-1-1'
            }, {
              id: 10,
              label: 'Level three 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: 'Level one 2',
          children: [{
            id: 5,
            label: 'Level two 2-1'
          }, {
            id: 6,
            label: 'Level two 2-2'
          }]
        }, {
          id: 3,
          label: 'Level one 3',
          children: [{
            id: 7,
            label: 'Level two 3-1'
          }, {
            id: 8,
            label: 'Level two 3-2'
          }]
        }]

  export default {
    data() {
      return {
        checkAll: false,
        checkedCities: ['上海', '北京'],
        cities: cityOptions,
        isIndeterminate: true,
        seen: true,
        tableData1: testData,
        data2: testData2,
        filterText: '',
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val)
      }
    },

    methods: {
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },

      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },

      load(tree, treeNode, resolve) {
        seen: true,
          setTimeout(() => {
            resolve([
              {
                id: 31,
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
              }, {
                id: 32,
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',

              }
            ])
          }, 1000)
      },

      handleEdit(index, row) {
        console.log(index,row)
      }
    }
  }
</script>