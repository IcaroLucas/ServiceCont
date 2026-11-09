package org.springboot.api.service;

import org.springboot.api.domain.inventory.Register;
import org.springboot.api.domain.inventory.RegisterRequestDTO;
import org.springboot.api.repository.InventoryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
public class InventoryService {

    private final InventoryRepository repository;

    public InventoryService (InventoryRepository repository) {

        this.repository = repository;
    }

    //CREATE
    public Register createRegister(RegisterRequestDTO data) {
        validate(data);
        checkDuplicateRecord(data.record(), null);
        Register register = new Register();
        fill(register, data);
        return repository.save(register);
    }

    //READ
    public List<Register> listRegisters() {
        return repository.findAll();
    }

    //READ ONE
    public Register findById(UUID id) {
        return repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item não encontrado"));
    }

    //UPDATE
    public Register updateRegister(UUID id, RegisterRequestDTO data) {
        validate(data);
        Register register = findById(id);
        checkDuplicateRecord(data.record(), id);
        fill(register, data);
        return repository.save(register);
    }

    //DELETE
    public void deleteRegister(UUID id) {
        Register register = findById(id);
        repository.delete(register);
    }

    private void fill(Register register, RegisterRequestDTO data) {
        register.setStatus(data.status());
        register.setItemName(data.itemName());
        register.setMark(data.mark());
        register.setModel(data.model());
        register.setAmount(data.amount());
        register.setSerial(data.serial());
        register.setRecord(data.record());
        register.setObservation(data.observation());
    }

    private void validate(RegisterRequestDTO data) {
        if("consumable".equals(data.status())) {
            if (data.amount() == null ) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Quantidade é obrigatória para itens consumíveis");
            }
        } else if ("permanent".equals(data.status())) {
            if(data.serial() == null || data.record() == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Serial e tombamento são obrigatórios para itens permanentes");
            }
        } else  {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Status inválido");
        }
    }

    private void checkDuplicateRecord(String record, UUID currentId) {
        if (record == null) return;

        boolean exists = (currentId == null)
                ? repository.existsByRecord(record)
                : repository.existsByRecordAndIdNot(record, currentId);

        if (exists) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Tombamento já cadastrado");
        }
    }
}


