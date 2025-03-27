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

    public Favorite addFavorite(Long userId, Long placeId) {
        Favorite favorite = new Favorite();
        //get user by id
        User user = new User();
        user.setId(userId);
        favorite.setUser(user);
        //get place by id
        Place place = new Place();
        place.setPlaceId(placeId);
        favorite.setPlace(place);
        Date date = new Date();
        favorite.setDateAdded(date);
        return favoriteRepository.save(favorite);
    }

    public void removeFavoriteById(Long favoriteId) {
        favoriteRepository.deleteById(favoriteId);
    }

    public Iterable<Favorite> getFavoritesByUserId(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return favoriteRepository.findAllByUser(user);
    }
}