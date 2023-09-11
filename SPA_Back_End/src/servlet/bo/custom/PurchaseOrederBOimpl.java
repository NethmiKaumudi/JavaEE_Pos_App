package servlet.bo.custom;

import lk.ijse.pos.servlet.bo.PurchaseOrderBO;
import lk.ijse.pos.servlet.dao.custom.PurchaseOrderDAOimpl;
import lk.ijse.pos.servlet.dto.OrderDTO;
import lk.ijse.pos.servlet.entity.Order;

public class PurchaseOrederBOimpl implements PurchaseOrderBO {
    //    public List<CustomerDTO> getAllCustomers() {
//        List<Customer> entities = customerDAOimpl.getAll();
//        return entities.stream()
//                .map(this::convertToDTO)
//                .collect(Collectors.toList());
//    }
//
//
//    public void addCustomers(CustomerDTO dto) {
//        customer = new Customer();
//        customer.setId(dto.getId());
//        customer.setName(dto.getName());
//        customer.setAddress(dto.getAddress());
//        customer.setSalary(dto.getSalary());
//        customerDAOimpl.add(customer);
//
//
//    }
//
//    public boolean updateCustomer(CustomerDTO dto) {
//        customer = new Customer();
//        customer.setId(dto.getId());
//        customer.setName(dto.getName());
//        customer.setAddress(dto.getAddress());
//        customer.setSalary(dto.getSalary());
//        return customerDAOimpl.update(customer);
//    }
    private PurchaseOrderDAOimpl purchaseOrderDAOimpl;
    public void addOrder(OrderDTO dto) {
        Order order = new Order();
        order.setoId(order.getoId());
        order.setDate(order.getDate());
        order.setId(order.getId());
         purchaseOrderDAOimpl.addOrder(order);
    }

}
