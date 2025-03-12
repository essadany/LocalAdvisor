package com.essadany.localadvisor.service;

import com.essadany.localadvisor.model.Review;
import com.essadany.localadvisor.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    public Review addReview(Review review) {
        return reviewRepository.save(review);
    }

    public List<Review> getReviewsByUser(Long userId) {
        return reviewRepository.findAll();
    }
}
