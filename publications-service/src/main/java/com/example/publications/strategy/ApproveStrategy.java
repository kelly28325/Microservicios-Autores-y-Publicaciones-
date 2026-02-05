
package com.example.publications.strategy;
import com.example.publications.model.*;

public class ApproveStrategy implements StatusStrategy{

 @Override
 public void change(Publication p){ p.setStatus(PublicationStatus.APPROVED); }
 public PublicationStatus supports()
 { return PublicationStatus.APPROVED; }
}
