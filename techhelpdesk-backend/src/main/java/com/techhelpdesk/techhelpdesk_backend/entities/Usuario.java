package com.techhelpdesk.techhelpdesk_backend.entities;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

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
public class Usuario implements UserDetails {

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

    public Usuario(String primeiroNome, String ultimoNome, String email, String senha, TipoDeUsuario tipodeUsuario) {
        this.primeiroNome = primeiroNome;
        this.ultimoNome = ultimoNome;
        this.email = email;
        this.senha = senha;
        this.tipodeUsuario = tipodeUsuario;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(this.tipodeUsuario == TipoDeUsuario.ADMIN){
            return List.of(
            new SimpleGrantedAuthority("ROLE_ADMIN"), 
            new SimpleGrantedAuthority("ROLE_USER"));
        } else {
            return List.of(new SimpleGrantedAuthority("ROLE_USER"));
        }
    }

    @Override
    public String getPassword() {
        // TODO Auto-generated method stub
        return senha;
    }

    @Override
    public String getUsername() {
        return email;
    }
}
