package com.musify.projectwork.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.musify.projectwork.model.ProductEntity;
import com.musify.projectwork.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // Get all products
    public List<ProductEntity> getAllProducts() {
        return productRepository.findAll();
    }

    // Create a new product
    public ProductEntity createProduct(ProductEntity product) {
        return productRepository.save(product);
    }

    // Get a product by ID
    public ProductEntity getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    // Delete a product by ID
    public void deleteProductById(Long id) {
        productRepository.deleteById(id);
    }
}