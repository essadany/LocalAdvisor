package com.essadany.localadvisor.service;

import com.essadany.localadvisor.model.User;
import com.essadany.localadvisor.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {
    @Autowired
    private UserRepository UserRepository;


    public List<User> getAllUsers() {
        return UserRepository.findAll();
    }

    public Optional<User> getUserByEmail(String email) {
        return UserRepository.findByEmail(email);
    }


    public void saveUser(User user) {
        UserRepository.save(user);
    }

    public User updateUser(User user) {
        return UserRepository.save(user);
    }

    public void deleteUser(Long id) {
        UserRepository.deleteById(id);
    }

    public User getUserById(Long id) {
        return UserRepository.findById(id).isPresent() ? UserRepository.findById(id).get() : null;
    }


}