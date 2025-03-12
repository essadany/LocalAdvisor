package com.essadany.localadvisor.repository;

import com.essadany.localadvisor.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
