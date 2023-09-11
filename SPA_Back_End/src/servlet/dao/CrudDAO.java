package servlet.dao;

import java.util.List;

public interface CrudDAO<T> extends SuperDAO {
    public List<T> getAll();

    public void add(T entity);

    public boolean update(T entity);

    public boolean delete(String id);
}
