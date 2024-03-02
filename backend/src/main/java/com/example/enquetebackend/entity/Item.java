package com.example.enquetebackend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="ITEM")
@Data
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Item {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "NOME_CLIENTE")
    private String nomeCliente;

    @Column(name = "QUANTIDADE")
    private Integer quantidade;

    @ManyToOne
    @JoinColumn(name = "SABOR_ID")
    @JsonManagedReference
    private Sabor sabor;

    public Item(String nomeCliente, Integer quantidade, Sabor sabor) {
        this.nomeCliente = nomeCliente;
        this.quantidade = quantidade;
        this.sabor = sabor;
    }

    public Integer getTotal(){
        return quantidade * sabor.getPreco();
    }
}
