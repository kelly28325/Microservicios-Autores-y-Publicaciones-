
package com.example.publications.repository;
import com.example.publications.model.Publication;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PublicationRepository
        extends JpaRepository<Publication,Long>{

}
