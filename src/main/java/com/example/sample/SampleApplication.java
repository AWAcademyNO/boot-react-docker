package com.example.sample;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@SpringBootApplication
@RestController
public class SampleApplication {

	@GetMapping("/api/greet")
	public String greetings() {
		return "Hello from Spring Boot";
	}

	@GetMapping("/user")
	public Principal user(Principal p) {
		return p;
	}

	public static void main(String[] args) {
		SpringApplication.run(SampleApplication.class, args);
	}

}
