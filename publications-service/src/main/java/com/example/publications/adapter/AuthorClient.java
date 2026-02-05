
package com.example.publications.adapter;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
@Component
public class AuthorClient {
 private final RestTemplate rest=new RestTemplate();
 public boolean exists(Long id){
  try{
   rest.getForObject("http://authors-service:8081/authors/"+id,Object.class);
   return true;
  }catch(Exception e){ return false; }
 }
}
