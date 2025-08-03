package com.techhelpdesk.techhelpdesk_backend.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.techhelpdesk.techhelpdesk_backend.DTO.NotificacaoDTO;
import com.techhelpdesk.techhelpdesk_backend.entities.Notificacao;
import com.techhelpdesk.techhelpdesk_backend.service.NotificacaoService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin("*")
@RequestMapping("/notificacoes")
public class NotificacaoController {

    @Autowired
    private NotificacaoService notificacaoService;

    @GetMapping("/nao-lidas/{id}")
    public ResponseEntity<?> notificacoesNaoLidas(@PathVariable UUID id) {
        try {
            List<Notificacao> notificacoes = notificacaoService.naoLidas(id);
            return ResponseEntity.ok(notificacoes);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao listar notificações");
        }
    }

    @PostMapping("marcar-como-lido/{id}")
    public ResponseEntity<?> marcarComoLido(@PathVariable Long id, @RequestBody NotificacaoDTO notificacaoDto) {
        try {
            Optional<Notificacao> notAtualizada = notificacaoService.marcarComoLido(id, notificacaoDto);

            if (notAtualizada.isEmpty()) {
                return ResponseEntity.status(404).body("Notificação não encontrada!");
            }
            return ResponseEntity.ok("Notificação atualizada com sucesso");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao atualizar notificação" + e.getMessage());
        }

    }

}
