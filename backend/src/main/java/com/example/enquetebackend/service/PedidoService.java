package com.example.enquetebackend.service;

import com.example.enquetebackend.dto.NovoPedidoDTO;
import com.example.enquetebackend.entity.Pedido;
import com.example.enquetebackend.exceptions.ErroPadrao;
import com.example.enquetebackend.repository.PedidoRepository;
import com.example.enquetebackend.util.PedidoStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    public void novoPedido(NovoPedidoDTO dto){
        if(obterPedidoEmCriacao() != null)
            throw new ErroPadrao("Existe um pedido sem ser finalizado.", HttpStatus.CONFLICT);
        Pedido pedido = new Pedido(
                dto.getPix(),
                LocalDateTime.now()
        );
        pedidoRepository.save(pedido);
    }

    public Pedido obterPedidoEmCriacao(){
        Optional<Pedido> pedido = pedidoRepository.findByStatus(PedidoStatus.CRIANDO.getDescricao());
        return pedido.orElse(null);
    }
}
