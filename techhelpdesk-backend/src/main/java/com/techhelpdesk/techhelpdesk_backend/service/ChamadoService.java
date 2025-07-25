package com.techhelpdesk.techhelpdesk_backend.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.techhelpdesk.techhelpdesk_backend.entities.Chamado;
import com.techhelpdesk.techhelpdesk_backend.entities.Usuario;
import com.techhelpdesk.techhelpdesk_backend.repository.ChamadoRepository;
import com.techhelpdesk.techhelpdesk_backend.repository.UsuarioRepository;
import com.techhelpdesk.techhelpdesk_backend.specification.ChamadoSpecification;

@Service
public class ChamadoService {

    @Autowired
    private ChamadoRepository chamadoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Chamado novoChamado(Chamado chamado) {
        System.out.println("Salvando chamado: " + chamado);
        return chamadoRepository.save(chamado);
    }

    public Chamado atualizarChamado(Long id, Chamado chamado) {
        Chamado chamadoExistente = chamadoRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Chamado não encontrado"));

        chamadoExistente.setStatus(chamado.getStatus());
        if (chamado.getTecnico() != null && chamado.getTecnico().getId() != null) {
        Usuario tecnico = usuarioRepository.findById(chamado.getTecnico().getId())
            .orElseThrow(() -> new RuntimeException("Técnico não encontrado"));
        chamadoExistente.setTecnico(tecnico);
    }

        return chamadoRepository.save(chamadoExistente);
    }

    public List<Chamado> listarChamados(UUID id) {
        try {
            List<Chamado> chamados = chamadoRepository.findAllByUsuarioId(id);
            return chamados;
        } catch (Exception e) {
            throw new RuntimeException("Nenhum chamado encontrado");
        }
    }

    public List<Chamado> listarTodosChamados(Map<String, String> filtros) {
        try {
            List<Chamado> chamados = chamadoRepository.findAll(ChamadoSpecification.chamadosPor(filtros));
            return chamados;
        } catch (Exception e) {
            throw new RuntimeException("Nenhum chamado encontrado");
        }
    }

    public Boolean removerUsuario(Long id) {
        if (chamadoRepository.existsById(id)) {
            chamadoRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    public Optional<Chamado> buscarPorId(Long id) {
        return chamadoRepository.findById(id);
    }

    public List<Chamado> chamadosDoTecnico(UUID id, List<String> status){
        return chamadoRepository.findByTecnicoIdAndStatusIn(id, status);
    }

}
