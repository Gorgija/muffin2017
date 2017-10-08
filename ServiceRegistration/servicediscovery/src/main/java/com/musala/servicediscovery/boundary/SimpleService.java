package com.musala.servicediscovery.boundary;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.Response;
import javax.ejb.Singleton;
import javax.ejb.Startup;


/**
 *
 * @author georgy
 */

@Singleton
@Startup
@Path("service")
public class SimpleService {
    
    @PostConstruct
    public void init() {
        // Register this service on etcd service registrant
        Client client = ClientBuilder.newClient();
        WebTarget target = client.target("http://localhost:4001/v2/keys/");
        
    }
    
    @PreDestroy
    public void close() {
        // UnRegister this service on etcd service registrant 
    }
    
    @GET
    public Response test() {
        return Response.ok("Thanks for requesting me , Master.").build();
    }
    
}
