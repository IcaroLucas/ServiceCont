package org.springboot.api.domain.maintenance;

public record EnterRequestDTO(String typeEquipament, String mark, String model, String serial, String record, Long date, String school, String nameTechnical, String observation) {
}
