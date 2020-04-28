# Build stage
#
FROM maven:3.6.0-jdk-11 AS build
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package

FROM openjdk:11
COPY --from=build /home/app/target/site-0.0.1-SNAPSHOT.jar site-0.0.1-SNAPSHOT.jar
EXPOSE 4000
ENTRYPOINT [ "java","-jar","site-0.0.1-SNAPSHOT.jar" , "--spring.profiles.active=prod" ]