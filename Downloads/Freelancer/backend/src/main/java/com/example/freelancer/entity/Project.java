package com.example.freelancer.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class Project {

  @Id
  private String id;

  private String title;

  @Column(length = 2000)
  private String description;

  private double budget;

  private LocalDate postedDate;

  @ElementCollection
  private List<String> technologies;

  @ManyToOne
  @JoinColumn(name="client_id")
  private User client;
}
