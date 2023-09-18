package servlet.dao.custom;


import servlet.dao.ItemDAO;
import servlet.entity.Item;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class ItemDAOimpl implements ItemDAO {


    @Override
    public ArrayList<Item> getAll(Connection connection) throws SQLException {
        ArrayList<Item> allItems = new ArrayList();
        ResultSet rst = connection.createStatement().executeQuery("SELECT *FROM item");
        while (rst.next()) {
            Item item = new Item(rst.getString("code"), rst.getString("itemName"), rst.getInt("qty"), rst.getDouble("price"));
            allItems.add(item);
        }
        return allItems;

    }

    @Override
    public boolean add(Item entity, Connection connection) throws SQLException {
        return connection.createStatement().executeUpdate("INSERT INTO item VALUES ('" + entity.getCode() + "','" + entity.getItemName() + "','" + entity.getQty() + "','" + entity.getPrice() + "')") > 0;

    }

    @Override
    public boolean update(Item entity, Connection connection) throws SQLException {
        return connection.createStatement().executeUpdate("UPDATE item SET  itemName='" + entity.getItemName() + "',qty='" + entity.getQty() + "',price='" + entity.getPrice() + "' WHERE code='" + entity.getCode() + "'") > 0;

    }

    @Override
    public boolean delete(String code, Connection connection) throws SQLException {
        return connection.createStatement().executeUpdate("DELETE FROM  item WHERE itemName='"+code+"' ")>0;
    }
}
