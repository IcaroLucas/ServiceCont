package org.springboot.api.service;

import org.springboot.api.domain.maintenance.Enter;
import org.springboot.api.domain.maintenance.EnterRequestDTO;

import java.util.Date;

public class MaintenanceService {
    public Enter createEnter(EnterRequestDTO data) {
        Enter newEnter = new Enter();
        newEnter.setDate(new Date(data.date()));

        return newEnter;
    }
}
