package com.techhelpdesk.techhelpdesk_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.techhelpdesk.techhelpdesk_backend.entities.Chamado;

public interface ChamadoRepository extends JpaRepository<Chamado, Long>{

}
