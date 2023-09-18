package servlet.entity;


public class OrderDetails {
    private String oId;
    private String itemName;
    private int qty;
    private double price;

    public OrderDetails() {
    }

    public OrderDetails(String oId, String itemName, int qty, double price) {
        this.oId = oId;
        this.itemName = itemName;
        this.qty = qty;
        this.price = price;
    }

    public String getoId() {
        return oId;
    }

    public void setoId(String oId) {
        this.oId = oId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public int getQty() {
        return qty;
    }

    public void setQty(int qty) {
        this.qty = qty;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
