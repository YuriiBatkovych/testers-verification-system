package com.luv2code.ecommerce.logging;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class BugLogger {
    public static final String BUG_LOGGER_NAME = "bugLogger";
    public static final Log BUG_LOG = LogFactory.getLog(BUG_LOGGER_NAME);

    public BugLogger(){}

    public void info(String bugTag){
        BUG_LOG.info("[["+bugTag+"]]");
    }

}
