package com.musify.projectwork.repository;
import com.musify.projectwork.OrderEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<OrderEntity, Long> {
}
