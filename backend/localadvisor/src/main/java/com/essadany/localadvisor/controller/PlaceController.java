package com.essadany.localadvisor.controller;

import com.essadany.localadvisor.model.Place;
import com.essadany.localadvisor.service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/places")
class PlaceController {
    @Autowired
    private PlaceService placeService;

    @PostMapping("/add")
    public ResponseEntity<Place> addPlace(@RequestBody Place place) {
        Place createdPlace = placeService.addPlace(place);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPlace);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Place>> getAllPlaces() {
        if (placeService.getAllPlaces().isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(placeService.getAllPlaces());
    }
}