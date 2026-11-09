package org.springboot.api.config.security;

import org.springframework.beans.factory.annotation.Value;
import org.springboot.api.domain.user.User;
import org.springboot.api.domain.user.UserRole;
import org.springboot.api.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminSeeder implements CommandLineRunner {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final String adminName;
    private final String adminPassword;

    public AdminSeeder(UserRepository repository, PasswordEncoder passwordEncoder,
                       @Value("${app.admin.name}") String adminName,
                       @Value("${app.admin.password}") String adminPassword) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.adminName = adminName;
        this.adminPassword = adminPassword;
    }

    @Override
    public void run(String... args) {
        if (repository.existsByName(adminName)) return;

        User admin = new User();
        admin.setName(adminName);
        admin.setPassword(passwordEncoder.encode(adminPassword));
        admin.setRole(UserRole.ADMIN);
        repository.save(admin);
    }
}
