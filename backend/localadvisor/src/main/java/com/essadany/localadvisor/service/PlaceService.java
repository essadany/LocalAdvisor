package com.essadany.localadvisor.service;

import com.essadany.localadvisor.model.Category;
import com.essadany.localadvisor.model.Place;
import com.essadany.localadvisor.repository.CategoryRepository;
import com.essadany.localadvisor.repository.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PlaceService {
    @Autowired
    private PlaceRepository placeRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    public Place addPlace(Place place) {
        Category category = categoryRepository.findById(place.getCategory().getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        place.setCategory(category);

        return placeRepository.save(place);
    }

    public List<Place> getAllPlaces() {
        return placeRepository.findAll();
    }

    public Place updatePlace(Place place) {
       return placeRepository.save(place);
    }

    public void deletePlace(Long id) {
        placeRepository.deleteById(id);
    }

    public void deleteAllPlaces() {
        placeRepository.deleteAll();
    }

    public Optional<Place> getPlaceById(Long placeId) {
        return placeRepository.findById(placeId);
    }
}