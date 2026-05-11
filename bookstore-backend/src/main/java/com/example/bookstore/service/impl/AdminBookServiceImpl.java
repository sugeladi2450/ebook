package com.example.bookstore.service.impl;

import com.example.bookstore.dto.AdminBookRequest;
import com.example.bookstore.dto.BookResponse;
import com.example.bookstore.entity.Book;
import com.example.bookstore.entity.User;
import com.example.bookstore.exception.ForbiddenOperationException;
import com.example.bookstore.exception.ResourceNotFoundException;
import com.example.bookstore.repository.BookRepository;
import com.example.bookstore.repository.UserRepository;
import com.example.bookstore.service.AdminBookService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
public class AdminBookServiceImpl implements AdminBookService {
    private static final String ROLE_ADMIN = "ADMIN";
    private static final String STATUS_DISABLED = "DISABLED";

    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    public AdminBookServiceImpl(BookRepository bookRepository, UserRepository userRepository) {
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookResponse> getBooks(Long adminId, String keyword) {
        ensureAdmin(adminId);
        List<Book> books = StringUtils.hasText(keyword)
                ? bookRepository.findAllByTitleContainingOrderByIdAsc(keyword.trim())
                : bookRepository.findAllByOrderByIdAsc();
        return books.stream().map(BookResponse::from).toList();
    }

    @Override
    @Transactional
    public BookResponse createBook(Long adminId, AdminBookRequest request) {
        ensureAdmin(adminId);
        Book book = new Book();
        applyRequest(book, request);
        return BookResponse.from(bookRepository.save(book));
    }

    @Override
    @Transactional
    public BookResponse updateBook(Long adminId, Long bookId, AdminBookRequest request) {
        ensureAdmin(adminId);
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Book", bookId));
        applyRequest(book, request);
        return BookResponse.from(bookRepository.save(book));
    }

    @Override
    @Transactional
    public void deleteBook(Long adminId, Long bookId) {
        ensureAdmin(adminId);
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Book", bookId));
        try {
            bookRepository.delete(book);
            bookRepository.flush();
        } catch (DataIntegrityViolationException exception) {
            throw new ForbiddenOperationException("图书已被购物车或订单引用，暂不能删除");
        }
    }

    private void applyRequest(Book book, AdminBookRequest request) {
        book.setTitle(request.title().trim());
        book.setAuthor(request.author().trim());
        book.setCover(StringUtils.hasText(request.cover()) ? request.cover().trim() : "");
        book.setIsbn(StringUtils.hasText(request.isbn()) ? request.isbn().trim() : null);
        book.setStock(request.stock() == null ? 0 : request.stock());
        book.setPrice(request.price() == null ? 0 : request.price());
        book.setTag(StringUtils.hasText(request.tag()) ? request.tag().trim() : "图书");
        if (!StringUtils.hasText(book.getListDesc())) {
            book.setListDesc("暂无简介");
        }
        if (!StringUtils.hasText(book.getIntro())) {
            book.setIntro("暂无简介");
        }
        if (!StringUtils.hasText(book.getDescription())) {
            book.setDescription("暂无简介");
        }
    }

    private void ensureAdmin(Long adminId) {
        User admin = userRepository.findById(adminId)
                .orElseThrow(() -> new ResourceNotFoundException("User", adminId));
        if (!ROLE_ADMIN.equals(admin.getRole())) {
            throw new ForbiddenOperationException("只有管理员可以执行该操作");
        }
        if (STATUS_DISABLED.equals(admin.getStatus())) {
            throw new ForbiddenOperationException("管理员账号已被禁用");
        }
    }
}
