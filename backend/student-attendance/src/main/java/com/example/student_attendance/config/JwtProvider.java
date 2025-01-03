package com.example.student_attendance.config;

import javax.crypto.SecretKey;

import com.example.student_attendance.DTO.UserAuthRequest;
import com.example.student_attendance.entities.Role;
import com.example.student_attendance.entities.User;
import com.example.student_attendance.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;

@Service
public class JwtProvider {



    private static SecretKey key = Keys.hmacShaKeyFor(JWTConstants.SECRET_KEY.getBytes());

    public String generateToken(Authentication auth){
        Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();
        String roles = populateAuthorities(authorities);
        UserAuthRequest user = (UserAuthRequest) auth.getPrincipal();


        String jwt = Jwts.builder().setIssuedAt(new Date(new Date().getTime()))
                .setExpiration((new Date(Date.from(Instant.now()).getTime()+ 15*60*1000)))
                .claim("user", user)
                .claim("authorities", roles)
                .signWith(key)
                .compact();
        return jwt;
    }


    /**
     * Decodes the JWT token into <strong>Claims<strong/>.
     * @param jwt The encrypted token, needs the private key for decryption.
     * @return A <strong>Claims<strong/> object as Map-like structured data.
     */
    private static Claims decodeJwt(String jwt) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(jwt)
                    .getBody();
        } catch (SignatureException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Gets the user data from the JWT token
     * @param jwt The JWT string
     * @return A UserAuthRequest object that contains minimal data from user.
     */
    public static UserAuthRequest getUserFromJWT(String jwt){
        Claims claims = decodeJwt(jwt);
        if(claims != null) {
            Map<String, Object> userClaims = claims.get("user", Map.class);
            if(userClaims != null) {
                int id = (Integer) userClaims.get("id");
                String firstName = (String) userClaims.get("firstName");
                String lastName = (String) userClaims.get("lastName");
                String email = (String) userClaims.get("email");
                String role = userClaims.get("role").toString();
                return new UserAuthRequest(id, firstName, lastName, email, role);
            }
        }
        return null;
    }





    private String populateAuthorities(Collection<? extends GrantedAuthority> authorities) {
        Set<String> auth = new HashSet<>();

        for(GrantedAuthority authority: authorities){
            auth.add(authority.getAuthority());
        }

        return String.join(",", auth);
    }
}
