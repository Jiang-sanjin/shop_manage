<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-table :data="rightsList" border stripe style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column label="权限等级">
          <template v-slot="scope">
            <el-tag v-if="scope.row.level==='0'">一级</el-tag>
            <el-tag v-if="scope.row.level==='1'" type="success">二级</el-tag>
            <el-tag v-if="scope.row.level==='2'" type="warning">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //列表形式的权限
      rightsList: []
    };
  },
  created() {
    this.getRightsList();
  },
  methods: {
    async getRightsList() {
      const { data: res } = await this.$http.get("rights/list");
      //如果返回状态为异常状态则报错并返回
      if (res.meta.status !== 200)
        return this.$message.error("获取权限列表失败");
      //如果返回状态正常，将请求的数据保存在data中
      this.rightsList = res.data;
    }
  }
};
</script>

<style lang="less" scoped>
</style>