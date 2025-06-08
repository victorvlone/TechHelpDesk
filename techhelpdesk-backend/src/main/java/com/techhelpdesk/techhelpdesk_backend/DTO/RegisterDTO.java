package com.techhelpdesk.techhelpdesk_backend.DTO;

import com.techhelpdesk.techhelpdesk_backend.entities.TipoDeUsuario;

public record RegisterDTO(String primeiroNome, String ultimoNome, String email, String senha, TipoDeUsuario tipoDeUsuario) {

}
