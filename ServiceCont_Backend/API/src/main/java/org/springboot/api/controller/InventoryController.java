package org.springboot.api.controller;

import jakarta.validation.Valid;
import org.springboot.api.domain.inventory.Register;
import org.springboot.api.domain.inventory.RegisterRequestDTO;
import org.springboot.api.service.InventoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {


    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @PostMapping
    public ResponseEntity<Register> create(@RequestBody @Valid RegisterRequestDTO dto) {
        Register newRegister = inventoryService.createRegister(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(newRegister);
    }

    @GetMapping
    public ResponseEntity<List<Register>> list() {
        return ResponseEntity.ok(inventoryService.listRegisters());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Register> findById(@PathVariable UUID id) {
        return ResponseEntity.ok(inventoryService.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Register> update(@PathVariable UUID id, @RequestBody @Valid RegisterRequestDTO dto) {
        return ResponseEntity.ok(inventoryService.updateRegister(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        inventoryService.deleteRegister(id);
        return ResponseEntity.noContent().build();
    }

}
