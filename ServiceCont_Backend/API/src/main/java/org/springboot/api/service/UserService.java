package org.springboot.api.service;

import org.springboot.api.domain.user.User;
import org.springboot.api.domain.user.UserRequestDTO;
import org.springboot.api.domain.user.UserResponseDTO;
import org.springboot.api.domain.user.UserRole;
import org.springboot.api.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserResponseDTO createUser(UserRequestDTO data) {
        String name = data.name().trim();

        if (repository.existsByName(name)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Usuário já existe");
        }

        User user = new User();
        user.setName(name);
        user.setPassword(passwordEncoder.encode(data.password()));
        user.setRole(UserRole.USER);

        User saved = repository.save(user);
        return new UserResponseDTO(saved.getId(), saved.getName(), saved.getRole().name());
    }
}
