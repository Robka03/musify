Java Dev Kit 22

VS code extensions:

Java Extension Pack
Spring Boot Extension Pack

terminálba a mvnw-vel egy mappában : ./mvnw spring-boot:run

Set the JAVA_HOME Environment Variable

Make sure the JAVA_HOME environment variable is set to your JDK installation path.

Windows:

Open System Properties (right-click This PC > Properties > Advanced system settings).
Click on Environment Variables.
Under System Variables, click New and add:
Variable name: JAVA_HOME
Variable value: Path to your JDK (e.g., C:\Program Files\Java\jdk-11.0.12).
Add the JAVA_HOME variable to the Path:
Find Path in the System Variables list, select it, and click Edit.
Add %JAVA_HOME%\bin to the list.

Ugyan ez a MAVEN_HOME-ra mint a JAVA_HOME-ra

mvn -v ki kéne adja a verziót



FRONTEND

node js
frontend mappában terminálba kiadni "npm start"