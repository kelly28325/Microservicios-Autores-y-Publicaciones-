package com.example.publications.model;

import jakarta.persistence.*;

@Entity
@Table(name = "publications")
public class Publication {

 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;

 private String title;

 private Long authorId;

 @Enumerated(EnumType.STRING)
 private PublicationStatus status;

 // ===== getters & setters =====

 public Long getId() {
  return id;
 }

 public String getTitle() {
  return title;
 }

 public void setTitle(String title) {
  this.title = title;
 }

 public Long getAuthorId() {
  return authorId;
 }

 public void setAuthorId(Long authorId) {
  this.authorId = authorId;
 }

 public PublicationStatus getStatus() {
  return status;
 }

 public void setStatus(PublicationStatus status) {
  this.status = status;
 }

 public void setContent(Object content) {
 }
}
