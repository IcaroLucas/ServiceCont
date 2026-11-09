package org.springboot.api.repository;

import org.springboot.api.domain.inventory.Register;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface InventoryRepository extends JpaRepository<Register, UUID> {

    boolean existsByRecord(String record);

    boolean existsByRecordAndIdNot(String record, UUID id);
}