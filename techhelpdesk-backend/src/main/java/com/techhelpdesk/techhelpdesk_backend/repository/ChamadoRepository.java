package com.techhelpdesk.techhelpdesk_backend.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.techhelpdesk.techhelpdesk_backend.entities.Chamado;

public interface ChamadoRepository extends JpaRepository<Chamado, Long>, JpaSpecificationExecutor<Chamado>{

    public List<Chamado> findAllByUsuarioId(UUID id);
}
