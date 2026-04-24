import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import { Link } from "react-router-dom";
import AddressItem from "../../components/profile/AddressItem";
import ProfileCard from "../../components/profile/ProfileCard";
import SettingsItem from "../../components/profile/SettingsItem";
import usePageTitle from "../../hooks/usePageTitle";

export default function ProfilePage({ pageData, siteName }) {
  usePageTitle(`${siteName} - ${pageData.title}`);

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
                <div className="profile-user__name">{pageData.userCard.name}</div>
                <div className="profile-user__contact" aria-label="联系方式">
                  <span className="profile-user__contact-item">
                    手机号：{pageData.userCard.phone}
                  </span>
                  <span className="profile-user__contact-dot" aria-hidden="true">
                    ·
                  </span>
                  <span className="profile-user__contact-item">
                    邮箱：{pageData.userCard.email}
                  </span>
                </div>
              </div>
            </div>

            <div className="profile-divider" role="separator" aria-hidden="true"></div>

            <div className="profile-user__actions" aria-label="用户信息操作">
              <Link className="profile-link" to="/profile" aria-label="编辑资料">
                {pageData.userCard.editText}
              </Link>
              <Button className="profile-button profile-button--primary" htmlType="button" type="primary">
                {pageData.userCard.saveText}
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

            <Button className="profile-button profile-button--primary" htmlType="button" type="primary">
              {pageData.addressCard.addText}
            </Button>
          </header>

          <div className="profile-card__body">
            <ul className="profile-address__list" aria-label="地址列表">
              {pageData.addresses.map((address) => (
                <AddressItem key={address.id} address={address} />
              ))}
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
                <SettingsItem key={item.id} item={item} />
              ))}
            </ul>
          </div>
        </ProfileCard>
      </div>
    </section>
  );
}
