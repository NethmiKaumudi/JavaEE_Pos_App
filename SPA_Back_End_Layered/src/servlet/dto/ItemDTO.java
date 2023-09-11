package servlet.dto;

public class ItemDTO {
    private String code;
    private String itemName;
    private int qty;
    private double price;

    public ItemDTO() {
    }

    public ItemDTO(String code, String itemName, int qty, double price) {
        this.code = code;
        this.itemName = itemName;
        this.qty = qty;
        this.price = price;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
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
