package com.essadany.localadvisor.controller;

import com.essadany.localadvisor.model.Favorite;
import com.essadany.localadvisor.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/favorites")
class FavoriteController {
    @Autowired
    private FavoriteService favoriteService;

    @GetMapping("/{userId}")
    public ResponseEntity<Iterable<Favorite>> getFavoritesByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(favoriteService.getFavoritesByUserId(userId));
    }

    @PostMapping("/{userId}/add/{placeId}")
    public ResponseEntity<?> addFavorite(@PathVariable Long userId, @PathVariable Long placeId) {
        Favorite addedFavorite = favoriteService.addFavorite(userId, placeId);
        if (addedFavorite == null) {
            return ResponseEntity.badRequest().body("Favorite already exists");
        }
        return ResponseEntity.ok("Favorite added successfully");
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> removeFavoriteById(@PathVariable Long id) {
        favoriteService.removeFavoriteById(id);
        return ResponseEntity.ok("Favorite removed successfully");
    }

}