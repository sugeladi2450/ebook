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
    password varchar(128) not null,
    nickname varchar(255) null,
    balance  bigint       not null default 0
);

create table book
(
    id          bigint auto_increment primary key,
    author      text         null,
    cover       text         null,
    description text         null,
    price       int          null,
    title       varchar(255) null,
    sales       int          null default 0
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

insert into users(username, password, nickname, balance)
values ('admin', 'admin123', 'admin', 100000000);

insert into book(author, cover, description, price, title, sales)
values ('[英] 乔治·奥威尔',
        'https://img3m4.ddimg.cn/96/20/25215594-2_u_11.jpg',
        '《1984》是一部杰出的政治寓言小说，也是一部幻想小说。作品刻画了人类在极权主义社会的生存状态。',
        2800,
        '1984',
        0),
       ('[美] Stanley B. Lippman / Josée Lajoie / Barbara E. Moo',
        'https://img3m5.ddimg.cn/18/16/11186350875-1_u_1.jpg',
        'C++ 经典教程，基于 C++11 标准进行了全面而彻底的内容更新。',
        12800,
        'C++ Primer 中文版（第 5 版）',
        0),
       ('[美] Cay S. Horstmann',
        'https://img3m8.ddimg.cn/7/0/29411818-1_u_28.jpg',
        '伴随着 Java 的成长，《Java 核心技术》得到广大 Java 程序设计人员的青睐。',
        14900,
        'Java 核心技术·卷 I（原书第 12 版）',
        0),
       ('[美] Y. Daniel Liang',
        'https://img3m9.ddimg.cn/85/16/25104109-1_u_3.jpg',
        'Java 语言经典教材，主要介绍程序设计基础、面向对象编程、数据结构和算法等内容。',
        8500,
        'Java 语言程序设计（基础篇 原书第 10 版）',
        0),
       ('任洪彩',
        'https://img3m9.ddimg.cn/21/0/28986429-1_u_6.jpg',
        '《Go 专家编程》深入讲解 Go 语言常见特性的内部机制和实现方式。',
        10800,
        'Go 专家编程',
        0);

insert into cart_item(user_id, book_id, number)
values (1, 1, 1),
       (1, 3, 1);
