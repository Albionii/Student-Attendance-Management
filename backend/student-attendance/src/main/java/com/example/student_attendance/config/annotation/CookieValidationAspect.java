package com.example.student_attendance.config.annotation;

import com.example.student_attendance.exception.InvalidCookieException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Aspect
@Component
public class CookieValidationAspect {

    @Before("@annotation(CookieValidated)")
    public void validateCookie(JoinPoint joinPoint){
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        Cookie[] cookies = request.getCookies();
        boolean validCookie = false;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwt".equals(cookie.getName())) {
                    validCookie = isValidCookie(cookie);
                    break;
                }
            }
        }

        if (!validCookie) {
            throw new InvalidCookieException("Invalid cookie");
        }


    }

    private boolean isValidCookie(Cookie cookie) {
        if (cookie == null || cookie.getValue().isEmpty()){
            return false;
        }
        return true;
    }
}
