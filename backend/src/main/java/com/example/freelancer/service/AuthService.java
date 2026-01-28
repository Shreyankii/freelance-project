package com.example.freelancer.service;

import com.example.freelancer.dto.*;
import com.example.freelancer.entity.User;
import com.example.freelancer.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepo;

    public AuthService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    // ✅ REGISTER
    public UserResponse register(RegisterRequest req) {

        if (userRepo.findByEmail(req.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User(
            UUID.randomUUID().toString(),
            req.getName(),
            req.getEmail(),
            req.getPassword(), // later we will hash this
            req.getUserType()
        );

        User savedUser = userRepo.save(user);

        return new UserResponse(
            savedUser.getId(),
            savedUser.getName(),
            savedUser.getEmail(),
            savedUser.getUserType()
        );
    }

    //  LOGIN
    public UserResponse login(LoginRequest req) {
        User user = userRepo.findByEmail(req.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(req.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getUserType());
    }

    }

