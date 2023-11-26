package com.pedidosapp.api.config.multitenancy;

import com.auth0.jwt.JWT;
import org.springframework.stereotype.Component;
import org.springframework.ui.ModelMap;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.context.request.WebRequestInterceptor;

@Component
public class TenantInterceptor implements WebRequestInterceptor {

    private static final String TENANT_HEADER = "X-Tenant";
    private static final String TOKEN_HEADER = "Authorization";

    @Override
    public void preHandle(WebRequest request) {
        var sessionHeader = request.getHeader(TOKEN_HEADER);

        if (sessionHeader == null) {
            TenantContext.setCurrentTenant(request.getHeader(TENANT_HEADER));
        } else {
            String token = sessionHeader.replace("Bearer ", "");
            TenantContext.setCurrentTenant(String.valueOf(JWT.decode(token).getAudience()).replaceAll("]", "").replaceAll("\\[", ""));
        }
    }

    @Override
    public void postHandle(WebRequest webRequest, ModelMap modelMap) {
        TenantContext.clear();
    }

    @Override
    public void afterCompletion(WebRequest webRequest, Exception e) {

    }
}