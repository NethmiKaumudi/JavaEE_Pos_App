package servlet.bo.custom;


import servlet.bo.CustomerBO;
import servlet.dao.custom.CustomerDAOimpl;
import servlet.dto.CustomerDTO;
import servlet.entity.Customer;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;

public class CustomerBOimpl implements CustomerBO {
    private CustomerDAOimpl customerDAOimpl;
    private Customer customer;

    public ArrayList<CustomerDTO> getAllCustomers(Connection connection) throws SQLException {
        ArrayList<CustomerDTO> allCustomers = new ArrayList<>();

        ArrayList<Customer> allEntity = customerDAOimpl.getAll(connection);
        for (Customer c : allEntity) {
            allCustomers.add(new CustomerDTO(c.getId(), c.getName(), c.getAddress(), c.getSalary()));
        }
        return allCustomers;

    }


    public boolean addCustomers(CustomerDTO dto, Connection connection) throws SQLException {
        return customerDAOimpl.add(new Customer(dto.getId(), dto.getName(), dto.getAddress(), dto.getSalary()), connection);

    }

    public boolean updateCustomer(CustomerDTO dto, Connection connection) throws SQLException {
        return customerDAOimpl.update(new Customer(dto.getId(), dto.getName(), dto.getAddress(), dto.getSalary()), connection);
    }

    public boolean deleteCustomer(String id, Connection connection) throws SQLException {
        return customerDAOimpl.delete(id, connection);
    }


}
