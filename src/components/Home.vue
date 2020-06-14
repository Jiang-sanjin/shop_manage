<template>

    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <div class="header-left">
                <img src="../assets/q.jpg" alt="">
                <span>商店后台管理系统</span>
            </div>
            
            <el-button type="info"  @click="logout">退出</el-button>
        </el-header>
        <!-- 页面主体区 -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse ? '64px' : '200px' ">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <!-- 侧边栏菜单页面 -->     <!-- unique-opened 只允许打开一个子菜单-->
                <el-menu background-color="#185068" text-color="#fff" active-text-color="#409EFF"
                 unique-opened :collapse="isCollapse" :collapse-transition="false" 
                 router :default-active="activePath">   
                    <!-- active-text-color  激活文本颜色-->   <!-- router开启路由模式 -->

                    <!-- 一级菜单 -->    <!-- 通过 v-for 双层循环分别进行一级菜单和二级菜单的渲染 -->
                    <el-submenu :index="item.id + '' " v-for="item in menulist" :key="item.id">
                        <!-- 一级菜单模板区域 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i :class="iconObj[item.id]"></i>
                            <span>{{item.authName}}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item :index=" '/' + sbuItem.path " v-for="sbuItem in item.children" 
                        :key="sbuItem.id" @click="saveNavState('/' + sbuItem.path )">
                            <!-- 图标 -->
                            <i class="el-icon-menu"></i>
                            <span>{{sbuItem.authName}}</span>
                        </el-menu-item>
                    </el-submenu>
                  
                </el-menu>

            </el-aside>
            <!-- 右侧主体内容 -->
            <el-main>
                <!-- 路由占位符 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>

</template>


<script>
export default {
    data() {
        return {
            // 左侧菜单数据
            menulist: [],
            // 图标
            iconObj: {
                '125' : 'iconfont icon-user',
                '103' : 'iconfont icon-tijikongjian',
                '101' : 'iconfont icon-shangpin',
                '102' : 'iconfont icon-danju',
                '145' : 'iconfont icon-baobiao',
            },
            // 判断是否折叠
            isCollapse: false,
            // 被激活的链接地址
            activePath: ''
        }
    },
    created() {  //在实例创建完成后被立即调用
        this.getMenuList()
        this.activePath = window.sessionStorage.getItem('activePath')
    },
    methods: {
        logout() {
            window.sessionStorage.clear()
             // 跳转到登录页
            this.$router.push('/login')
        },
        //获取所有的菜单
        async getMenuList() {
            const {data: res} = await this.$http.get('menus')   //解构赋值
            if( res.meta.status !== 200 ) return this.$message.error(res.meta.msg)
            this.menulist = res.data
            
            // console.log("菜单列表",res)
        },
        // 点击按钮切换折叠与展开
        toggleCollapse(){
            this.isCollapse = ! this.isCollapse
        },
        // 保存链接激活状态
        saveNavState(activePath) {
            window.sessionStorage.setItem('activePath', activePath)
            this.activePath = activePath
        }
    }
}
</script>

<style lang="less" scoped>
.home-container{
    height: 100%;
}
.el-header{
    box-sizing: border-box;
    padding-top: 5px;
    background-color: #21627E;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 20px;
}
.header-left{
    display: flex;
    align-items: center;
}
.header-left>img{
    margin-right: 15px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
}
.el-aside{
    background-color: #185068;
}
.el-aside>.el-menu{
    border-right: none;
}
.el-main{
    background-color: snow;
}
.iconfont{
    margin-right: 10px;
}

.toggle-button{
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    color: cornsilk;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
.el-main{
    background: url(../assets/7.jpg);
    background-size: cover;
}
</style>