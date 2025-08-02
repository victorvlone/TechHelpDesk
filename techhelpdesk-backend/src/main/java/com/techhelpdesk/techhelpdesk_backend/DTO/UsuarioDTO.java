package com.techhelpdesk.techhelpdesk_backend.DTO;

import java.util.UUID;

import com.techhelpdesk.techhelpdesk_backend.entities.TipoDeUsuario;

public record UsuarioDTO(UUID id, String primeiroNome, String segundoNome, String fotoDePerfil, String fotoDeCapa, TipoDeUsuario tipodeUsuario) {

}
