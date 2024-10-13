package com.musify.projectwork;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ProjectworkApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectworkApplication.class, args);
	}

	@SuppressWarnings("deprecation")
	@Bean
	CommandLineRunner runNpmScript() {
		return args -> {
			// Define the working directory for the npm script
			Runtime.
			getRuntime().
			exec("cmd /c start \"\" ..\\SETUP.bat");
		};
	}
}
