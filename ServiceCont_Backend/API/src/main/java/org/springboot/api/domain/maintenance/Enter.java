package org.springboot.api.domain.maintenance;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Table(name = "maintenance")
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Enter {

    @Id
    @GeneratedValue
    private UUID id;

    private String typeEquipment;
    private String mark;
    private String model;
    private String serial;
    private String record;
    private Date date;
    private String school;
    private String nameTechnical;
    private String observation;

}
