package com.musify.projectwork.model;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Entity
@Table(name = "orders")
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @Column(name = "address_id", nullable = false)
    private Long addressId;

    @Column(name = "payment_id", nullable = false)
    private Long paymentId;

    @Column(name = "ordered_at", nullable  = false)
    private LocalDateTime orderedAt;

    @Column(name = "status", nullable = false)
    private Long status;
}