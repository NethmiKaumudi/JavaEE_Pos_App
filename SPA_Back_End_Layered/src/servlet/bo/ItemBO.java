package servlet.bo;

import servlet.dto.ItemDTO;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;


public interface ItemBO extends SuperBO {
    public ArrayList<ItemDTO> getAllItems(Connection connection) throws SQLException;

    public boolean addItem(ItemDTO dto, Connection connection) throws SQLException;

    public boolean updateItem(ItemDTO dto,Connection connection) throws SQLException;

    public boolean deleteItem(String code,Connection connection) throws SQLException;

}
