package servlet.bo;

import lk.ijse.pos.servlet.dto.ItemDTO;

import java.util.List;

public interface ItemBO extends SuperBO {
    public List<ItemDTO> getAllItems();

    public void addItem(ItemDTO dto);

    public boolean updateItem(ItemDTO dto);

    public boolean deleteItem(String code);

}
