import logoImage from "../assets/images/logo.jpg";
import bannerImage1 from "../assets/images/banners/banner-1.jpg";
import bannerImage2 from "../assets/images/banners/banner-2.jpg";
import bannerImage3 from "../assets/images/banners/banner-3.jpg";
import bannerImage4 from "../assets/images/banners/banner-4.jpg";

export const appConfig = {
  site: {
    name: "电子书店",
    footerText: "© 2026 电子书店 · All rights reserved.",
    logo: logoImage,
  },
  navigation: [
    { label: "书籍", path: "/" },
    { label: "购物车", path: "/cart" },
    { label: "订单", path: "/orders" },
    { label: "我的", path: "/profile" },
    { label: "登录", path: "/login" },
  ],
  homePage: {
    title: "书籍列表",
    subtitle: "精选电子书推荐：点击书名可查看详情。",
    searchPlaceholder: "搜索书籍/作者/ISBN",
    searchButtonText: "搜索",
    gridChipText: "支持网格自适应",
  },
  detailPage: {
    coverHint: "封面预览",
    backText: "返回书籍列表",
    priceLabel: "价格",
    summaryTitle: "内容简介",
    addToCartText: "加入购物车",
    buyNowText: "立即购买",
  },
  cartPage: {
    title: "购物车",
    subtitle: "勾选商品后可进行结算。",
    selectAllText: "全选",
    totalLabel: "总计",
    checkoutText: "去结算",
  },
  ordersPage: {
    title: "订单",
    subtitle: "查看你的订单记录与状态信息。",
  },
  profilePage: {
    title: "我的",
    subtitle: "管理个人信息、收货地址与账户安全设置。",
    userCard: {
      title: "用户信息",
      desc: "查看你的基础资料与账号信息。",
      name: "未设置昵称",
      phone: "未绑定手机号",
      email: "未填写邮箱",
      editText: "编辑资料",
    },
    addressCard: {
      title: "收货地址",
      desc: "用于下单时快速选择配送信息。",
      addText: "新增地址",
    },
    settingsCard: {
      title: "账户设置",
      desc: "管理账号安全设置。",
    },
    settings: [
      {
        id: "password",
        label: "修改密码",
        hint: "建议定期更新密码以提高安全性",
        path: "/profile",
        danger: false,
      },
      {
        id: "logout",
        label: "退出登录",
        hint: "退出后将返回登录页",
        path: "/login",
        danger: true,
      },
    ],
  },
  loginPage: {
    title: "欢迎回来",
    subtitle: "登录后可同步购物车与订单信息，并在“我的”页面管理账户。",
    tips: [
      "登录后可同步购物车与订单信息",
      "如需管理账户信息，请前往“我的”页面",
    ],
    panelTitle: "账号登录",
    panelDesc: "请输入账号与密码以继续",
    accountLabel: "账号",
    accountPlaceholder: "手机号 / 邮箱 / 账号",
    accountHint: "支持手机号、邮箱或账号登录",
    passwordLabel: "密码",
    passwordPlaceholder: "请输入密码",
    passwordHint: "请妥善保管你的密码",
    buttonText: "登录",
    linkText: "还没有账号？去注册",
  },
  registerPage: {
    title: "创建账号",
    subtitle: "注册后即可同步购物车与订单信息，继续你的阅读选购。",
    tips: [
      "账号用于登录，请使用容易记住的名称",
      "密码会进行加密存储，不会以明文保存",
    ],
    panelTitle: "用户注册",
    panelDesc: "请填写账号并设置登录密码",
    usernameLabel: "账号",
    usernamePlaceholder: "请输入账号",
    usernameHint: "账号不能为空，最长 64 个字符",
    passwordLabel: "登录密码",
    passwordPlaceholder: "请输入登录密码",
    passwordHint: "密码至少 6 位",
    confirmPasswordLabel: "确认密码",
    confirmPasswordPlaceholder: "请再次输入登录密码",
    confirmPasswordHint: "两次输入需要保持一致",
    buttonText: "注册",
    loginLinkText: "已有账号？去登录",
  },
  banners: [
    {
      id: "banner-1",
      image: bannerImage1,
      alt: "书籍推荐 Banner 1",
    },
    {
      id: "banner-2",
      image: bannerImage2,
      alt: "书籍推荐 Banner 2",
    },
    {
      id: "banner-3",
      image: bannerImage3,
      alt: "书籍推荐 Banner 3",
    },
    {
      id: "banner-4",
      image: bannerImage4,
      alt: "书籍推荐 Banner 4",
    },
  ],
};
