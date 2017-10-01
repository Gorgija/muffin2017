package com.musala.servicediscovery.boundary;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

/**
 *
 * @author georgy
 */

@Path("example-service")
public class SimpleService {
    
    @PostConstruct
    public void init() {
        
    }
    
    @PreDestroy
    public void close() {
        
    }
    
    @GET
    public Response test() {
        return Response.ok("Thanks for requesting me , Master.").build();
    }
    
}
