package com.essadany.localadvisor.controller;

import com.essadany.localadvisor.model.Review;
import com.essadany.localadvisor.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/reviews")
class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @PostMapping("/add")
    public ResponseEntity<Review> addReview(@RequestBody Review review) {
        Review createdReview = reviewService.addReview(review);
        return ResponseEntity.ok(createdReview);
    }



    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Review>> getReviewsByUser(@PathVariable Long userId) {
        if (reviewService.getReviewsByUser(userId).isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(reviewService.getReviewsByUser(userId));
    }
}