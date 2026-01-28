package com.example.freelancer.controller;

import com.example.freelancer.dto.ProjectRequest;
import com.example.freelancer.entity.Project;
import com.example.freelancer.service.ProjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

  private final ProjectService projectService;

  public ProjectController(ProjectService projectService) {
    this.projectService = projectService;
  }

  @PostMapping
  public Project create(@RequestBody ProjectRequest req) {
    return projectService.create(req);
  }

  @GetMapping
  public List<Project> all() {
    return projectService.all();
  }

  @GetMapping("/client/{clientId}")
  public List<Project> byClient(@PathVariable String clientId) {
    return projectService.byClient(clientId);
  }
}
