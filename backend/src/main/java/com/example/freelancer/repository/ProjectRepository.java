package com.example.freelancer.repository;

import com.example.freelancer.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, String> {
  List<Project> findByClientId(String clientId);
}
