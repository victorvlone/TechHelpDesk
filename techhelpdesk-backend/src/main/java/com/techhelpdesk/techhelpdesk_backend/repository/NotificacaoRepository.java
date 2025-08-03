package com.techhelpdesk.techhelpdesk_backend.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.techhelpdesk.techhelpdesk_backend.entities.Notificacao;

public interface NotificacaoRepository extends JpaRepository<Notificacao, Long> {

    public List<Notificacao> findAllByDestinatario_IdAndLidaFalse(UUID id);
}
