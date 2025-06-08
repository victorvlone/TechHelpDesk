package com.techhelpdesk.techhelpdesk_backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.techhelpdesk.techhelpdesk_backend.entities.Usuario;
import com.techhelpdesk.techhelpdesk_backend.service.UsuarioService;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@CrossOrigin("*")
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PutMapping("/{id}")
    public ResponseEntity<?> editarUsuario(@PathVariable UUID id, @RequestBody Usuario usuario) {
        try {
            usuario.setId(id);
            Usuario usuarioEditado = usuarioService.editarUsuario(usuario);
            return ResponseEntity.ok(usuarioEditado);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao editar usuário");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> apagarUsuario(@PathVariable UUID id){
        try{
            Boolean usuarioRemovido = usuarioService.removerUsuario(id);
            return ResponseEntity.ok(usuarioRemovido);
        } catch (Exception e){
            return ResponseEntity.status(500).body("Erro ao remover usuario");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarUsuario(@PathVariable UUID id) {
        try{
            Optional<Usuario> usuarioEncontrado = usuarioService.buscarUsuario(id);
            if(usuarioEncontrado.isPresent()){
                return ResponseEntity.ok(usuarioEncontrado);
            } else{
                return ResponseEntity.status(404).body("Usuario não encontrado");
            }
        } catch (Exception e){
            return ResponseEntity.status(500).body("Erro em buscar usuario!");
        }
    }
    
}
