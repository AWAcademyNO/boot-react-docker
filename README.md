# Getting Started

# Start backend

    java com.example.sample.SampleApplication

# Start frontend

    cd frontend
    npm start

# Build application

    docker build . -t sample-boot-react

This will build the frontend with NPM and copy the generated files to src/main/resources
before building the backend with Maven.

Test locally:

    docker run -p 8080:8080 sample-boot-react