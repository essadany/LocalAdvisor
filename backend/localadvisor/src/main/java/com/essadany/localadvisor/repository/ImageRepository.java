package com.essadany.localadvisor.repository;

import com.essadany.localadvisor.model.Image;
import com.essadany.localadvisor.model.Place;
import com.essadany.localadvisor.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
    Iterable<Image> findAllByPlace(Place place);
    Iterable<Image> findAllByUser(User user);
    void deleteByPlace(Place place);
    void deleteByUser(User user);
}
