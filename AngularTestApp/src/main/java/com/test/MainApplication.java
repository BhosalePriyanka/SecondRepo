package com.test;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.EmbeddedServletContainerAutoConfiguration;
import org.springframework.boot.autoconfigure.web.ServerPropertiesAutoConfiguration;
import org.springframework.context.ApplicationContext;

//@SpringBootApplication(exclude = {EmbeddedServletContainerAutoConfiguration.class})
@SpringBootApplication(exclude = {})
public class MainApplication {

	public static void main(String[] args) {
		ApplicationContext ctx = SpringApplication.run(MainApplication.class, args);
	}

}
