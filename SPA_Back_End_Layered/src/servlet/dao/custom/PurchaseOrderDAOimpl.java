package servlet.dao.custom;


import servlet.entity.Order;

import javax.persistence.EntityManager;

public class PurchaseOrderDAOimpl {

    private EntityManager entityManager;

    public void addOrder(Order order) {

        entityManager.persist(order);
    }

}
