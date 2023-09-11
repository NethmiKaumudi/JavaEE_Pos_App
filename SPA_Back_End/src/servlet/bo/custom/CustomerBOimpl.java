package servlet.bo.custom;

import lk.ijse.pos.servlet.bo.CustomerBO;
import lk.ijse.pos.servlet.dao.custom.CustomerDAOimpl;
import lk.ijse.pos.servlet.dto.CustomerDTO;
import lk.ijse.pos.servlet.entity.Customer;

import java.util.List;
import java.util.stream.Collectors;

public class CustomerBOimpl implements CustomerBO {
    private CustomerDAOimpl customerDAOimpl;
    private Customer customer;

    public List<CustomerDTO> getAllCustomers() {
        List<Customer> entities = customerDAOimpl.getAll();
        return entities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }


    public void addCustomers(CustomerDTO dto) {
        customer = new Customer();
        customer.setId(dto.getId());
        customer.setName(dto.getName());
        customer.setAddress(dto.getAddress());
        customer.setSalary(dto.getSalary());
        customerDAOimpl.add(customer);


    }

    public boolean updateCustomer(CustomerDTO dto) {
        customer = new Customer();
        customer.setId(dto.getId());
        customer.setName(dto.getName());
        customer.setAddress(dto.getAddress());
        customer.setSalary(dto.getSalary());
        return customerDAOimpl.update(customer);
    }

    public boolean deleteCustomer(String id) {
        return customerDAOimpl.delete(id);
    }

    private CustomerDTO convertToDTO(Customer entity) {
        CustomerDTO dto = new CustomerDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setAddress(entity.getAddress());
        dto.setSalary(entity.getSalary());
        return dto;
    }
}
