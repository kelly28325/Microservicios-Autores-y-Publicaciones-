package com.example.authors.controller;

import com.example.authors.model.IndividualAuthor;
import com.example.authors.service.AuthorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5174")
@RestController
@RequestMapping("/authors")
public class AuthorController {

    private final AuthorService service;

    public AuthorController(AuthorService service) {
        this.service = service;
    }

    @PostMapping
    public IndividualAuthor create(@RequestBody IndividualAuthor author) {
        return service.save(author);
    }

    @GetMapping("/{id}")
    public IndividualAuthor getById(@PathVariable Long id) {
        return service.findById(id);
    }

    @GetMapping
    public List<IndividualAuthor> getAll() {
        return service.findAll();
    }
}
