package com.example.enquetebackend.service;

import com.example.enquetebackend.dto.NovoItemDTO;
import com.example.enquetebackend.dto.VotoDTO;
import com.example.enquetebackend.entity.Enquete;
import com.example.enquetebackend.entity.Item;
import com.example.enquetebackend.entity.Sabor;
import com.example.enquetebackend.entity.Voto;
import com.example.enquetebackend.exceptions.ErroPadrao;
import com.example.enquetebackend.repository.EnqueteRepository;
import com.example.enquetebackend.repository.ItemRepository;
import com.example.enquetebackend.repository.SaborRepository;
import com.example.enquetebackend.repository.VotoRespository;
import com.example.enquetebackend.util.RespostasEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ItemService {

    private final ItemRepository itemRepository;
    private final SaborRepository saborRepository;

    @Autowired
    public ItemService(ItemRepository itemRepository, SaborRepository saborRepository){
        this.itemRepository = itemRepository;
        this.saborRepository = saborRepository;
    }

    public void novoItem(NovoItemDTO dto){
        Optional<Sabor> saborOp = saborRepository.findById(dto.getSabor_id());
        if(saborOp.isEmpty()) throw new ErroPadrao("Sabor não encontrado.", HttpStatus.NOT_FOUND);
        Item item = new Item(
                dto.getNomeCliente(),
                dto.getQuantidade(),
                saborOp.get()
        );
        itemRepository.save(item);
    }

    public List<Item> listarItens(){
        return itemRepository.findAll().stream().collect(Collectors.toList());
    }
}
