FROM node:lts-alpine

# Commands will run in this directory
WORKDIR /usr/src/app
# Copy source code to image
COPY . .

# Install dependencies
RUN cd client && \
    npm install && \
    npm run postinstall && \
    cd .. &&\
    \
    npm install

RUN chmod +x run

# Build app and start server from script
CMD ["/usr/src/app/run"]
