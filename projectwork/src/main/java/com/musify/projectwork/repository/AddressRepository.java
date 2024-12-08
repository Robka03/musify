package com.musify.projectwork.repository;

import com.musify.projectwork.model.AddressEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AddressRepository extends JpaRepository<AddressEntity, Long> {
    List<AddressEntity> findByUserId(Long userId);
    Optional<AddressEntity> findByIdAndUserId(Long id, Long userId);
}