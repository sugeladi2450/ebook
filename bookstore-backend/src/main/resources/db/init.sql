drop database if exists bookstore;

create database bookstore
    default character set utf8mb4
    collate utf8mb4_unicode_ci;

use bookstore;

set names utf8mb4;

create table users
(
    id       bigint auto_increment primary key,
    username varchar(64)  not null unique,
    password varchar(255) not null,
    nickname varchar(255) null,
    email    varchar(255) null,
    phone    varchar(32)  null,
    balance  bigint       not null default 0
);

create table book
(
    id           bigint auto_increment primary key,
    title        varchar(255) null,
    author       text         null,
    translator   varchar(255) null,
    isbn         varchar(64)  null,
    tag          varchar(64)  null,
    cover        text         null,
    publish_line varchar(255) null,
    list_desc    text         null,
    intro        text         null,
    intro2       text         null,
    description  text         null,
    price        int          null,
    sales        int          null default 0
);

create table cart_item
(
    id      bigint auto_increment primary key,
    user_id bigint not null,
    book_id bigint not null,
    number  int    not null default 1,
    constraint fk_cart_user foreign key (user_id) references users (id),
    constraint fk_cart_book foreign key (book_id) references book (id),
    constraint uq_cart_user_book unique (user_id, book_id)
);

create table shipping_address
(
    id              bigint auto_increment primary key,
    user_id         bigint       not null,
    receiver        varchar(64)  not null,
    phone           varchar(32)  not null,
    province        varchar(64)  not null,
    city            varchar(64)  not null,
    district        varchar(64)  not null,
    detail          varchar(255) not null,
    default_address boolean      not null default false,
    constraint fk_address_user foreign key (user_id) references users (id)
);

create table order_tbl
(
    id         bigint auto_increment primary key,
    user_id    bigint      not null,
    created_at datetime(6) not null,
    amount     bigint      not null,
    status     varchar(32) not null,
    constraint fk_order_user foreign key (user_id) references users (id)
);

create table order_item
(
    id       bigint auto_increment primary key,
    order_id bigint not null,
    book_id  bigint not null,
    number   int    not null,
    price    int    not null,
    constraint fk_order_item_order foreign key (order_id) references order_tbl (id),
    constraint fk_order_item_book foreign key (book_id) references book (id)
);

insert into users(username, password, nickname, email, phone, balance)
values ('admin',
        'pbkdf2$120000$8L6OkJXV5JT/ZnhyDj7ZXg==$AAbyIhn0lskeqG0f+0fHEHyHOOS3EwiPT2tMV7dHF0c=',
        'admin',
        'admin@example.com',
        '13800000000',
        100000000);

insert into book(title, author, translator, isbn, tag, cover, publish_line, list_desc, intro, intro2, description, price, sales)
values ('1984',
        '[英] 乔治·奥威尔',
        null,
        null,
        '文学 / 经典小说',
        'https://img3m4.ddimg.cn/96/20/25215594-2_u_11.jpg',
        '经典反乌托邦小说',
        '一部杰出的政治寓言小说，刻画了人类在极权主义社会中的生存状态。',
        '《1984》是一部杰出的政治寓言小说，也是一部幻想小说。作品刻画了人类在极权主义社会的生存状态。',
        '小说以冷峻的笔触描绘权力、语言与记忆被操控后的世界，是反乌托邦文学中的重要作品。',
        '《1984》是一部杰出的政治寓言小说，也是一部幻想小说。作品刻画了人类在极权主义社会的生存状态。',
        2800,
        0),
       ('C++ Primer 中文版（第 5 版）',
        '[美] Stanley B. Lippman / Josée Lajoie / Barbara E. Moo',
        null,
        null,
        '计算机 / C++',
        'https://img3m5.ddimg.cn/18/16/11186350875-1_u_1.jpg',
        'C++ 经典教程',
        'C++ 经典教程，基于 C++11 标准进行了全面而彻底的内容更新。',
        'C++ 经典教程，基于 C++11 标准进行了全面而彻底的内容更新。',
        '本书系统讲解 C++ 基础、标准库、类、泛型算法与面向对象设计，适合希望扎实掌握现代 C++ 的读者。',
        'C++ 经典教程，基于 C++11 标准进行了全面而彻底的内容更新。',
        12800,
        0),
       ('Java 核心技术·卷 I（原书第 12 版）',
        '[美] Cay S. Horstmann',
        null,
        null,
        '计算机 / Java',
        'https://img3m8.ddimg.cn/7/0/29411818-1_u_28.jpg',
        'Java 程序设计经典书',
        '伴随着 Java 的成长，《Java 核心技术》得到广大 Java 程序设计人员的青睐。',
        '伴随着 Java 的成长，《Java 核心技术》得到广大 Java 程序设计人员的青睐。',
        '本书覆盖 Java 语言基础、对象与类、继承、接口、集合、并发等核心主题，是 Java 入门与进阶的重要参考。',
        '伴随着 Java 的成长，《Java 核心技术》得到广大 Java 程序设计人员的青睐。',
        14900,
        0),
       ('Java 语言程序设计（基础篇 原书第 10 版）',
        '[美] Y. Daniel Liang',
        null,
        null,
        '计算机 / 程序设计',
        'https://img3m9.ddimg.cn/85/16/25104109-1_u_3.jpg',
        'Java 基础教材',
        'Java 语言经典教材，介绍程序设计基础、面向对象编程、数据结构和算法等内容。',
        'Java 语言经典教材，主要介绍程序设计基础、面向对象编程、数据结构和算法等内容。',
        '本书结构清晰，配有大量示例与练习，适合系统学习 Java 语言与程序设计基础。',
        'Java 语言经典教材，主要介绍程序设计基础、面向对象编程、数据结构和算法等内容。',
        8500,
        0),
       ('Go 专家编程',
        '任洪彩',
        null,
        null,
        '计算机 / Go',
        'https://img3m9.ddimg.cn/21/0/28986429-1_u_6.jpg',
        'Go 语言进阶',
        '深入讲解 Go 语言常见特性的内部机制和实现方式。',
        '《Go 专家编程》深入讲解 Go 语言常见特性的内部机制和实现方式。',
        '本书面向有一定 Go 语言基础的读者，帮助理解语言特性背后的设计思路与运行机制。',
        '《Go 专家编程》深入讲解 Go 语言常见特性的内部机制和实现方式。',
        10800,
        0),
       ('河的第三条岸',
        '[巴西] 若昂·吉马良斯·罗萨',
        '游雨频',
        '9787208194601',
        '文学 / 短篇小说',
        '/images/books/book-1.jpg',
        '出版时间：2025年6月 · 页数：306页',
        '精选 19 篇短篇小说，魔幻现实主义气质浓烈；同名名篇写尽荒诞与悲壮。',
        '本书精选了罗萨巅峰时期的 19 篇短篇小说，以巴西东北腹地为舞台，构建出充满魔幻现实主义色彩的神秘世界。其中同名名篇《河的第三条岸》讲述一位父亲离家上船、从此永不上岸的故事：荒诞又悲壮，像一道无法解释的生命谜题。',
        '作者通晓 20 多门语言，文字爆发力极强，擅长把日常瞬间写成“太阳重生”的奇迹，被誉为“语言的冒险大师”。',
        '本书精选了罗萨巅峰时期的 19 篇短篇小说，以巴西东北腹地为舞台，构建出充满魔幻现实主义色彩的神秘世界。',
        5600,
        0),
       ('亲密有间：有边界感的伴侣更长久的关系',
        '[美] 亨利·克劳德 / 约翰·汤森德',
        '林思语',
        '9787521775709',
        '心理学 / 亲密关系',
        '/images/books/book-2.jpg',
        '出版时间：2025年10月 · 页数：296页',
        '从临床心理学视角讲清“边界不明”的冲突根源，给出关系修复的可执行方案。',
        '本书从临床心理学角度指出：亲密关系中的控制、内疚与情绪消耗，往往源于边界不明。',
        '作者提炼“边界十大定律”与多类冲突解决方案，帮助你在亲密中承担责任、守护空间，关系更长久。',
        '本书从临床心理学视角讲清“边界不明”的冲突根源，给出关系修复的可执行方案。',
        5900,
        0),
       ('幸福博弈论：用理性思维赢取更好生活',
        '[印] 考希克·巴苏',
        '苏京春',
        '9787521778472',
        '经济学 / 思维方法',
        '/images/books/book-3.jpg',
        '出版时间：2025年10月 · 页数：240页',
        '把博弈论与经济学原理用思想实验讲透，用理性决策把选择推向“更优解”。',
        '把博弈论与经济学原理融入日常选择：从人际焦虑到职场决策，用思想实验拆解逻辑难题。',
        '教你站在对方角度思考，让每一次选择更接近最优解，收获更稳定的幸福感。',
        '把博弈论与经济学原理用思想实验讲透，用理性决策把选择推向“更优解”。',
        6900,
        0),
       ('人间蒸发',
        '[美] 劳拉·戴夫',
        '冯新平',
        '9787522524245',
        '小说 / 悬疑',
        '/images/books/book-4.jpg',
        '出版时间：2023年12月 · 页数：304页',
        '家庭伦理×悬疑：丈夫失踪只留“保护她”的便条，真相与亲情在联手追寻中浮出水面。',
        '丈夫欧文在公司涉嫌经济犯罪前夕离奇失踪，只留“保护她”三个字。汉娜与继女贝莉被迫联手追寻真相。',
        '在追寻过程中，谎言层层揭开，也意外重建了超越血缘的亲密亲情。',
        '家庭伦理×悬疑：丈夫失踪只留“保护她”的便条，真相与亲情在联手追寻中浮出水面。',
        4980,
        0);