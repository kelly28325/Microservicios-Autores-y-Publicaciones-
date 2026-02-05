
package com.example.publications.strategy;
import com.example.publications.model.Publication;
import com.example.publications.model.PublicationStatus;
public interface StatusStrategy {
 void change(Publication p);
 PublicationStatus supports();
}
