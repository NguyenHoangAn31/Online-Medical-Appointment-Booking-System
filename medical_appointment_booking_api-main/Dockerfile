FROM openjdk:21-jdk-slim

# VOLUME /tmp

COPY target/*.jar app.jar
COPY src/main/resources/static/images /app/resources/static/images

ENTRYPOINT ["java", "-jar", "/app.jar"]

EXPOSE 8080