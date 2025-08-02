package com.techhelpdesk.techhelpdesk_backend.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.techhelpdesk.techhelpdesk_backend.DTO.UsuarioDTO;
import com.techhelpdesk.techhelpdesk_backend.entities.Usuario;
import com.techhelpdesk.techhelpdesk_backend.service.UsuarioService;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@CrossOrigin("*")
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> editarUsuario(
            @PathVariable UUID id,
            @RequestPart("primeiroNome") String primeiroNome,
            @RequestPart("ultimoNome") String ultimoNome,
            @RequestPart(value = "fotoDePerfil", required = false) MultipartFile fotoDePerfil,
            @RequestPart(value = "fotoDeCapa", required = false) MultipartFile fotoDeCapa) {
        try {
            Usuario usuario = new Usuario();
            usuario.setId(id);
            usuario.setPrimeiroNome(primeiroNome);
            usuario.setUltimoNome(ultimoNome);

            Usuario usuarioEditado = usuarioService.editarUsuario(usuario, fotoDePerfil, fotoDeCapa);

            // Mapeia para o DTO
            UsuarioDTO dto = new UsuarioDTO(
                    usuarioEditado.getId(),
                    usuarioEditado.getPrimeiroNome(),
                    usuarioEditado.getUltimoNome(),
                    usuarioEditado.getFotoDePerfil(),
                    usuarioEditado.getFotoDeCapa(),
                    usuarioEditado.getTipodeUsuario());

            return ResponseEntity.ok(dto);
        } catch (RuntimeException e) {
        return ResponseEntity.status(500).body(Map.of("erro", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao editar usuário");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> apagarUsuario(@PathVariable UUID id) {
        try {
            Boolean usuarioRemovido = usuarioService.removerUsuario(id);
            return ResponseEntity.ok(usuarioRemovido);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao remover usuario");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarUsuario(@PathVariable UUID id) {
        try {
            Optional<Usuario> usuarioEncontrado = usuarioService.buscarUsuario(id);
            if (usuarioEncontrado.isPresent()) {
                return ResponseEntity.ok(usuarioEncontrado);
            } else {
                return ResponseEntity.status(404).body("Usuario não encontrado");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro em buscar usuario!");
        }
    }

}
