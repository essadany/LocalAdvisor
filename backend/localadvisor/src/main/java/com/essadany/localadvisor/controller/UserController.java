package com.essadany.localadvisor.controller;

import com.essadany.localadvisor.service.UserService;
import com.essadany.localadvisor.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/users")
class UserController {
    @Autowired
    private UserService UserService;

    @GetMapping("/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        Optional<User> user = UserService.getUserByEmail(email);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.noContent().build());
    }


    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        if (UserService.getAllUsers().isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(UserService.getAllUsers());
    }
}