package servlet.dao;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;

public interface CrudDAO<T> extends SuperDAO {
    public ArrayList<T> getAll(Connection connection) throws SQLException;

    public boolean add(T entity, Connection connection) throws SQLException;

    public boolean update(T entity, Connection connection) throws SQLException;

    public boolean delete(String id, Connection connection) throws SQLException;
}
