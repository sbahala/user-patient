# Build stage for React
FROM node:18-alpine as frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Build stage for Spring Boot
FROM maven:3.8.4-openjdk-17 as backend-build
WORKDIR /app/backend
COPY backend/pom.xml ./
COPY backend/src ./src
# Create static directory if it doesn't exist
RUN mkdir -p ./src/main/resources/static
# Copy built frontend resources into static directory
COPY --from=frontend-build /app/frontend/dist ./src/main/resources/static
RUN mvn clean package -DskipTests

# Final stage
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=backend-build /app/backend/target/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]