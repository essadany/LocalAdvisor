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

    /*@GetMapping("/all")
    public ResponseEntity<Iterable<Favorite>> getAllFavorites() {
        if (favoriteService.getAllFavorites().isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(favoriteService.getAllFavorites());
    }
    @PostMapping("/add")
    public ResponseEntity<Favorite> addToFavorites(@RequestParam Long userId, @RequestParam Long placeId) {
        Favorite favorite = favoriteService.addToFavorites(userId, placeId);
        return ResponseEntity.ok(favorite);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> removeFromFavorites(@PathVariable Long id) {
        favoriteService.removeFromFavorites(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> removeAllFavorites() {
        favoriteService.removeAllFavorites();
        return ResponseEntity.noContent().build();
    }*/

}