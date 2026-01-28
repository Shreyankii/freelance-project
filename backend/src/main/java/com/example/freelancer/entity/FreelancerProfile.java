package com.example.freelancer.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class FreelancerProfile {

  @Id
  private String id; // same as userId for simplicity

  private String title;
  private String bio;
  private int experience;
  private int hourlyRate;
  private String availability;
  private String avatarUrl;


  @ElementCollection
  private List<String> technologies;

  @OneToOne
  @JoinColumn(name="user_id")
  private User user;
}
