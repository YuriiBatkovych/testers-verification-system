import { HttpHeaders } from "@angular/common/http";
import constants from "./constants";

export default{
    httpOptions:{
        headers: new HttpHeaders({"Authorization": "Basic " 
                                + btoa(`${constants.backendSecurity.USER_NAME}:${constants.backendSecurity.PASSWORD}`)})
    }
}