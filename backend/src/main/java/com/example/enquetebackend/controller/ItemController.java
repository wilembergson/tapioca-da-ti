package com.example.enquetebackend.controller;

import com.example.enquetebackend.dto.NovoItemDTO;
import com.example.enquetebackend.dto.VotoDTO;
import com.example.enquetebackend.entity.Item;
import com.example.enquetebackend.entity.Voto;
import com.example.enquetebackend.service.ItemService;
import com.example.enquetebackend.service.VotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/item")
public class ItemController {
    private ItemService service;

    @Autowired
    public ItemController(ItemService service){
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Object> novaResposta(@RequestBody NovoItemDTO dto){
        this.service.novoItem(dto);
        return new ResponseEntity<>(Map.of("mensagem", "Novo voto adicionado."), HttpStatus.CREATED);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Item>> listar(){
        return ResponseEntity.ok(service.listarItens());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> obterPorId(@PathVariable String id){
        Item item = service.obterPorId(Integer.parseInt(id));
        return ResponseEntity.ok(item);
    }
}
