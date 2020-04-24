package se.rewy.site.exception;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import se.rewy.site.models.web.ErrorMessage;

import java.util.Date;


@ControllerAdvice
public class AppExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(value = UserServiceException.class)
    public ResponseEntity<Object> handleUserServiceException(UserServiceException ex, WebRequest webRequest){
        String errorMessageDescription = ex.getLocalizedMessage();
        if(errorMessageDescription == null) errorMessageDescription = ex.toString();
        ErrorMessage errorMessage = new ErrorMessage(new Date(),errorMessageDescription);

        return new ResponseEntity<>(errorMessage,new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }


}

