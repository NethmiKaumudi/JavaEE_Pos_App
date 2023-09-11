package servlet.dao.custom;

import lk.ijse.pos.servlet.entity.Order;

import javax.persistence.EntityManager;

public class PurchaseOrderDAOimpl {

    private EntityManager entityManager;

    public void addOrder(Order order) {
        entityManager.persist(order);
    }

}
