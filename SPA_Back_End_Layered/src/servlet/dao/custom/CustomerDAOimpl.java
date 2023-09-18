package servlet.dao.custom;


import servlet.bo.custom.CustomerBOimpl;
import servlet.dao.CustomerDAO;
import servlet.entity.Customer;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;


public class CustomerDAOimpl implements CustomerDAO {
    private CustomerBOimpl customerBOimpl;


    @Override
    public ArrayList<Customer> getAll(Connection connection) throws SQLException {
        ArrayList<Customer> allCustomers = new ArrayList<>();
        ResultSet resultSet = connection.createStatement().executeQuery("Select * from customer");

        while (resultSet.next()) {
            Customer customer = new Customer(resultSet.getString("id"), resultSet.getString("name"), resultSet.getString("address"), resultSet.getString("salary"));
            allCustomers.add(customer);
        }
        return allCustomers;
    }

    @Override
    public boolean add(Customer entity, Connection connection) throws SQLException {
        return connection.createStatement().executeUpdate
                ("INSERT INTO customer VALUES ('" + entity.getId() + "','" + entity.getName() + "','" + entity.getAddress() + "','" + entity.getSalary() + "')")>0;
    }

    @Override
    public boolean update(Customer entity, Connection connection) throws SQLException {

        return connection.createStatement().executeUpdate("UPDATE customer SET  name='"+entity.getName()+"',address='"+entity.getAddress()+"', '"+entity.getSalary()+"' Where cId='"+entity.getId()+"'")>0;}

    @Override
    public boolean delete(String id, Connection connection) throws SQLException {
        return connection.createStatement().executeUpdate("DELETE FROM customer WHERE id ='"+id+"'")>0;
    }
}
