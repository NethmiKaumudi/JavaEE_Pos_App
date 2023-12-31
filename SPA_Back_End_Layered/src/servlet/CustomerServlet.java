package servlet;


import org.apache.commons.dbcp2.BasicDataSource;
import servlet.bo.BOFactory;
import servlet.bo.CustomerBO;
import servlet.dto.CustomerDTO;
import servlet.util.ResponseUtil;

import javax.json.*;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;

@WebServlet(urlPatterns = {"/customer"})
public class CustomerServlet extends HttpServlet {
    ServletContext servletContext = getServletContext();
    BasicDataSource pool = (BasicDataSource) servletContext.getAttribute("pos");

    CustomerDTO customerDTO = new CustomerDTO();
    CustomerBO customerBOimpl = (CustomerBO) BOFactory.getBoFactory().getBO(BOFactory.BOTypes.CUSTOMER);

    public CustomerServlet() {
        System.out.println("Customer Servlet Constructor Invoked");
    }

    @Override
    public void init() throws ServletException {

    }

    @Override
    public void destroy() {

    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        try (Connection connection = pool.getConnection();) {
            ArrayList<CustomerDTO> customers = customerBOimpl.getAllCustomers(connection);
            JsonArrayBuilder allCustomers = Json.createArrayBuilder();
            for (CustomerDTO dto : customers) {
                JsonObjectBuilder builder = Json.createObjectBuilder();
                builder.add("id", dto.getId());
                builder.add("name", dto.getName());
                builder.add("address", dto.getAddress());
                builder.add("salary", dto.getSalary());
                allCustomers.add(builder.build());
            }
            //create the response Object
            resp.getWriter().print(ResponseUtil.genJson("Success", "Loaded", allCustomers.build()));
        } catch (SQLException e) {
            resp.setStatus(500);
            resp.getWriter().print(ResponseUtil.genJson("Error", e.getMessage()));
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String cusID = req.getParameter("cusID");
        String cusName = req.getParameter("cusName");
        String cusAddress = req.getParameter("cusAddress");
        String cusSalary = req.getParameter("cusSalary");

        try (Connection connection = pool.getConnection();) {

            customerBOimpl.addCustomers(new CustomerDTO(cusID, cusName, cusAddress, cusSalary), connection);
            resp.getWriter().print(ResponseUtil.genJson("Success", "Successfully Added.!"));

        } catch (SQLException e) {
            resp.setStatus(500);
            resp.getWriter().print(ResponseUtil.genJson("Error", e.getMessage()));

        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        JsonReader reader = Json.createReader(req.getReader());
        JsonObject jsonObject = reader.readObject();
        String cusID = jsonObject.getString("id");
        String cusName = jsonObject.getString("name");
        String cusAddress = jsonObject.getString("address");
        String cusSalary = jsonObject.getString("salary");

        try (Connection connection = pool.getConnection();) {


            boolean isUpdated = customerBOimpl.updateCustomer(new CustomerDTO(cusID, cusName, cusAddress, cusSalary), connection);
            if (isUpdated) {
                resp.getWriter().print(ResponseUtil.genJson("Success", "Customer Updated..!"));
            } else {
                resp.getWriter().print(ResponseUtil.genJson("Failed", "Customer Updated Failed..!"));
            }

        } catch (SQLException e) {
            resp.setStatus(500);
            resp.getWriter().print(ResponseUtil.genJson("Error", e.getMessage()));
        }


    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String cusID = req.getParameter("cusID");
        try (Connection connection = pool.getConnection();) {
            boolean deleteCustomer = customerBOimpl.deleteCustomer(cusID,connection);
            if (deleteCustomer) {
                resp.getWriter().print(ResponseUtil.genJson("Success", "Customer Deleted..!"));
            } else {
                resp.getWriter().print(ResponseUtil.genJson("Failed", "Customer Delete Failed..!"));
            }
        } catch (SQLException e) {
            resp.setStatus(500);
            resp.getWriter().print(ResponseUtil.genJson("Error", e.getMessage()));
        }
    }

}
