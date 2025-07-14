package com.techhelpdesk.techhelpdesk_backend.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.techhelpdesk.techhelpdesk_backend.DTO.ChamadoDTO;
import com.techhelpdesk.techhelpdesk_backend.entities.Chamado;
import com.techhelpdesk.techhelpdesk_backend.entities.Usuario;
import com.techhelpdesk.techhelpdesk_backend.repository.UsuarioRepository;
import com.techhelpdesk.techhelpdesk_backend.service.ChamadoService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@CrossOrigin("*")
@RequestMapping("/chamados")
public class ChamadoController {

    @Autowired
    private ChamadoService chamadoService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/novo")
    public ResponseEntity<?> novoChamado(@RequestBody ChamadoDTO chamado) {
        System.out.println("POST /chamados recebido: " + chamado);
        try {

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            Usuario usuario = (Usuario) auth.getPrincipal();

            Chamado novoChamado = new Chamado(chamado.titulo(), chamado.descricao(), LocalDateTime.now(),
                    chamado.prioridade(),
                    chamado.status(), chamado.categoria());

            novoChamado.setUsuario(usuario);
            System.out.println("Novo chamado criado: " + novoChamado);

            Chamado chamadoSalvo = chamadoService.novoChamado(novoChamado);
            System.out.println("Chamado salvo: " + chamadoSalvo);

            return ResponseEntity.ok(chamadoSalvo);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao criar chamado");
        }
    }

    @PutMapping("emAndamento/{id}")
    public ResponseEntity<?> emAndamento(@PathVariable Long id, @RequestBody Chamado chamado) {
        try {
            System.out.println("chamado recebido: " + chamado);
            Chamado chamadoAtualizado = chamadoService.atualizarChamado(id, chamado);
            return ResponseEntity.ok().body("Chamado atualizado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao atualizar chamado: " + e.getMessage());
        }
    }

    @GetMapping("/meus-chamados")
    public ResponseEntity<?> listarChamadosDoUsuario() {
        try {
            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            Usuario usuario = usuarioRepository.findByEmail(email);

            List<Chamado> chamados = chamadoService.listarChamados(usuario.getId());
            return ResponseEntity.ok(chamados);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao buscar chamados");
        }
    }

    @PostMapping("/todos-chamados")
    public ResponseEntity<?> listarTodosOsChamados(@RequestBody Map<String, String> filtros) {
        try {
            List<Chamado> chamados = chamadoService.listarTodosChamados(filtros);
            return ResponseEntity.ok(chamados);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao buscar todos os chamados");
        }
    }
}
