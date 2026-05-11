import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tag,
  message,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import {
  createAdminBook,
  deleteAdminBook,
  fetchAdminBooks,
  updateAdminBook,
} from "../../services/admin/adminBookService";

function formatCentPrice(price) {
  return `¥ ${(Number(price ?? 0) / 100).toFixed(2)}`;
}

export default function AdminBooksPage({ siteName }) {
  const { user } = useLoaderData();
  const [form] = Form.useForm();
  const [books, setBooks] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [deletingBookId, setDeletingBookId] = useState(null);

  usePageTitle(`${siteName} - 书籍管理`);

  const loadBooks = useCallback(async (nextKeyword = keyword) => {
    setLoading(true);
    try {
      const data = await fetchAdminBooks(user.id, nextKeyword.trim());
      setBooks(data ?? []);
    } catch (error) {
      message.error(error.message || "图书列表加载失败");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, [keyword, user.id]);

  useEffect(() => {
    loadBooks(keyword);
  }, [keyword, loadBooks]);

  function openCreateModal() {
    setEditingBook(null);
    form.setFieldsValue({
      title: "",
      author: "",
      cover: "",
      isbn: "",
      stock: 100,
      price: 0,
      tag: "",
    });
    setModalOpen(true);
  }

  function openEditModal(book) {
    setEditingBook(book);
    form.setFieldsValue({
      title: book.title ?? "",
      author: book.author ?? "",
      cover: book.cover ?? "",
      isbn: book.isbn ?? "",
      stock: book.stock ?? 0,
      price: book.price ?? 0,
      tag: book.tag ?? "",
    });
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingBook(null);
    form.resetFields();
  }

  async function handleSubmitBook() {
    let values;
    try {
      values = await form.validateFields();
    } catch {
      return;
    }

    setSubmitting(true);
    try {
      if (editingBook) {
        await updateAdminBook(user.id, editingBook.id, values);
        message.success("图书信息已更新");
      } else {
        await createAdminBook(user.id, values);
        message.success("图书已添加");
      }
      closeModal();
      await loadBooks(keyword);
    } catch (error) {
      message.error(error.message || "保存图书失败");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteBook(book) {
    setDeletingBookId(book.id);
    try {
      await deleteAdminBook(user.id, book.id);
      message.success("图书已删除");
      await loadBooks(keyword);
    } catch (error) {
      message.error(error.message || "删除图书失败");
    } finally {
      setDeletingBookId(null);
    }
  }

  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      width: 92,
      render: (cover, record) => (
        cover ? (
          <Image
            alt={record.title}
            className="admin-book-cover"
            height={68}
            preview={false}
            src={cover}
            width={48}
          />
        ) : (
          <span className="admin-table__muted">无封面</span>
        )
      ),
    },
    {
      title: "书名",
      dataIndex: "title",
      width: 220,
      ellipsis: true,
    },
    {
      title: "作者",
      dataIndex: "author",
      width: 180,
      ellipsis: true,
    },
    {
      title: "ISBN 编号",
      dataIndex: "isbn",
      width: 160,
      ellipsis: true,
      render: (value) => value || "未填写",
    },
    {
      title: "库存量",
      dataIndex: "stock",
      width: 110,
      render: (value) => <Tag color={Number(value ?? 0) > 0 ? "green" : "red"}>{value ?? 0}</Tag>,
    },
    {
      title: "价格",
      dataIndex: "price",
      width: 120,
      render: (value) => formatCentPrice(value),
    },
    {
      title: "分类",
      dataIndex: "tag",
      width: 150,
      ellipsis: true,
      render: (value) => value || "图书",
    },
    {
      title: "操作",
      key: "actions",
      fixed: "right",
      width: 180,
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => openEditModal(record)}>
            编辑
          </Button>
          <Popconfirm
            title="确认删除该图书？"
            description="被购物车或订单引用的图书不能直接删除。"
            okText="删除"
            cancelText="取消"
            okButtonProps={{ danger: true }}
            onConfirm={() => handleDeleteBook(record)}
          >
            <Button danger icon={<DeleteOutlined />} loading={deletingBookId === record.id}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <section className="admin-page" aria-label="书籍管理">
      <header className="admin-page__header">
        <div>
          <h1 className="admin-page__title">书籍管理</h1>
          <p className="admin-page__subtitle">维护数据库中的图书资料、封面地址、ISBN 编号和库存量。</p>
        </div>
        <Space wrap>
          <Input.Search
            allowClear
            className="admin-search"
            enterButton="搜索"
            placeholder="按书名搜索"
            onSearch={(value) => setKeyword(value)}
          />
          <Button icon={<ReloadOutlined />} onClick={() => loadBooks(keyword)}>
            刷新
          </Button>
          <Button icon={<PlusOutlined />} type="primary" onClick={openCreateModal}>
            添加图书
          </Button>
        </Space>
      </header>

      <section className="admin-card" aria-label="图书列表">
        <Table
          columns={columns}
          dataSource={books}
          loading={loading}
          pagination={{
            pageSize: 8,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 本图书`,
          }}
          rowKey="id"
          scroll={{ x: 1120 }}
        />
      </section>

      <Modal
        confirmLoading={submitting}
        destroyOnHidden
        okText={editingBook ? "保存修改" : "确认添加"}
        open={modalOpen}
        title={editingBook ? "编辑图书" : "添加图书"}
        onCancel={closeModal}
        onOk={handleSubmitBook}
      >
        <Form form={form} className="admin-book-form" layout="vertical">
          <Form.Item
            label="书名"
            name="title"
            rules={[
              { required: true, whitespace: true, message: "请输入书名" },
              { max: 255, message: "书名不能超过 255 个字符" },
            ]}
          >
            <Input maxLength={255} placeholder="请输入书名" />
          </Form.Item>

          <Form.Item
            label="作者"
            name="author"
            rules={[
              { required: true, whitespace: true, message: "请输入作者" },
              { max: 255, message: "作者不能超过 255 个字符" },
            ]}
          >
            <Input maxLength={255} placeholder="请输入作者" />
          </Form.Item>

          <Form.Item
            label="封面地址"
            name="cover"
            rules={[{ max: 512, message: "封面地址不能超过 512 个字符" }]}
          >
            <Input maxLength={512} placeholder="例如 /images/books/book-1.jpg 或完整图片 URL" />
          </Form.Item>

          <Form.Item
            label="ISBN 编号"
            name="isbn"
            rules={[{ max: 64, message: "ISBN 不能超过 64 个字符" }]}
          >
            <Input maxLength={64} placeholder="请输入 ISBN 编号" />
          </Form.Item>

          <div className="admin-book-form__grid">
            <Form.Item
              label="库存量"
              name="stock"
              rules={[{ required: true, message: "请输入库存量" }]}
            >
              <InputNumber min={0} precision={0} />
            </Form.Item>

            <Form.Item
              label="价格（分）"
              name="price"
              rules={[{ required: true, message: "请输入价格" }]}
            >
              <InputNumber min={0} precision={0} />
            </Form.Item>
          </div>

          <Form.Item
            label="分类"
            name="tag"
            rules={[{ max: 64, message: "分类不能超过 64 个字符" }]}
          >
            <Input maxLength={64} placeholder="例如 文学 / 计算机" />
          </Form.Item>
        </Form>
      </Modal>
    </section>
  );
}
