package com.example.publications.service;

import com.example.publications.adapter.AuthorClient;
import com.example.publications.model.Publication;
import com.example.publications.model.PublicationStatus;
import com.example.publications.repository.PublicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PublicationService {

 private final PublicationRepository repo;
 private final AuthorClient authorClient;

 public PublicationService(PublicationRepository repo, AuthorClient authorClient) {
  this.repo = repo;
  this.authorClient = authorClient;
 }

 // CREATE
 public Publication create(Publication p) {

  if (!authorClient.exists(p.getAuthorId())) {
   throw new RuntimeException("Author not found");
  }

  p.setStatus(PublicationStatus.DRAFT);
  return repo.save(p);
 }

 // CHANGE STATUS
 public Publication changeStatus(Long id, PublicationStatus st) {

  Publication p = repo.findById(id)
          .orElseThrow(() -> new RuntimeException("Publication not found"));

  p.setStatus(st);
  return repo.save(p);
 }

 // LIST ALL
 public List<Publication> all() {
  return repo.findAll();
 }

 // GET BY ID
 public Publication getById(Long id) {
  return repo.findById(id)
          .orElseThrow(() -> new RuntimeException("Publication not found"));
 }
}
