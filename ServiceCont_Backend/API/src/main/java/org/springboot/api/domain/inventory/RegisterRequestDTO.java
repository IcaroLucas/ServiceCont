package org.springboot.api.domain.inventory;

public record RegisterRequestDTO(String status, String itemName, String mark, String model, Integer amount, String serial, String record, String observation) {
}
