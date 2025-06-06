package com.techhelpdesk.techhelpdesk_backend.entities;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name= "primeiroNome", length=100, nullable= false)
    private String primeiroNome;

    @Column(name= "ultimoNome", length=100, nullable= false)
    private String ultimoNome;

    @Column(name = "email", length=100, nullable=false)
    private String email;

    @Column(name = "senha", length=100, nullable=false)
    private String senha;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipodeUsuario", nullable = false)
    private TipoDeUsuario tipodeUsuario;
}
