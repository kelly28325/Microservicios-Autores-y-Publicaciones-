package com.example.publications.controller;

import com.example.publications.model.Publication;
import com.example.publications.model.PublicationStatus;
import com.example.publications.service.PublicationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5174")
@RestController
@RequestMapping("/publications")
public class PublicationController {

 private final PublicationService service;

 public PublicationController(PublicationService service) {
  this.service = service;
 }


 // CREATE
 @PostMapping
 public Publication create(@RequestBody Publication p)
 { return service.create(p); }

 // CHANGE STATUS
 @PatchMapping("/{id}/status")
 public Publication status(
         @PathVariable Long id,
         @RequestParam PublicationStatus st
 ) {
  return service.changeStatus(id, st);
 }

 // LIST ALL
 @GetMapping
 public List<Publication> all() {
  return service.all();
 }

 // GET BY ID
 @GetMapping("/{id}")
 public Publication getById(@PathVariable Long id) {
  return service.getById(id);
 }
}
