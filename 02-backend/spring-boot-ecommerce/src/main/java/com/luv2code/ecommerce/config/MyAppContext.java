package com.luv2code.ecommerce.config;

import java.util.HashMap;
import java.util.Map;

public class MyAppContext {

    private final Map<String, Object> properties = new HashMap<>();

    public void setProperty(String key, Object value) {
        properties.put(key, value);
    }

    public Object getProperty(String key) {
        return properties.get(key);
    }
}