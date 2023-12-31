package lk.ijse.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {
    private static DBConnection dbConnection;
    private Connection connection;

    private DBConnection() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/javaEE_pos_app", "root", "1234");

        } catch (ClassNotFoundException | SQLException exception) {
            exception.printStackTrace();
        }
    }

    public static DBConnection getDbConnection(){
        return dbConnection==null ? dbConnection=new DBConnection() : dbConnection;
    }
    public Connection getConnection(){
        return connection;
    }
}
