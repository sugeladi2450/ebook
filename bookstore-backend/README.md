# Bookstore Backend

This is a standalone Spring Boot backend project for the ebook frontend. The sample project `BookStore-Backend-main` is not modified and is only used as a reference.

## Structure

- `controller`: REST API layer
- `service`: business layer
- `repository`: Spring Data JPA data access layer
- `entity`: JPA entities
- `dto`: request and response DTOs
- `exception`: unified API error handling

## MySQL

Default connection:

- URL: `jdbc:mysql://localhost:3306/bookstore`
- Username: `root`
- Password: `reins2011!`

Override them when starting the app:

```powershell
$env:SPRING_DATASOURCE_URL="jdbc:mysql://localhost:3306/bookstore?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai&createDatabaseIfNotExist=true"
$env:SPRING_DATASOURCE_USERNAME="root"
$env:SPRING_DATASOURCE_PASSWORD="your_password"
.\mvnw.cmd spring-boot:run
```

Import sample schema and data:

```powershell
mysql -u root -p < src/main/resources/db/init.sql
```

## API

`POST /api/v1/users/login`

```json
{
  "username": "admin",
  "password": "admin123"
}
```

`POST /api/v1/users/register`

```json
{
  "username": "demo_user",
  "password": "123456",
  "nickname": "Demo User",
  "balance": 10000
}
```

`GET /api/v1/books`

Returns all books from MySQL.

`GET /api/v1/book/{id}`

Returns one book from MySQL. Unknown ids return `404`.

`GET /api/v1/cart?userId=1`

Returns the current user's cart items from MySQL.

`POST /api/v1/cart/items`

```json
{
  "userId": 1,
  "bookId": 2,
  "number": 1
}
```

`DELETE /api/v1/cart/items/{id}?userId=1`

Deletes one cart item.

`GET /api/v1/orders?userId=1`

Returns the current user's orders from MySQL.

`POST /api/v1/orders`

```json
{
  "userId": 1
}
```

Creates an order from all cart items and clears the cart.

## Postman

Import `postman/bookstore-backend.postman_collection.json` and keep `baseUrl` as `http://localhost:8080`.

## Frontend Integration Flow

The frontend uses Fetch API service modules under `src/services`:

1. Book list page calls `fetchBooks()` in `src/services/books/bookApiService.js`, which sends `GET /api/v1/books`.
2. Spring MVC routes the request to `BookController`, then `BookServiceImpl`.
3. `BookServiceImpl` calls `BookRepository.findAllByOrderByIdAsc()`.
4. Spring Data JPA converts rows in the `book` table into `Book` entities.
5. The service maps entities to `BookResponse` DTOs and the controller returns JSON.
6. React Router loader receives JSON, converts it to frontend view models, and `BookListPage` renders the list.

Cart and order operations follow the same path: frontend `fetch` request, controller, service, repository, MySQL, DTO JSON response, then React state or route loader refreshes the page.
