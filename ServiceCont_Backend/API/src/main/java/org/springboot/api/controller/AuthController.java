package org.springboot.api.controller;

import org.springboot.api.config.security.TokenService;
import org.springboot.api.domain.user.LoginResponseDTO;
import org.springboot.api.domain.user.User;
import org.springboot.api.domain.user.UserRequestDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    public AuthController(AuthenticationManager authenticationManager, TokenService tokenService) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody UserRequestDTO data) {
        var credentials = new UsernamePasswordAuthenticationToken(data.name(), data.password());
        var auth = authenticationManager.authenticate(credentials);

        User user = (User) auth.getPrincipal();
        String token = tokenService.generateToken(user);

        return ResponseEntity.ok(new LoginResponseDTO(token, user.getName(), user.getRole().name()));
    }
}
