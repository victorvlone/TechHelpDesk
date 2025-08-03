package com.techhelpdesk.techhelpdesk_backend.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.techhelpdesk.techhelpdesk_backend.DTO.NotificacaoDTO;
import com.techhelpdesk.techhelpdesk_backend.entities.Notificacao;
import com.techhelpdesk.techhelpdesk_backend.entities.Usuario;
import com.techhelpdesk.techhelpdesk_backend.repository.NotificacaoRepository;

@Service
public class NotificacaoService {

    @Autowired
    private NotificacaoRepository notificacaoRepository;

    public void criar(String mensagem, Usuario destinatario) {
        Notificacao n = new Notificacao();
        n.setMensagem(mensagem);
        n.setDestinatario(destinatario);
        notificacaoRepository.save(n);
    }

    public List<Notificacao> naoLidas(UUID id) {
        return notificacaoRepository.findAllByDestinatario_IdAndLidaFalse(id);
    }

    public Optional<Notificacao> marcarComoLido(Long id, NotificacaoDTO dto) {
        Optional<Notificacao> opNotificacao = notificacaoRepository.findById(id);

        if (opNotificacao.isEmpty()) {
            Optional.empty();
        }

        Notificacao notificacao = opNotificacao.get();
        notificacao.setLida(dto.lida());
        notificacaoRepository.save(notificacao);

        return Optional.of(notificacao);
    }

}
