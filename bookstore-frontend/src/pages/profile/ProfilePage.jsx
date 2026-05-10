import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Cascader, Form, Input, Modal, Switch, message } from "antd";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import AddressItem from "../../components/profile/AddressItem";
import ProfileCard from "../../components/profile/ProfileCard";
import SettingsItem from "../../components/profile/SettingsItem";
import usePageTitle from "../../hooks/usePageTitle";
import {
  changePassword,
  clearCurrentUser,
  getCurrentUser,
  saveCurrentUser,
  updateUserProfile,
} from "../../services/auth/authService";
import {
  createAddress,
  deleteAddress,
  fetchAddresses,
  updateAddress,
} from "../../services/profile/addressApiService";

const regionOptions = [
  {
    value: "上海市",
    label: "上海市",
    children: [
      {
        value: "上海市",
        label: "上海市",
        children: [
          { value: "浦东新区", label: "浦东新区" },
          { value: "黄浦区", label: "黄浦区" },
          { value: "徐汇区", label: "徐汇区" },
        ],
      },
    ],
  },
  {
    value: "北京市",
    label: "北京市",
    children: [
      {
        value: "北京市",
        label: "北京市",
        children: [
          { value: "海淀区", label: "海淀区" },
          { value: "朝阳区", label: "朝阳区" },
          { value: "东城区", label: "东城区" },
        ],
      },
    ],
  },
  {
    value: "广东省",
    label: "广东省",
    children: [
      {
        value: "广州市",
        label: "广州市",
        children: [
          { value: "天河区", label: "天河区" },
          { value: "越秀区", label: "越秀区" },
          { value: "海珠区", label: "海珠区" },
        ],
      },
      {
        value: "深圳市",
        label: "深圳市",
        children: [
          { value: "南山区", label: "南山区" },
          { value: "福田区", label: "福田区" },
          { value: "宝安区", label: "宝安区" },
        ],
      },
    ],
  },
  {
    value: "江苏省",
    label: "江苏省",
    children: [
      {
        value: "南京市",
        label: "南京市",
        children: [
          { value: "玄武区", label: "玄武区" },
          { value: "秦淮区", label: "秦淮区" },
          { value: "鼓楼区", label: "鼓楼区" },
        ],
      },
      {
        value: "苏州市",
        label: "苏州市",
        children: [
          { value: "姑苏区", label: "姑苏区" },
          { value: "吴中区", label: "吴中区" },
          { value: "工业园区", label: "工业园区" },
        ],
      },
    ],
  },
  {
    value: "浙江省",
    label: "浙江省",
    children: [
      {
        value: "杭州市",
        label: "杭州市",
        children: [
          { value: "西湖区", label: "西湖区" },
          { value: "上城区", label: "上城区" },
          { value: "滨江区", label: "滨江区" },
        ],
      },
    ],
  },
];

export default function ProfilePage({ pageData, siteName }) {
  const { addresses: loadedAddresses, user } = useLoaderData();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [form] = Form.useForm();
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [profileUser, setProfileUser] = useState(user ?? currentUser);
  const [addresses, setAddresses] = useState(loadedAddresses ?? []);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const activeUser = profileUser ?? user ?? currentUser;

  usePageTitle(`${siteName} - ${pageData.title}`);

  useEffect(() => {
    setAddresses(loadedAddresses ?? []);
  }, [loadedAddresses]);

  useEffect(() => {
    setProfileUser(user ?? getCurrentUser());
  }, [user]);

  function openProfileModal() {
    profileForm.setFieldsValue({
      nickname: activeUser?.nickname ?? "",
      username: activeUser?.username ?? "",
      phone: activeUser?.phone ?? "",
      email: activeUser?.email ?? "",
    });
    setProfileModalOpen(true);
  }

  function closeProfileModal() {
    if (!savingProfile) {
      profileForm.resetFields();
      setProfileModalOpen(false);
    }
  }

  async function handleSaveProfile() {
    try {
      const values = await profileForm.validateFields();
      if (!activeUser?.id) {
        message.error("请先登录后再编辑资料");
        return;
      }

      setSavingProfile(true);
      const updatedUser = await updateUserProfile(activeUser.id, values);
      setProfileUser(updatedUser);
      saveCurrentUser(updatedUser);
      setProfileModalOpen(false);
      message.success("资料更新成功");
    } catch (error) {
      if (error.errorFields) {
        return;
      }
      message.error(error.message || "资料更新失败");
    } finally {
      setSavingProfile(false);
    }
  }

  function openPasswordModal() {
    passwordForm.resetFields();
    setPasswordModalOpen(true);
  }

  function closePasswordModal() {
    if (!changingPassword) {
      passwordForm.resetFields();
      setPasswordModalOpen(false);
    }
  }

  function handleSettingsAction(item, event) {
    if (item.id === "password") {
      event.preventDefault();
      openPasswordModal();
      return false;
    }
    return true;
  }

  async function handleSavePassword() {
    try {
      const values = await passwordForm.validateFields();
      if (!activeUser?.id) {
        message.error("请先登录后再修改密码");
        return;
      }

      setChangingPassword(true);
      await changePassword(activeUser.id, values);
      clearCurrentUser();
      setPasswordModalOpen(false);
      passwordForm.resetFields();
      message.success("密码修改成功，请重新登录");
      navigate("/login", { replace: true });
    } catch (error) {
      if (error.errorFields) {
        return;
      }
      message.error(error.message || "密码修改失败");
    } finally {
      setChangingPassword(false);
    }
  }

  async function refreshAddresses() {
    setLoadingAddresses(true);
    try {
      const nextAddresses = await fetchAddresses(activeUser.id);
      setAddresses(nextAddresses);
    } catch (error) {
      message.error(error.message || "刷新地址列表失败");
    } finally {
      setLoadingAddresses(false);
    }
  }

  function openCreateModal() {
    setEditingAddress(null);
    form.resetFields();
    form.setFieldsValue({ defaultAddress: addresses.length === 0 });
    setModalOpen(true);
  }

  function openEditModal(address) {
    setEditingAddress(address);
    form.setFieldsValue({
      receiver: address.receiver ?? address.name,
      phone: address.phone,
      region: [address.province, address.city, address.district],
      detail: address.detail,
      defaultAddress: Boolean(address.defaultAddress),
    });
    setModalOpen(true);
  }

  function closeModal() {
    if (!saving) {
      setModalOpen(false);
    }
  }

  async function handleSaveAddress() {
    try {
      const values = await form.validateFields();
      setSaving(true);
      if (editingAddress) {
        await updateAddress(activeUser.id, editingAddress.id, values);
        message.success("地址已更新");
      } else {
        await createAddress(activeUser.id, values);
        message.success("地址已新增");
      }
      setModalOpen(false);
      await refreshAddresses();
    } catch (error) {
      if (error.errorFields) {
        return;
      }
      message.error(error.message || "保存地址失败");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteAddress(addressId) {
    setDeletingId(addressId);
    try {
      await deleteAddress(activeUser.id, addressId);
      message.success("地址已删除");
      await refreshAddresses();
    } catch (error) {
      message.error(error.message || "删除地址失败");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section className="profile" aria-label="个人中心">
      <header className="profile__header">
        <h1 className="profile__title">{pageData.title}</h1>
        <p className="profile__subtitle">{pageData.subtitle}</p>
      </header>

      <div className="profile__grid" aria-label="个人中心内容区">
        <ProfileCard className="profile-user" aria-label="用户信息">
          <header className="profile-card__header">
            <h2 className="profile-card__title">{pageData.userCard.title}</h2>
            <p className="profile-card__desc">{pageData.userCard.desc}</p>
          </header>

          <div className="profile-card__body">
            <div className="profile-user__row">
              <Avatar className="profile-user__avatar" icon={<UserOutlined />} size={56} />

              <div className="profile-user__meta">
                <div className="profile-user__name">
                  {profileUser?.nickname ?? "未设置昵称"}
                </div>
                <div className="profile-user__contact" aria-label="联系方式">
                  <span className="profile-user__contact-item">
                    账号：{profileUser?.username ?? "未设置账号"}
                  </span>
                  <span className="profile-user__contact-dot" aria-hidden="true">
                    ·
                  </span>
                  <span className="profile-user__contact-item">
                    手机号：{profileUser ? profileUser.phone ?? "未绑定手机号" : pageData.userCard.phone}
                  </span>
                  <span className="profile-user__contact-dot" aria-hidden="true">
                    ·
                  </span>
                  <span className="profile-user__contact-item">
                    邮箱：{profileUser ? profileUser.email ?? "未填写邮箱" : pageData.userCard.email}
                  </span>
                </div>
              </div>
            </div>

            <div className="profile-divider" role="separator" aria-hidden="true"></div>

            <div className="profile-user__actions" aria-label="用户信息操作">
              <Button
                className="profile-link"
                htmlType="button"
                type="default"
                onClick={openProfileModal}
                aria-label="编辑资料"
              >
                {pageData.userCard.editText}
              </Button>
            </div>
          </div>
        </ProfileCard>

        <ProfileCard className="profile-address" aria-label="收货地址">
          <header className="profile-card__header">
            <div className="profile-card__header-main">
              <h2 className="profile-card__title">{pageData.addressCard.title}</h2>
              <p className="profile-card__desc">{pageData.addressCard.desc}</p>
            </div>

            <Button
              className="profile-button profile-button--primary"
              htmlType="button"
              loading={loadingAddresses}
              type="primary"
              onClick={openCreateModal}
            >
              {pageData.addressCard.addText}
            </Button>
          </header>

          <div className="profile-card__body">
            <ul className="profile-address__list" aria-label="地址列表">
              {addresses.length > 0 ? (
                addresses.map((address) => (
                  <AddressItem
                    key={address.id}
                    address={address}
                    deleting={deletingId === address.id}
                    onDelete={handleDeleteAddress}
                    onEdit={openEditModal}
                  />
                ))
              ) : (
                <li className="profile-empty">暂无收货地址</li>
              )}
            </ul>
          </div>
        </ProfileCard>

        <ProfileCard className="profile-settings" aria-label="账户设置">
          <header className="profile-card__header">
            <h2 className="profile-card__title">{pageData.settingsCard.title}</h2>
            <p className="profile-card__desc">{pageData.settingsCard.desc}</p>
          </header>

          <div className="profile-card__body">
            <ul className="settings-list" aria-label="设置项列表">
              {pageData.settings.map((item) => (
                <SettingsItem key={item.id} item={item} onAction={handleSettingsAction} />
              ))}
            </ul>
          </div>
        </ProfileCard>
      </div>

      <Modal
        title="编辑资料"
        open={profileModalOpen}
        okText="保存"
        cancelText="取消"
        confirmLoading={savingProfile}
        onCancel={closeProfileModal}
        onOk={handleSaveProfile}
      >
        <Form form={profileForm} className="profile-edit-form" layout="vertical">
          <Form.Item
            label="昵称"
            name="nickname"
            validateTrigger={["onBlur", "onChange"]}
            rules={[
              { required: true, whitespace: true, message: "请输入昵称" },
              { max: 255, message: "昵称不能超过 255 个字符" },
            ]}
          >
            <Input placeholder="请输入昵称" maxLength={255} />
          </Form.Item>

          <Form.Item
            label="账号"
            name="username"
            validateTrigger={["onBlur", "onChange"]}
            rules={[
              { required: true, whitespace: true, message: "请输入账号" },
              { max: 64, message: "账号不能超过 64 个字符" },
            ]}
          >
            <Input placeholder="请输入账号" maxLength={64} />
          </Form.Item>

          <Form.Item
            label="手机号"
            name="phone"
            validateTrigger={["onBlur", "onChange"]}
            rules={[
              { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号" },
            ]}
          >
            <Input placeholder="请输入手机号" maxLength={11} />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="email"
            validateTrigger={["onBlur", "onChange"]}
            rules={[
              { type: "email", message: "请输入正确的邮箱格式" },
              { max: 255, message: "邮箱不能超过 255 个字符" },
            ]}
          >
            <Input placeholder="请输入邮箱" maxLength={255} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="修改密码"
        open={passwordModalOpen}
        okText="确认修改"
        cancelText="取消"
        confirmLoading={changingPassword}
        onCancel={closePasswordModal}
        onOk={handleSavePassword}
        afterClose={() => passwordForm.resetFields()}
      >
        <Form form={passwordForm} className="password-form" layout="vertical">
          <Form.Item
            label="原密码"
            name="currentPassword"
            validateTrigger={["onBlur", "onChange"]}
            rules={[{ required: true, message: "请输入原密码" }]}
          >
            <Input.Password placeholder="请输入原密码" autoComplete="current-password" />
          </Form.Item>

          <Form.Item
            label="新密码"
            name="newPassword"
            dependencies={["currentPassword"]}
            validateTrigger={["onBlur", "onChange"]}
            rules={[
              { required: true, message: "请输入新密码" },
              { min: 6, message: "新密码至少 6 位" },
              { max: 128, message: "新密码不能超过 128 位" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || value !== getFieldValue("currentPassword")) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("新密码不能与原密码相同"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="请输入新密码" autoComplete="new-password" />
          </Form.Item>

          <Form.Item
            label="确认新密码"
            name="confirmPassword"
            dependencies={["newPassword"]}
            validateTrigger={["onBlur", "onChange"]}
            rules={[
              { required: true, message: "请再次输入新密码" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || value === getFieldValue("newPassword")) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("两次输入的新密码不一致"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="请再次输入新密码" autoComplete="new-password" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={editingAddress ? "编辑收货地址" : "新增收货地址"}
        open={modalOpen}
        okText={editingAddress ? "保存修改" : "新增地址"}
        cancelText="取消"
        confirmLoading={saving}
        onCancel={closeModal}
        onOk={handleSaveAddress}
      >
        <Form
          form={form}
          className="address-form"
          layout="vertical"
          initialValues={{ defaultAddress: false }}
        >
          <Form.Item
            label="收货人姓名"
            name="receiver"
            rules={[{ required: true, message: "请输入收货人姓名" }]}
          >
            <Input placeholder="请输入收货人姓名" />
          </Form.Item>

          <Form.Item
            label="手机号"
            name="phone"
            rules={[
              { required: true, message: "请输入手机号" },
              { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号" },
            ]}
          >
            <Input placeholder="请输入手机号" maxLength={11} />
          </Form.Item>

          <Form.Item
            label="省市区"
            name="region"
            rules={[{ required: true, message: "请选择省市区" }]}
          >
            <Cascader options={regionOptions} placeholder="请选择省市区" />
          </Form.Item>

          <Form.Item
            label="详细地址"
            name="detail"
            rules={[{ required: true, message: "请输入详细地址" }]}
          >
            <Input.TextArea placeholder="请输入街道、门牌号等详细地址" rows={3} showCount maxLength={255} />
          </Form.Item>

          <Form.Item label="设为默认地址" name="defaultAddress" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </section>
  );
}
