package com.essadany.localadvisor.service;

import com.essadany.localadvisor.model.Favorite;
import com.essadany.localadvisor.model.Place;
import com.essadany.localadvisor.model.User;
import com.essadany.localadvisor.repository.FavoriteRepository;
import com.essadany.localadvisor.repository.PlaceRepository;
import com.essadany.localadvisor.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class FavoriteService {
    @Autowired
    private FavoriteRepository favoriteRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PlaceRepository placeRepository;

    public Favorite addToFavorites(Long userId, Long placeId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Place place = placeRepository.findById(placeId)
                .orElseThrow(() -> new RuntimeException("Place not found"));

        // Vérifier si le favori existe déjà
        if (favoriteRepository.findByUserIdAndPlaceId(userId, placeId).isPresent()) {
            throw new RuntimeException("Favorite already exists");
        }

        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setPlace(place);

        return favoriteRepository.save(favorite);
    }


    public void removeFromFavorites(Long favoriteId) {
        favoriteRepository.deleteById(favoriteId);
    }

    public void removeAllFavorites() {
        favoriteRepository.deleteAll();
    }

    public List<Favorite> getAllFavorites() {
        return favoriteRepository.findAll();
    }
}