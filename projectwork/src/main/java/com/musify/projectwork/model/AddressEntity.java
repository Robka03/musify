package com.musify.projectwork.model;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Entity
@Table(name = "address")
public class AddressEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @Column(name = "zip_code", nullable = false)
    private Integer zipCode;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "county", nullable = false)
    private String county;

    @Column(name = "address_line", nullable = false)
    private String addressLine;
}