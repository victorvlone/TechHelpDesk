package com.techhelpdesk.techhelpdesk_backend.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import com.techhelpdesk.techhelpdesk_backend.entities.Usuario;


public interface UsuarioRepository extends JpaRepository<Usuario, UUID>{

    UserDetails findByEmail(String email);
}
