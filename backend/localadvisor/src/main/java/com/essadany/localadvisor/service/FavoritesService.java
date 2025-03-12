package com.essadany.localadvisor.service;

import com.essadany.localadvisor.model.Favorites;
import com.essadany.localadvisor.repository.FavoritesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class FavoritesService {
    @Autowired
    private FavoritesRepository favoritesRepository;

    public Favorites addToFavorites(Favorites favorite) {
        return favoritesRepository.save(favorite);
    }

    public void removeFromFavorites(Long favoriteId) {
        favoritesRepository.deleteById(favoriteId);
    }
}