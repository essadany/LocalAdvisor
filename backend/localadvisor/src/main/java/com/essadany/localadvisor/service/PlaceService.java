package com.essadany.localadvisor.service;

import com.essadany.localadvisor.model.Place;
import com.essadany.localadvisor.repository.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class PlaceService {
    @Autowired
    private PlaceRepository placeRepository;

    public Place addPlace(Place place) {
        return placeRepository.save(place);
    }

    public List<Place> getAllPlaces() {
        return placeRepository.findAll();
    }
}