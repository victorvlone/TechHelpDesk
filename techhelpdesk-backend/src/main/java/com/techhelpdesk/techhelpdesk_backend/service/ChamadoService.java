package com.techhelpdesk.techhelpdesk_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.techhelpdesk.techhelpdesk_backend.entities.Chamado;
import com.techhelpdesk.techhelpdesk_backend.repository.ChamadoRepository;

@Service
public class ChamadoService {

    @Autowired
    private ChamadoRepository chamadoRepository;

    public Chamado novoChamado(Chamado chamado){
        return chamadoRepository.save(chamado);
    }

    public Chamado atualizarChamado(Chamado chamado){
        if(chamadoRepository.existsById(chamado.getId())){
            return chamadoRepository.save(chamado);
        }else{
            throw new RuntimeException("Chamado não encontrado");
        }
    }

    public Boolean removerUsuario(Long id){
        if(chamadoRepository.existsById(id)){
            chamadoRepository.deleteById(id);
            return true;
        } else{
            return false;
        }
    }
}
