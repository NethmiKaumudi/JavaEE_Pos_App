package DTO;

import javax.persistence.Entity;

@Entity
public class Customer {
    private String cid;
    private String name;
    private String address;
    private int salary;

    public Customer() {
    }

    public Customer(String cid, String name, String address, int salary) {
        this.cid = cid;
        this.name = name;
        this.address = address;
        this.salary = salary;
    }

    public String getCid() {
        return cid;
    }

    public void setCid(String cid) {
        this.cid = cid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getSalary() {
        return salary;
    }

    public void setSalary(int salary) {
        this.salary = salary;
    }
}
