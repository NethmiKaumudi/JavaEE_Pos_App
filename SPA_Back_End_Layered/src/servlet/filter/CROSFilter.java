package servlet.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(urlPatterns = "/*",filterName = "A")
public class CROSFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        System.out.println("CORS Filter Init");
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletResponse res = (HttpServletResponse) servletResponse;
        HttpServletRequest req = (HttpServletRequest) servletRequest;

        //we can check what is the HTTP method that the client
        //is using to request the servlet
        String method = req.getMethod();

        //forward every request to requested servlet
        filterChain.doFilter(servletRequest,servletResponse);

        //So before went back to the client with the response
        //we should add several headers to avoid the CORS policy

        //So, if the request is a preflight request (OPTION)
        if (method.equals("OPTIONS")){
            //we can append those headers to the response before it is
            //send back to the client
            res.setStatus(200);
            res.addHeader("Access-Control-Allow-Origin", "*");
            res.addHeader("Access-Control-Allow-Methods", "PUT, DELETE");
            res.addHeader("Access-Control-Allow-Headers", "content-type,auth");
        }else{
            //otherwise if it is a GET,POST,PUT or DELETE we can append the
            //following common header
            res.addHeader("Access-Control-Allow-Origin", "*");
        }
    }

    @Override
    public void destroy() {

    }
}
