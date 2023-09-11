package servlet.dao.custom;

import lk.ijse.pos.servlet.dao.ItemDAO;
import lk.ijse.pos.servlet.entity.Item;

import javax.persistence.EntityManager;
import java.util.List;

public class ItemDAOimpl implements ItemDAO {

    private EntityManager entityManager;

    @Override
    public List<Item> getAll() {
        return entityManager.createQuery("SELECT i from Item i", Item.class).getResultList();
    }

    @Override
    public void add(Item item) {
        entityManager.persist(item);

    }

    @Override
    public boolean update(Item item) {
        try {
            entityManager.merge(item);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean delete(String code) {
        Item item = entityManager.find(Item.class, code);
        if (item != null) {
            entityManager.remove(item);
            return true;
        } else {
            return false;
        }
    }
}
