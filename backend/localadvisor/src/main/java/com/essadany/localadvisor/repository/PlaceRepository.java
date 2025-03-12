package com.essadany.localadvisor.repository;

import com.essadany.localadvisor.model.Place;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaceRepository extends JpaRepository<Place, Long> {
}
