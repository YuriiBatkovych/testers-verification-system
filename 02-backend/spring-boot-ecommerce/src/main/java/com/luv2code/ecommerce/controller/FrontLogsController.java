package com.luv2code.ecommerce.controller;

import com.luv2code.ecommerce.dto.LogsRequestDto;
import com.luv2code.ecommerce.service.FrontendLogsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/logs")
@CrossOrigin("http://localhost:4200")
public class FrontLogsController{

    private final  FrontendLogsService frontendLogsService;
    public FrontLogsController(FrontendLogsService frontendLogsService1){
       this.frontendLogsService = frontendLogsService1;
    }

    @PostMapping
    public void logMessage(@RequestBody LogsRequestDto logsRequestDto){
        frontendLogsService.logFrontendLogs(logsRequestDto.getMessage());
    }

}
