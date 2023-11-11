package com.luv2code.ecommerce.interceptors;

import com.luv2code.ecommerce.config.MyAppContext;
import com.luv2code.ecommerce.consts.ContextProperties;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.ModelAndView;


@Component
public class RequestInterceptor implements HandlerInterceptor {

    private final Log log = LogFactory.getLog(RequestInterceptor.class);
    MyAppContext myAppContext;

    @Autowired
    public RequestInterceptor(MyAppContext myAppContext){
        this.myAppContext = myAppContext;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object object) {
        StringBuilder message = new StringBuilder();
        String userEmail = request.getHeader("User-Email");
        registerUserEmail(userEmail);

        message.append("[Request] By ").append(userEmail);
        message.append(" METHOD type:").append(request.getMethod());
        message.append(" Request URI: ").append(request.getRequestURI());
        message.append(" Servlet PATH: ").append(request.getServletPath());

        if(object instanceof HandlerMethod){
            Class<?> controllerClass = ((HandlerMethod) object).getBeanType();
            String methodName = ((HandlerMethod) object).getMethod().getName();
            message.append("Controller name: ").append(controllerClass.getName());
            message.append("Method name:").append(methodName);
        }

        log.info(message);

        return true;
    }

    private void registerUserEmail(String userEmail){
        myAppContext.setProperty(ContextProperties.USER_EMAIL, userEmail);
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object object, ModelAndView model){
        StringBuilder message = new StringBuilder();
        message.append("[Response] ");
        message.append("Status: ").append(response.getStatus());

        log.info(message);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable Exception ex) throws Exception {
        if(ex != null){
            log.error(ex);
        }
    }
}