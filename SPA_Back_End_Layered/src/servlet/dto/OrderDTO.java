package servlet.dto;

import java.util.List;

public class OrderDTO {
    private String oId;
    private String date;
    private String id;
    private List<OrderDetailsDTO> orderDetails;

    public OrderDTO() {
    }

    public OrderDTO(String oId, String date, String id) {
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

    public List<OrderDetailsDTO> getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(List<OrderDetailsDTO> orderDetails) {
        this.orderDetails = orderDetails;
    }
}
