package com.essadany.localadvisor.repository;

import com.essadany.localadvisor.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {

}
