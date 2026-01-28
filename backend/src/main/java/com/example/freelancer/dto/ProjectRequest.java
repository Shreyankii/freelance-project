package com.example.freelancer.dto;

import lombok.Data;
import java.util.List;

@Data
public class ProjectRequest {
  private String title;
  private String description;
  private double budget;
  private List<String> technologies;
  private String clientId;
}
