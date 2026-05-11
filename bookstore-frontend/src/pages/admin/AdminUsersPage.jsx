import { Button, Popconfirm, Space, Table, Tag, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import {
  disableAdminUser,
  enableAdminUser,
  fetchAdminUsers,
} from "../../services/admin/adminUserService";
import { USER_ROLES, USER_STATUS } from "../../utils/userRole";

const roleLabels = {
  [USER_ROLES.ADMIN]: "管理员",
  [USER_ROLES.CUSTOMER]: "顾客",
};

const statusLabels = {
  [USER_STATUS.ACTIVE]: "正常",
  [USER_STATUS.DISABLED]: "禁用",
};

function formatBalance(balance) {
  return `¥ ${(Number(balance ?? 0) / 100).toFixed(2)}`;
}

export default function AdminUsersPage({ siteName }) {
  const { user } = useLoaderData();
  const [users, setUsers] = useState([]);
  const [pageState, setPageState] = useState({
    page: 0,
    size: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [operatingUserId, setOperatingUserId] = useState(null);

  usePageTitle(`${siteName} - 用户管理`);

  const loadUsers = useCallback(async (page, size) => {
    setLoading(true);
    try {
      const data = await fetchAdminUsers(user.id, page, size);
      setUsers(data.users ?? []);
      setPageState({
        page: data.page ?? page,
        size: data.size ?? size,
        total: data.totalElements ?? 0,
      });
    } catch (error) {
      message.error(error.message || "用户列表加载失败");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    loadUsers(pageState.page, pageState.size);
  }, [loadUsers, pageState.page, pageState.size]);

  async function handleToggleUser(record) {
    setOperatingUserId(record.id);
    try {
      if (record.status === USER_STATUS.DISABLED) {
        await enableAdminUser(user.id, record.id);
        message.success("用户已解禁");
      } else {
        await disableAdminUser(user.id, record.id);
        message.success("用户已禁用");
      }
      await loadUsers(pageState.page, pageState.size);
    } catch (error) {
      message.error(error.message || "操作失败");
    } finally {
      setOperatingUserId(null);
    }
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 72,
    },
    {
      title: "账号",
      dataIndex: "username",
      width: 140,
      ellipsis: true,
    },
    {
      title: "昵称",
      dataIndex: "nickname",
      width: 140,
      ellipsis: true,
      render: (value) => value || "未设置",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      width: 220,
      ellipsis: true,
      render: (value) => value || "未填写",
    },
    {
      title: "手机号",
      dataIndex: "phone",
      width: 140,
      render: (value) => value || "未绑定",
    },
    {
      title: "余额",
      dataIndex: "balance",
      width: 120,
      render: (value) => formatBalance(value),
    },
    {
      title: "角色",
      dataIndex: "role",
      width: 110,
      render: (value) => (
        <Tag color={value === USER_ROLES.ADMIN ? "blue" : "green"}>
          {roleLabels[value] ?? value}
        </Tag>
      ),
    },
    {
      title: "状态",
      dataIndex: "status",
      width: 110,
      render: (value) => (
        <Tag color={value === USER_STATUS.DISABLED ? "red" : "success"}>
          {statusLabels[value] ?? value}
        </Tag>
      ),
    },
    {
      title: "操作",
      key: "actions",
      fixed: "right",
      width: 160,
      render: (_, record) => {
        if (record.role !== USER_ROLES.CUSTOMER) {
          return <span className="admin-table__muted">仅管理顾客</span>;
        }

        const disabled = record.status === USER_STATUS.DISABLED;
        return (
          <Popconfirm
            title={disabled ? "确认解禁该用户？" : "确认禁用该用户？"}
            description={disabled ? "解禁后该用户可以重新登录。" : "禁用后该用户将无法登录系统。"}
            okText="确认"
            cancelText="取消"
            onConfirm={() => handleToggleUser(record)}
          >
            <Button
              danger={!disabled}
              loading={operatingUserId === record.id}
              type={disabled ? "primary" : "default"}
            >
              {disabled ? "解禁" : "禁用"}
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <section className="admin-page" aria-label="用户管理">
      <header className="admin-page__header">
        <div>
          <h1 className="admin-page__title">用户管理</h1>
          <p className="admin-page__subtitle">查看用户角色与账号状态，禁用或解禁普通顾客账号。</p>
        </div>
        <Space>
          <Tag color="blue">管理员</Tag>
          <span className="admin-page__operator">{user.username}</span>
        </Space>
      </header>

      <section className="admin-card" aria-label="用户列表">
        <Table
          columns={columns}
          dataSource={users}
          loading={loading}
          pagination={{
            current: pageState.page + 1,
            pageSize: pageState.size,
            total: pageState.total,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 个用户`,
          }}
          rowKey="id"
          scroll={{ x: 1100 }}
          onChange={(pagination) => {
            setPageState((current) => ({
              ...current,
              page: (pagination.current ?? 1) - 1,
              size: pagination.pageSize ?? current.size,
            }));
          }}
        />
      </section>
    </section>
  );
}
