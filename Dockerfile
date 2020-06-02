FROM openjdk:11
ADD target/site-0.0.1-SNAPSHOT.jar site-0.0.1-SNAPSHOT.jar

ARG BUILD_DB_USER
ARG BUILD_DB_PASSWORD
ARG BUILD_ACCESS_KEY_ID
ARG BUILD_SECRET_ACCESS_KEY

ENV db_username $BUILD_DB_USER
ENV db_password $BUILD_DB_PASSWORD
ENV access_key_id $BUILD_ACCESS_KEY_ID
ENV secret_access_key $BUILD_SECRET_ACCESS_KEY

EXPOSE 4000
ENTRYPOINT [ "java","-jar","site-0.0.1-SNAPSHOT.jar" , "--spring.profiles.active=prod" ]