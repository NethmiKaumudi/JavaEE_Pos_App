package servlet.bo.custom;

import lk.ijse.pos.servlet.bo.ItemBO;
import lk.ijse.pos.servlet.dao.custom.ItemDAOimpl;
import lk.ijse.pos.servlet.dto.ItemDTO;
import lk.ijse.pos.servlet.entity.Item;

import java.util.List;
import java.util.stream.Collectors;

public class ItemBOimpl implements ItemBO {
    private ItemDAOimpl itemDAOimpl;
    private Item item;

    public List<ItemDTO> getAllItems() {
        List<Item> allitems = itemDAOimpl.getAll();
        return allitems.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

    }

    public void addItem(ItemDTO dto) {
        item = new Item();
        item.setCode(dto.getCode());
        item.setItemName(dto.getItemName());
        item.setQty(dto.getQty());
        item.setPrice(dto.getPrice());
        itemDAOimpl.add(item);

    }

    public boolean updateItem(ItemDTO dto) {
        item = new Item();
        item.setCode(dto.getCode());
        item.setItemName(dto.getItemName());
        item.setQty(dto.getQty());
        item.setPrice(dto.getPrice());
        return itemDAOimpl.update(item);

    }

    public boolean deleteItem(String code) {
        return itemDAOimpl.delete(code);
    }

    private ItemDTO convertToDTO(Item item) {
        ItemDTO itemDTO = new ItemDTO();
        itemDTO.setCode(item.getCode());
        itemDTO.setItemName(item.getItemName());
        itemDTO.setQty(item.getQty());
        itemDTO.setPrice(item.getPrice());
        return itemDTO;

    }

}
