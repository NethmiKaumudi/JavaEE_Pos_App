package servlet.bo.custom;

import servlet.bo.ItemBO;
import servlet.dao.custom.ItemDAOimpl;
import servlet.dto.ItemDTO;
import servlet.entity.Item;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;

public class ItemBOimpl implements ItemBO {
    private ItemDAOimpl itemDAOimpl;
    private Item item;

    public ArrayList<ItemDTO> getAllItems(Connection connection) throws SQLException {

        ArrayList<ItemDTO> allItems= new ArrayList<>();

        ArrayList<Item> allEntity = itemDAOimpl.getAll(connection);
        for (Item i : allEntity) {
            allItems.add(new ItemDTO(i.getCode(),i.getItemName(),i.getQty(),i.getPrice()));
        }
        return allItems;
    }

    @Override
    public boolean addItem(ItemDTO dto, Connection connection) throws SQLException {
        return itemDAOimpl.add(new Item(dto.getCode(),dto.getItemName(),dto.getQty(),dto.getPrice()),connection);
    }

    @Override
    public boolean updateItem(ItemDTO dto, Connection connection) throws SQLException {
        return itemDAOimpl.update(new Item(dto.getCode(),dto.getItemName(),dto.getQty(),dto.getPrice()),connection);

    }

    @Override
    public boolean deleteItem(String code, Connection connection) throws SQLException {
        return itemDAOimpl.delete(code,connection);
    }


}
