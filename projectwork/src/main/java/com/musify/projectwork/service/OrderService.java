package com.musify.projectwork.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.musify.projectwork.model.OrderEntity;
import com.musify.projectwork.repository.OrderRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    // Get all orders
    public List<OrderEntity> getAllOrders() {
        return orderRepository.findAll();
    }

    // Create a new order
    public OrderEntity createOrder(OrderEntity order) {
        return orderRepository.save(order);
    }

    // Get an order by ID
    public OrderEntity getOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    // Delete an order by ID
    public void deleteOrderById(Long id) {
        orderRepository.deleteById(id);
    }
}