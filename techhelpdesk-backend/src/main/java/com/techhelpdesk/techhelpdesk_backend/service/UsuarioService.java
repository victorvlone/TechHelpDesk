package com.techhelpdesk.techhelpdesk_backend.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.techhelpdesk.techhelpdesk_backend.entities.Usuario;
import com.techhelpdesk.techhelpdesk_backend.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario criarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> buscarUsuario(UUID id) {
        return usuarioRepository.findById(id);
    }

    public String salvarArquivo(MultipartFile file) {
        try {
            String nomeOriginal = file.getOriginalFilename().replaceAll("\\s+", "_");
            String nomeArquivo = UUID.randomUUID() + "_" + nomeOriginal;

            Path pasta = Paths.get("uploads");
            if (!Files.exists(pasta)) {
                Files.createDirectories(pasta); // Garante que a pasta exista
            }

            Path caminhoFinal = pasta.resolve(nomeArquivo); // Caminho final com nome da imagem
            Files.copy(file.getInputStream(), caminhoFinal, StandardCopyOption.REPLACE_EXISTING);

            return "/uploads/" + nomeArquivo;
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Erro ao salvar o arquivo", e);
        }
    }

    public Usuario editarUsuario(Usuario usuarioAtualizado, MultipartFile fotoDePerfil, MultipartFile fotoDeCapa) {
        Optional<Usuario> optionalUsuario = usuarioRepository.findById(usuarioAtualizado.getId());

        if (optionalUsuario.isEmpty()) {
            throw new RuntimeException("Usuário não encontrado");
        }

        Usuario usuarioExistente = optionalUsuario.get();

        // Atualiza somente se veio algo novo
        if (usuarioAtualizado.getPrimeiroNome() != null && !usuarioAtualizado.getPrimeiroNome().isBlank()) {
            usuarioExistente.setPrimeiroNome(usuarioAtualizado.getPrimeiroNome());
        }

        if (usuarioAtualizado.getUltimoNome() != null && !usuarioAtualizado.getUltimoNome().isBlank()) {
            usuarioExistente.setUltimoNome(usuarioAtualizado.getUltimoNome());
        }

        // Lógica para salvar as imagens (exemplo simplificado)
        if (fotoDePerfil != null && !fotoDePerfil.isEmpty()) {
            String caminhoPerfil = salvarArquivo(fotoDePerfil); // ou armazenar em base64, etc.
            usuarioExistente.setFotoDePerfil(caminhoPerfil);
        }

        if (fotoDeCapa != null && !fotoDeCapa.isEmpty()) {
            String caminhoCapa = salvarArquivo(fotoDeCapa);
            usuarioExistente.setFotoDeCapa(caminhoCapa);
        }

        return usuarioRepository.save(usuarioExistente);
    }

    public Boolean removerUsuario(UUID id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
