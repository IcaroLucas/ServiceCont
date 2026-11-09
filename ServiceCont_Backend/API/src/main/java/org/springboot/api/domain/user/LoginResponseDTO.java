package org.springboot.api.domain.user;

import java.util.UUID;

public record LoginResponseDTO(String token, String name, String role) {}
