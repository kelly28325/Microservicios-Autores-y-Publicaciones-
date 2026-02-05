
package com.example.publications.model;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "publications")
public class Article extends Publication {
}