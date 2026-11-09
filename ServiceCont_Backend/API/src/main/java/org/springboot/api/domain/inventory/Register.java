package org.springboot.api.domain.inventory;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Table(name = "inventory")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Register {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String status;
    private String itemName;
    private String mark;
    private String model;
    private Integer amount;
    private String serial;
    private String record;
    private String observation;

}
