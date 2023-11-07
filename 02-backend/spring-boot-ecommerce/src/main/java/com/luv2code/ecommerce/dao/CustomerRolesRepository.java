package com.luv2code.ecommerce.dao;

import com.luv2code.ecommerce.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRolesRepository extends JpaRepository<Role, Long> {
}
