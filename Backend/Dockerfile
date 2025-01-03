FROM maven:3.8.5-eclipse-temurin-17 as build
WORKDIR .
COPY . .
RUN mvn -f pom.xml package

# Stage 1 - Build the backend
FROM eclipse-temurin:17-alpine
COPY --from=build target/app.jar /app.jar
EXPOSE 7070
ENTRYPOINT ["java", "-jar", "/app.jar"]