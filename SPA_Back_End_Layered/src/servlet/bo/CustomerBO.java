package servlet.bo;

import servlet.dto.CustomerDTO;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;

public interface CustomerBO extends SuperBO {
    public ArrayList<CustomerDTO> getAllCustomers(Connection connection) throws SQLException;

    public boolean addCustomers(CustomerDTO dto, Connection connection) throws SQLException;

    public boolean updateCustomer(CustomerDTO dto,Connection connection) throws SQLException;

    public boolean deleteCustomer(String id,Connection connection) throws SQLException;

}
