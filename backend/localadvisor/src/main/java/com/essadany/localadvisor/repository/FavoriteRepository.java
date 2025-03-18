package com.essadany.localadvisor.repository;

import com.essadany.localadvisor.model.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    Optional<Favorite> findByUserIdAndPlaceId(Long userId, Long placeId);
}
