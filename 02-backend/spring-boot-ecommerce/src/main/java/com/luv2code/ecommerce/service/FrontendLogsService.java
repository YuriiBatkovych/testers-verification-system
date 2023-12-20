package com.luv2code.ecommerce.service;


import com.luv2code.ecommerce.consts.GeneralConsts;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;


@Service
public class FrontendLogsService {
    private final Log log = LogFactory.getLog(FrontendLogsService.class);

    public void logFrontendLogs(String message){
        log.info(message);
        GeneralConsts.BUG_LOG.info(message);
    }

}
