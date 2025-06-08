package com.techhelpdesk.techhelpdesk_backend.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.techhelpdesk.techhelpdesk_backend.entities.Usuario;
import com.techhelpdesk.techhelpdesk_backend.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;


    public Usuario criarUsuario(Usuario usuario){
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> buscarUsuario(UUID id){
        return usuarioRepository.findById(id);
    }

    public Usuario editarUsuario(Usuario usuario){
        if(usuarioRepository.existsById(usuario.getId())){
            return usuarioRepository.save(usuario);
        } else{
            throw new RuntimeException("Usuário não encontrado");
        }
    }

    public Boolean removerUsuario(UUID id){
        if(usuarioRepository.existsById(id)){
            usuarioRepository.deleteById(id);
            return true;
        } else{
            return false;
        }
    }
}
