import Vue from 'vue'
import { Button, Form, FormItem, Input, Message,Container, Header, Aside, 
Main, Menu, Submenu, MenuItem, Breadcrumb, BreadcrumbItem, Card, Row, Col, 
Table, TableColumn, Switch, Tooltip, Pagination, Dialog, MessageBox, Tag,
Tree, Select,Option , Cascader, Alert, TabPane, Tabs} from 'element-ui'


Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)

Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)

Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)

Vue.use(Card)
Vue.use(Col)
Vue.use(Row)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)

Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)


Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)

Vue.use(Alert)
Vue.use(TabPane)
Vue.use(Tabs)



// 弹框提示组件
Vue.prototype.$message = Message

// 弹框提示组件
Vue.prototype.$confirm = MessageBox.confirm