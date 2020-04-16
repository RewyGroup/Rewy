mvn clean install -DskipTests && \
docker rmi rewygroup/backend:latest && \
docker build -f Dockerfile -t rewygroup/backend:latest . && \
docker push rewygroup/backend:latest && \
cd webapp && \
docker rmi rewygroup/frontend:latest && \
docker build -f Dockerfile -t rewygroup/frontend:latest . && \
docker push rewygroup/frontend:latest