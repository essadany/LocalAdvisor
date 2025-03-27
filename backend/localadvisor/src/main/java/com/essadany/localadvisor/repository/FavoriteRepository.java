package com.essadany.localadvisor.repository;

import com.essadany.localadvisor.model.Favorite;
import com.essadany.localadvisor.model.Place;
import com.essadany.localadvisor.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    void deleteByUserAndPlace(User user, Place place);

    Iterable<Favorite> findAllByUser(User user);
}
