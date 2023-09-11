package servlet;

import lk.ijse.pos.servlet.bo.BOFactory;
import lk.ijse.pos.servlet.bo.ItemBO;
import lk.ijse.pos.servlet.dto.ItemDTO;
import lk.ijse.pos.servlet.util.ResponseUtil;
import org.apache.commons.dbcp2.BasicDataSource;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;


@WebServlet(urlPatterns = {"/item"})
public class ItemServlet extends HttpServlet {

    ServletContext servletContext = getServletContext();
    BasicDataSource pool = (BasicDataSource) servletContext.getAttribute("pos");

    //    private ItemBOimpl itemBOimpl;
    ItemBO itemBOimpl = (ItemBO) BOFactory.getBoFactory().getBO(BOFactory.BOTypes.ITEM);
    private ItemDTO itemDTO;


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try (Connection connection = pool.getConnection();) {
            JsonArrayBuilder allItems = Json.createArrayBuilder();
//            while (rst.next()) {
//                String code = rst.getString(1);
//                String description = rst.getString(2);
//                String qty = rst.getString(3);
//                String unitPrice = rst.getString(4);
//
//                JsonObjectBuilder itemObject = Json.createObjectBuilder();
//                itemObject.add("code", code);
//                itemObject.add("description", description);
//                itemObject.add("qty", qty);
//                itemObject.add("unitPrice", unitPrice);
//
//                allItems.add(itemObject.build());
//            }

            //create the response Object
            List<ItemDTO> items = itemBOimpl.getAllItems();
            JsonObjectBuilder builder = Json.createObjectBuilder();
            for (ItemDTO dto : items) {
                builder.add("code", dto.getCode());
                builder.add("description", dto.getItemName());
                builder.add("qty", dto.getQty());
                builder.add("unitPrice", dto.getPrice());
                allItems.add(builder);
            }
            resp.getWriter().print(ResponseUtil.genJson("Success", "Loaded", allItems.build()));
        } catch (SQLException e) {
            resp.setStatus(500);
            resp.getWriter().print(ResponseUtil.genJson("Error", e.getMessage()));
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String code = req.getParameter("code");
        String description = req.getParameter("description");
        int itemQty = Integer.parseInt(req.getParameter("itemQty"));
        Double unitPrice = Double.valueOf(req.getParameter("unitPrice"));

        try (Connection connection = pool.getConnection();) {
            itemDTO.setCode(code);
            itemDTO.setItemName(description);
            itemDTO.setQty(itemQty);
            itemDTO.setPrice(unitPrice);
            itemBOimpl.addItem(itemDTO);
            resp.getWriter().print(ResponseUtil.genJson("Success", "Successfully Added.!"));

        } catch (SQLException e) {
            resp.setStatus(500);
            resp.getWriter().print(ResponseUtil.genJson("Error", e.getMessage()));

        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        //Add Headers
//        resp.addHeader("Access-Control-Allow-Origin", "*");
//        resp.addHeader("Content-Type", "application/json");

        JsonReader reader = Json.createReader(req.getReader());
        JsonObject jsonObject = reader.readObject();

        String code = jsonObject.getString("code");
        String description = jsonObject.getString("description");
        int itemQty = Integer.parseInt(jsonObject.getString("qtyOnHand"));
        Double unitPrice = Double.valueOf(jsonObject.getString("unitPrice"));

        try (Connection connection = pool.getConnection();) {
            itemDTO.setCode(code);
            itemDTO.setItemName(description);
            itemDTO.setQty(itemQty);
            itemDTO.setPrice(unitPrice);

            boolean isUpdated = itemBOimpl.updateItem(itemDTO);

            if (isUpdated) {
                resp.getWriter().print(ResponseUtil.genJson("Success", "Item Updated..!"));
            } else {
                resp.getWriter().print(ResponseUtil.genJson("Failed", "Item Updated Failed..!"));
            }
        } catch (SQLException e) {
            resp.setStatus(500);
            resp.getWriter().print(ResponseUtil.genJson("Error", e.getMessage()));
        }


    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //Add Headers
//        resp.addHeader("Access-Control-Allow-Origin", "*");
//        resp.addHeader("Content-Type", "application/json");

        String code = req.getParameter("code");
        try (Connection connection = pool.getConnection()) {

//            PreparedStatement pstm = connection.prepareStatement("delete from item where code=?");
//            pstm.setObject(1, code);
            boolean deleteItem = itemBOimpl.deleteItem(code);

            if (deleteItem) {
                resp.getWriter().print(ResponseUtil.genJson("Success", "Item Deleted..!"));
            } else {
                resp.getWriter().print(ResponseUtil.genJson("Failed", "Item Delete Failed..!"));
            }
        } catch (SQLException e) {
            resp.setStatus(500);
            resp.getWriter().print(ResponseUtil.genJson("Error", e.getMessage()));
        }
    }

//    @Override
//    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        resp.addHeader("Access-Control-Allow-Origin", "*");
//        resp.addHeader("Access-Control-Allow-Methods", "PUT, DELETE");
//        resp.addHeader("Access-Control-Allow-Headers", "content-type");
//    }
}
