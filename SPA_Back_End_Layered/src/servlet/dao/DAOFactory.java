package servlet.dao;


import servlet.dao.custom.CustomerDAOimpl;
import servlet.dao.custom.ItemDAOimpl;

public class DAOFactory {
    private static DAOFactory daoFactory;

    private DAOFactory() {
    }

    public static DAOFactory getBoFactory() {
        return (daoFactory == null) ? daoFactory = new DAOFactory() : daoFactory;
    }

    //Object creation logic for BO objects
    public SuperDAO getDAO(DAOTypes types) {
        switch (types) {
            case CUSTOMER:
                return new CustomerDAOimpl();
            case ITEM:
                return new ItemDAOimpl();
//            case PLACEORDER:
//                return new PurchaseOrederBOimpl();
            default:
                return null;
        }
    }

    public enum DAOTypes {
        CUSTOMER, ITEM, PLACEORDER
    }
}
