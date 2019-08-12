import Vue from 'vue'
// 第三方组件
// 搜索
import {
    // 标签栏
    Tabbar,
    TabbarItem,
    // 图标
    Icon,
    // 搜索
    Search,
    // layout布局
    Row,
    Col,
    // 按钮
    Button,
    // Sticky 粘性布局
    Sticky,
    // 轮播
    Swipe,
    SwipeItem,
    // 宫格
    Grid,
    GridItem,
    // 图片
    Image,
    // 导航栏
    NavBar,
    // 标签页
    Tab,
    Tabs,
    // 下拉菜单
    DropdownMenu,
    DropdownItem,
    // 卡片
    Card,
    // 步进器
    Stepper,
    // 商品导航
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton,
    // 分割线
    Divider,
    // 弹出框
    Dialog,
    // 侧边导航
    Sidebar,
    SidebarItem,
    // 输入框
    Field,
    // 滑块
    Slider,
    // 单选框
    RadioGroup,
    Radio,
    // 复选框
    Checkbox,
    CheckboxGroup,
    // 密码输入框
    PasswordInput,
    NumberKeyboard,
    // 倒计时
    CountDown
} from 'vant';

export default () => {
    Vue.use(Tabbar).use(TabbarItem)
        .use(Icon)
        .use(Search)
        .use(Row).use(Col)
        .use(Button)
        .use(Sticky)
        .use(Swipe).use(SwipeItem)
        .use(Grid).use(GridItem)
        .use(Image)
        .use(NavBar)
        .use(Tab).use(Tabs)
        .use(DropdownMenu).use(DropdownItem)
        .use(Card)
        .use(Stepper)
        .use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton)
        .use(Divider)
        .use(Dialog)
        .use(Sidebar).use(SidebarItem)
        .use(Field)
        .use(Slider)
        .use(Radio).use(RadioGroup)
        .use(Checkbox).use(CheckboxGroup)
        .use(PasswordInput).use(NumberKeyboard)
        .use(CountDown);
}