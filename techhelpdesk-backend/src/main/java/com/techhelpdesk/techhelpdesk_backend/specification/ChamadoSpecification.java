package com.techhelpdesk.techhelpdesk_backend.specification;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.domain.Specification;

import com.techhelpdesk.techhelpdesk_backend.entities.Categoria;
import com.techhelpdesk.techhelpdesk_backend.entities.Chamado;
import com.techhelpdesk.techhelpdesk_backend.entities.Prioridade;
import com.techhelpdesk.techhelpdesk_backend.entities.Status;

import jakarta.persistence.criteria.Predicate;

public class ChamadoSpecification {

    public static Specification<Chamado> chamadosPor(Map<String, String> filtros) {
        return (root, query, builder) -> {

            List<Predicate> predicates = new ArrayList<>();

            for (Map.Entry<String, String> entry : filtros.entrySet()) {
                String campo = entry.getKey(); // exemplo: "status" ou "prioridade"
                String valor = entry.getValue(); // exemplo: "EM_ABERTO" ou "BAIXA"

                try {
                    switch (campo) {
                        case "status":
                            predicates.add(builder.equal(root.get("status"), Status.valueOf(valor)));
                            break;
                        case "prioridade":
                            predicates.add(builder.equal(root.get("prioridade"), Prioridade.valueOf(valor)));
                            break;
                        case "categoria":
                            predicates.add(builder.equal(root.get("categoria"), Categoria.valueOf(valor)));
                            break;
                        default:
                            predicates.add(builder.equal(root.get(campo), valor));
                    }
                } catch (Exception e) {
                }
            }

            return builder.and(predicates.toArray(new Predicate[0]));
        };
    }

}
