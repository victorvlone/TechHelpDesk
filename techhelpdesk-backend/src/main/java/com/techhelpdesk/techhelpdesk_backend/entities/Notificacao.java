package com.techhelpdesk.techhelpdesk_backend.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Notificacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "mensagem", length = 500, nullable = false)
    private String mensagem;

    @Column(name = "lida", nullable = false)
    private Boolean lida = false;

    @Column(name = "data", nullable = false)
    private LocalDateTime data = LocalDateTime.now();

    @ManyToOne
    private Usuario destinatario;

}
