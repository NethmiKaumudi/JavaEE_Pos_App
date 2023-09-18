package servlet.entity;


//import javax.persistence.Entity;
//
//@Entity
public class Order {
    private String oId;
    private String date;
    private String id;

    public Order() {
    }

    public Order(String oId, String date, String id) {
        this.oId = oId;
        this.date = date;
        this.id = id;
    }

    public String getoId() {
        return oId;
    }

    public void setoId(String oId) {
        this.oId = oId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
