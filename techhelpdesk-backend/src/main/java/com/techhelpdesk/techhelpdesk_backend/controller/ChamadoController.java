package com.techhelpdesk.techhelpdesk_backend.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.techhelpdesk.techhelpdesk_backend.DTO.ChamadoDTO;
import com.techhelpdesk.techhelpdesk_backend.entities.Chamado;
import com.techhelpdesk.techhelpdesk_backend.service.ChamadoService;

@RestController
@CrossOrigin("*")
@RequestMapping("/chamados")
public class ChamadoController {

    @Autowired
    private ChamadoService chamadoService;

    @PostMapping("/novo")
    public ResponseEntity<?> novoChamado(@RequestBody ChamadoDTO chamado) {
        System.out.println("POST /chamados recebido: " + chamado);
        try {
            Chamado novoChamado = new Chamado(chamado.titulo(), chamado.descricao(), LocalDateTime.now(),
                    chamado.prioridade(),
                    chamado.status(), chamado.categoria());

            System.out.println("Novo chamado criado: " + novoChamado);

            Chamado chamadoSalvo = chamadoService.novoChamado(novoChamado);
            System.out.println("Chamado salvo: " + chamadoSalvo);

            return ResponseEntity.ok(chamadoSalvo);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao criar chamado");
        }
    }
}
