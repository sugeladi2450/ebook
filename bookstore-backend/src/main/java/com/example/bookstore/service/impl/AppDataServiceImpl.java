package com.example.bookstore.service.impl;

import com.example.bookstore.dto.AppDataResponse;
import com.example.bookstore.service.AppDataService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppDataServiceImpl implements AppDataService {
    @Override
    public AppDataResponse getAppData() {
        return new AppDataResponse(
                new AppDataResponse.Site(
                        "电子书店",
                        "© 2026 电子书店 · All rights reserved.",
                        "/images/logo.jpg"
                ),
                List.of(
                        new AppDataResponse.NavigationItem("书籍", "/"),
                        new AppDataResponse.NavigationItem("购物车", "/cart"),
                        new AppDataResponse.NavigationItem("订单", "/orders"),
                        new AppDataResponse.NavigationItem("我的", "/profile"),
                        new AppDataResponse.NavigationItem("登录", "/login")
                ),
                new AppDataResponse.HomePage(
                        "书籍列表",
                        "精选电子书推荐：点击书名可查看详情。",
                        "搜索书籍/作者/ISBN",
                        "🔍 搜索",
                        "支持网格自适应"
                ),
                new AppDataResponse.DetailPage(
                        "封面预览",
                        "返回书籍列表",
                        "价格",
                        "内容简介",
                        "加入购物车",
                        "立即购买"
                ),
                new AppDataResponse.CartPage(
                        "购物车",
                        "勾选商品后可进行结算。",
                        "全选",
                        "总计",
                        "去结算"
                ),
                new AppDataResponse.OrdersPage(
                        "订单",
                        "查看你的订单记录与状态信息。"
                ),
                new AppDataResponse.ProfilePage(
                        "我的",
                        "管理个人信息、收货地址与账户安全设置。",
                        new AppDataResponse.UserCard(
                                "用户信息",
                                "查看你的基础资料与账号信息。",
                                "小明同学",
                                "138****0000",
                                "email@example.com",
                                "编辑资料",
                                "保存资料"
                        ),
                        new AppDataResponse.AddressCard(
                                "收货地址",
                                "用于下单时快速选择配送信息。",
                                "新增地址"
                        ),
                        List.of(
                                new AppDataResponse.Address(
                                        "address-1",
                                        "张三",
                                        "phone1",
                                        "默认",
                                        "address1"
                                ),
                                new AppDataResponse.Address(
                                        "address-2",
                                        "李四",
                                        "phone2",
                                        null,
                                        "address2"
                                )
                        ),
                        new AppDataResponse.SettingsCard(
                                "账户设置",
                                "管理账号安全与绑定信息。"
                        ),
                        List.of(
                                new AppDataResponse.Setting(
                                        "password",
                                        "修改密码",
                                        "建议定期更新密码以提高安全性",
                                        "/profile",
                                        false
                                ),
                                new AppDataResponse.Setting(
                                        "binding",
                                        "绑定手机号 / 邮箱",
                                        "用于登录与接收通知",
                                        "/profile",
                                        false
                                ),
                                new AppDataResponse.Setting(
                                        "logout",
                                        "退出登录",
                                        "退出后将返回登录页",
                                        "/login",
                                        true
                                )
                        )
                ),
                new AppDataResponse.LoginPage(
                        "欢迎回来",
                        "登录后可同步购物车与订单信息，并在“我的”页面管理账户。",
                        List.of(
                                "登录后可同步购物车与订单信息",
                                "如需管理账户信息，请前往“我的”页面"
                        ),
                        "账号登录",
                        "请输入账号与密码以继续",
                        "账号",
                        "手机号 / 邮箱 / 用户名",
                        "支持手机号、邮箱或用户名登录",
                        "密码",
                        "请输入密码",
                        "请妥善保管你的密码",
                        "登录",
                        "还没有账号？去注册"
                ),
                new AppDataResponse.RegisterPage(
                        "创建账号",
                        "注册后即可同步购物车与订单信息，继续你的阅读选购。",
                        List.of(
                                "用户名用于登录，请使用容易记住的名称",
                                "密码会进行加密存储，不会以明文保存"
                        ),
                        "用户注册",
                        "请填写用户名并设置登录密码",
                        "用户名",
                        "请输入用户名",
                        "用户名不能为空，最长 64 个字符",
                        "登录密码",
                        "请输入登录密码",
                        "密码至少 6 位",
                        "确认密码",
                        "请再次输入登录密码",
                        "两次输入需要保持一致",
                        "注册",
                        "已有账号？去登录"
                ),
                List.of(
                        new AppDataResponse.Banner(
                                "banner-1",
                                "/images/banners/banner-1.jpg",
                                "书籍推荐 Banner 1"
                        ),
                        new AppDataResponse.Banner(
                                "banner-2",
                                "/images/banners/banner-2.jpg",
                                "书籍推荐 Banner 2"
                        ),
                        new AppDataResponse.Banner(
                                "banner-3",
                                "/images/banners/banner-3.jpg",
                                "书籍推荐 Banner 3"
                        ),
                        new AppDataResponse.Banner(
                                "banner-4",
                                "/images/banners/banner-4.jpg",
                                "书籍推荐 Banner 4"
                        )
                )
        );
    }
}
