FROM openjdk:11
COPY root/.m2/repository/rewy/site/site/0.0.1-SNAPSHOT/site-0.0.1-SNAPSHOT.jar site-0.0.1-SNAPSHOT.jar
EXPOSE 4000
ENTRYPOINT [ "java","-jar","site-0.0.1-SNAPSHOT.jar" , "--spring.profiles.active=prod" ]