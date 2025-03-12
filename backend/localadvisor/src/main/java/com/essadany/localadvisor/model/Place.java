package com.essadany.localadvisor.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "places")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long placeId;
    private String name;
    private String description;
    private String location;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL)
    private List<Favorites> favorites;

    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL)
    private List<Review> reviews;
}
