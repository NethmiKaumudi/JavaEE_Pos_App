package servlet.bo;

import lk.ijse.pos.servlet.dto.CustomerDTO;

import java.util.List;

public interface CustomerBO extends SuperBO {
    public List<CustomerDTO> getAllCustomers();

    public void addCustomers(CustomerDTO dto) ;

    public boolean updateCustomer(CustomerDTO dto) ;

    public boolean deleteCustomer(String id);

}
