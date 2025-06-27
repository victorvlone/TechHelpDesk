package com.techhelpdesk.techhelpdesk_backend.DTO;

public record LoginResponseDTO(String token, String tipoDeUsuario) {

    public LoginResponseDTO(String token, String tipoDeUsuario) {
        this.token = token;
        this.tipoDeUsuario = tipoDeUsuario;
    }

}
