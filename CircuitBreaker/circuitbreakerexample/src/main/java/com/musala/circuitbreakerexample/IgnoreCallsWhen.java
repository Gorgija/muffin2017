/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.musala.circuitbreakerexample;

import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import javax.inject.Qualifier;

/**
 *
 * @author georgy
 */
@Qualifier
@Retention(RUNTIME)
@Target({METHOD})
public @interface IgnoreCallsWhen {
    
    long slowerThanMillis() default 1000;
    
    long failures() default 3;
}
