package com.techhelpdesk.techhelpdesk_backend.DTO;

import com.techhelpdesk.techhelpdesk_backend.entities.Categoria;
import com.techhelpdesk.techhelpdesk_backend.entities.Prioridade;
import com.techhelpdesk.techhelpdesk_backend.entities.Status;
import com.techhelpdesk.techhelpdesk_backend.entities.Usuario;

public record ChamadoDTO(Usuario cliente, String titulo, String descricao, Prioridade prioridade, Categoria categoria, Status status) {

}
