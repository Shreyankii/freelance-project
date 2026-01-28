package com.example.freelancer.dto;

import com.example.freelancer.entity.UserType;

public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private UserType userType;   // ✅ MUST be THIS type

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public UserType getUserType() { return userType; }
    public void setUserType(UserType userType) { this.userType = userType; }
}
