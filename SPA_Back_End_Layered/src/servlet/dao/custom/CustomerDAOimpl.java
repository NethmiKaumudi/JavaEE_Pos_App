package servlet.dao.custom;

import lk.ijse.pos.servlet.bo.custom.CustomerBOimpl;
import lk.ijse.pos.servlet.dao.CustomerDAO;
import lk.ijse.pos.servlet.entity.Customer;

import javax.persistence.EntityManager;
import java.util.List;


public class CustomerDAOimpl implements CustomerDAO {
    private CustomerBOimpl customerBOimpl;

    private EntityManager entityManager;

    @Override
    public List<Customer> getAll() {
        return entityManager.createQuery("SELECT c FROM Customer c", Customer.class).getResultList();
    }

    @Override
    public void add(Customer customer) {
        entityManager.persist(customer);

    }

    @Override
    public boolean update(Customer customer) {
        try {
            entityManager.merge(customer);
            return true;
        } catch (Exception e) {
            // Handle any exceptions here
            return false;
        }
    }

    @Override
    public boolean delete(String id) {
        Customer customer = entityManager.find(Customer.class, id);
        if (customer != null) {
            entityManager.remove(customer);
            return true;
        }else {
            return false;
        }
    }
}
