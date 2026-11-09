package org.springboot.api.domain.user;

import jakarta.validation.constraints.NotBlank;

public record UserRequestDTO(@NotBlank String name, @NotBlank String password) {}

