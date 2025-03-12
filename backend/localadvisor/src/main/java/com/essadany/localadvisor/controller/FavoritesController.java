package com.essadany.localadvisor.controller;

import com.essadany.localadvisor.model.Favorites;
import com.essadany.localadvisor.service.FavoritesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/favorites")
class FavoritesController {
    @Autowired
    private FavoritesService favoritesService;

    @PostMapping("/add")
    public ResponseEntity<Favorites> addToFavorites(@RequestBody Favorites favorites) {
        Favorites createdFavorites = favoritesService.addToFavorites(favorites);
        return ResponseEntity.ok(createdFavorites);
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<Void> removeFromFavorites(@PathVariable Long id) {
        favoritesService.removeFromFavorites(id);
        return ResponseEntity.noContent().build();
    }

}