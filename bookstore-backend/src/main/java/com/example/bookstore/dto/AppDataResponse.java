package com.example.bookstore.dto;

import java.util.List;

public record AppDataResponse(
        Site site,
        List<NavigationItem> navigation,
        HomePage homePage,
        DetailPage detailPage,
        CartPage cartPage,
        OrdersPage ordersPage,
        ProfilePage profilePage,
        LoginPage loginPage,
        RegisterPage registerPage,
        List<Banner> banners
) {
    public record Site(String name, String footerText, String logo) {
    }

    public record NavigationItem(String label, String path) {
    }

    public record HomePage(
            String title,
            String subtitle,
            String searchPlaceholder,
            String searchButtonText,
            String gridChipText
    ) {
    }

    public record DetailPage(
            String coverHint,
            String backText,
            String priceLabel,
            String summaryTitle,
            String addToCartText,
            String buyNowText
    ) {
    }

    public record CartPage(
            String title,
            String subtitle,
            String selectAllText,
            String totalLabel,
            String checkoutText
    ) {
    }

    public record OrdersPage(String title, String subtitle) {
    }

    public record ProfilePage(
            String title,
            String subtitle,
            UserCard userCard,
            AddressCard addressCard,
            List<Address> addresses,
            SettingsCard settingsCard,
            List<Setting> settings
    ) {
    }

    public record UserCard(
            String title,
            String desc,
            String name,
            String phone,
            String email,
            String editText
    ) {
    }

    public record AddressCard(String title, String desc, String addText) {
    }

    public record Address(
            String id,
            String name,
            String phone,
            String tag,
            String detail
    ) {
    }

    public record SettingsCard(String title, String desc) {
    }

    public record Setting(
            String id,
            String label,
            String hint,
            String path,
            boolean danger
    ) {
    }

    public record LoginPage(
            String title,
            String subtitle,
            List<String> tips,
            String panelTitle,
            String panelDesc,
            String accountLabel,
            String accountPlaceholder,
            String accountHint,
            String passwordLabel,
            String passwordPlaceholder,
            String passwordHint,
            String buttonText,
            String linkText
    ) {
    }

    public record RegisterPage(
            String title,
            String subtitle,
            List<String> tips,
            String panelTitle,
            String panelDesc,
            String usernameLabel,
            String usernamePlaceholder,
            String usernameHint,
            String passwordLabel,
            String passwordPlaceholder,
            String passwordHint,
            String confirmPasswordLabel,
            String confirmPasswordPlaceholder,
            String confirmPasswordHint,
            String buttonText,
            String loginLinkText
    ) {
    }

    public record Banner(String id, String image, String alt) {
    }
}
