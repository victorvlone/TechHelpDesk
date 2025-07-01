package com.techhelpdesk.techhelpdesk_backend.DTO;

import com.techhelpdesk.techhelpdesk_backend.entities.Categoria;
import com.techhelpdesk.techhelpdesk_backend.entities.Prioridade;
import com.techhelpdesk.techhelpdesk_backend.entities.Status;

public record ChamadoDTO(String titulo, String descricao, Prioridade prioridade, Categoria categoria, Status status) {

}
