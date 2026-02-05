package com.example.authors.service;

import com.example.authors.model.IndividualAuthor;
import com.example.authors.repository.AuthorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorService {

    private final AuthorRepository repository;

    public AuthorService(AuthorRepository repository) {
        this.repository = repository;
    }

    public IndividualAuthor save(IndividualAuthor author) {
        return repository.save(author);
    }

    public IndividualAuthor findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Author not found"));
    }

    public List<IndividualAuthor> findAll() {
        return repository.findAll();
    }
}
