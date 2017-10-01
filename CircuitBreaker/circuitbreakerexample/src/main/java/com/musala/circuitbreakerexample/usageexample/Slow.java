package com.musala.circuitbreakerexample.usageexample;

import com.musala.circuitbreakerexample.Breakr;
import com.musala.circuitbreakerexample.IgnoreCallsWhen;
import javax.inject.Singleton;
import javax.interceptor.Interceptors;

/**
 *
 * @author georgy
 */

@Singleton
@Interceptors(Breakr.class)
public class Slow {
    
    @IgnoreCallsWhen(slowerThanMillis = 10)
    public String tooSlow() {
        try {
            Thread.sleep(100);
        } catch (InterruptedException iex) {
            
        }
        return "Slow: " + System.currentTimeMillis();
    }
    
}
