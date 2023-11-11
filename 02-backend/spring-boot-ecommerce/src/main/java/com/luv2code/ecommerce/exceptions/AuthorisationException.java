package com.luv2code.ecommerce.exceptions;

public class AuthorisationException extends Exception{

    public AuthorisationException(String message){
        super(message);
    }

    public AuthorisationException(String message, Throwable cause){
        super(message, cause);
    }

}
