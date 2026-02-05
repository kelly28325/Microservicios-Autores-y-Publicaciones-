FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
WORKDIR /app

COPY target/*.jar app.jar

EXPOSE 8081
ENTRYPOINT ["java","-jar","/app/app.jar"]
