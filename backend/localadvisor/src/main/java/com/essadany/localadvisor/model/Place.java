package com.essadany.localadvisor.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
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
    private String address;
    private String city;
    private String state;
    private String zip;
    private String description;
    private String image;
    @Min(0)
    @Max(5)
    private int rating;


    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;


}
