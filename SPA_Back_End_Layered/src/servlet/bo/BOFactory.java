package servlet.bo;

import servlet.bo.custom.CustomerBOimpl;
import servlet.bo.custom.ItemBOimpl;
import servlet.bo.custom.PurchaseOrederBOimpl;

public class BOFactory {
    private static BOFactory boFactory;

    private BOFactory() {
    }

    public static BOFactory getBoFactory() {
        return (boFactory == null) ? boFactory = new BOFactory() : boFactory;
    }

    //Object creation logic for BO objects
    public SuperBO getBO(BOTypes types) {
        switch (types) {
            case CUSTOMER:
                return new CustomerBOimpl();
            case ITEM:
                return new ItemBOimpl();
            case PLACEORDER:
                return new PurchaseOrederBOimpl();
            default:
                return null;
        }
    }

    public enum BOTypes {
        CUSTOMER, ITEM, PLACEORDER
    }
}
