package com.example.authors.repository;

import com.example.authors.model.IndividualAuthor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorRepository extends JpaRepository<IndividualAuthor, Long> {
}
