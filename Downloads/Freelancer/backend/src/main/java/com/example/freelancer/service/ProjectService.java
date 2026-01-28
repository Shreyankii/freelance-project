package com.example.freelancer.service;

import com.example.freelancer.dto.ProjectRequest;
import com.example.freelancer.entity.Project;
import com.example.freelancer.entity.User;
import com.example.freelancer.repository.ProjectRepository;
import com.example.freelancer.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class ProjectService {

  private final ProjectRepository projectRepo;
  private final UserRepository userRepo;

  public ProjectService(ProjectRepository projectRepo, UserRepository userRepo) {
    this.projectRepo = projectRepo;
    this.userRepo = userRepo;
  }

  public Project create(ProjectRequest req) {
    User client = userRepo.findById(req.getClientId())
      .orElseThrow(() -> new RuntimeException("Client not found"));

    Project p = new Project(
      UUID.randomUUID().toString(),
      req.getTitle(),
      req.getDescription(),
      req.getBudget(),
      LocalDate.now(),
      req.getTechnologies(),
      client
    );

    return projectRepo.save(p);
  }

  public List<Project> all() {
    return projectRepo.findAll();
  }

  public List<Project> byClient(String clientId) {
    return projectRepo.findByClientId(clientId);
  }
}
