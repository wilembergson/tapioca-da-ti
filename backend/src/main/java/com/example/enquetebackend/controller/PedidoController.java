package com.example.enquetebackend.controller;

import com.example.enquetebackend.dto.NovoItemDTO;
import com.example.enquetebackend.dto.NovoPedidoDTO;
import com.example.enquetebackend.entity.Item;
import com.example.enquetebackend.entity.Pedido;
import com.example.enquetebackend.service.ItemService;
import com.example.enquetebackend.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/pedido")
public class PedidoController {
    private PedidoService service;

    @Autowired
    public PedidoController(PedidoService service){
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Object> novoPedido(@RequestBody NovoPedidoDTO dto){
        this.service.novoPedido(dto);
        return new ResponseEntity<>(Map.of("mensagem", "Novo pedido criado."), HttpStatus.CREATED);
    }

    @GetMapping("/atual")
    public ResponseEntity<Pedido> listar(){
        return ResponseEntity.ok(service.obterPedidoEmCriacao());
    }
}
