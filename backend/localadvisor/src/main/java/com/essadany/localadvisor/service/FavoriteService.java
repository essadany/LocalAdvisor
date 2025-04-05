package com.essadany.localadvisor.service;

import com.essadany.localadvisor.model.Favorite;
import com.essadany.localadvisor.model.Place;
import com.essadany.localadvisor.model.User;
import com.essadany.localadvisor.repository.FavoriteRepository;
import com.essadany.localadvisor.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional
public class FavoriteService {
    @Autowired
    private FavoriteRepository favoriteRepository;
    @Autowired
    private UserRepository userRepository;


    public void removeFavoriteById(Long favoriteId) {
        favoriteRepository.deleteById(favoriteId);
    }

    public Iterable<Favorite> getFavoritesByUserId(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return favoriteRepository.findAllByUser(user);
    }

    public Favorite addFavorite(Favorite favorite) {
        // Check if the favorite already exists
        if (favoriteRepository.existsByUserAndPlace(favorite.getUser(), favorite.getPlace())) {
            return null; // or throw an exception
        }
        return favoriteRepository.save(favorite);
    }
}