
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/student-attendance-0.0.1-SNAPSHOT.jar gateway.jar
EXPOSE 8222
ENTRYPOINT ["java", "-Dspring.profiles.active=docker","-jar", "gateway.jar"]