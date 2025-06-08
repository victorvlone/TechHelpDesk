package com.techhelpdesk.techhelpdesk_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.techhelpdesk.techhelpdesk_backend.DTO.AuthenticationDTO;
import com.techhelpdesk.techhelpdesk_backend.DTO.LoginResponseDTO;
import com.techhelpdesk.techhelpdesk_backend.DTO.RegisterDTO;
import com.techhelpdesk.techhelpdesk_backend.entities.Usuario;
import com.techhelpdesk.techhelpdesk_backend.repository.UsuarioRepository;
import com.techhelpdesk.techhelpdesk_backend.service.TokenService;

import lombok.var;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationDTO data){
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.senha());
        var auth = authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((Usuario) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDTO data){
        if(this.usuarioRepository.findByEmail(data.email()) != null) return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.senha());
        Usuario novoUsuario = new Usuario(data.primeiroNome(), data.ultimoNome(), data.email(), encryptedPassword, data.tipoDeUsuario());

        this.usuarioRepository.save(novoUsuario);

        return ResponseEntity.ok().build();
    }

}
