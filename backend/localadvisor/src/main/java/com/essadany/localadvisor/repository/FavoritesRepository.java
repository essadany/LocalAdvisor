package com.essadany.localadvisor.repository;

import com.essadany.localadvisor.model.Favorites;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoritesRepository extends JpaRepository<Favorites, Long> {

}
