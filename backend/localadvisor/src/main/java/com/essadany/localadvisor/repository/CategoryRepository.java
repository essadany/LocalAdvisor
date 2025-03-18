package com.essadany.localadvisor.repository;

import com.essadany.localadvisor.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Object> findByName(String name);
}
