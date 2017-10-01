package com.musala.circuitbreakerexample;

import javax.interceptor.AroundInvoke;
import javax.interceptor.InvocationContext;

/**
 *
 * @author georgy
 */

public class Breakr {
    
    private long errorCounter;
    private static final int FAILURES_COUNT = 5;
    private static final int TIMOUT_IN_MS = 1000;
    
    @AroundInvoke
    public Object guard(InvocationContext ic) throws Exception {
        long maxNbmrOfFailes = FAILURES_COUNT;
        long timeout = TIMOUT_IN_MS;
        
        IgnoreCallsWhen configuration = ic.getMethod().getAnnotation(IgnoreCallsWhen.class);
        
        if(configuration != null ) {
             maxNbmrOfFailes = configuration.failures();
             timeout = configuration.slowerThanMillis();
        }
        
        long start = System.currentTimeMillis();
        try {
            if(errorCounter >= maxNbmrOfFailes) {
                return null;
            }
            return ic.proceed();
        } catch (Exception e) {
            errorCounter++;
            throw e;
        } finally {
            long duration = System.currentTimeMillis() - start;
            if(duration >= timeout) {
                errorCounter++;
            }
        }
    }
    
}
