FROM node:17.8.0

WORKDIR /app
COPY . .

# Install dependencies
RUN cd client && \
    npm install && \
    npm run postinstall && \
    cd .. &&\
    \
    npm install

# Build
RUN cd client && \
    npm run build && \
    cd .. &&\
    \
    npm run build

# Build app and start server from script
CMD [ "node", "dist/index.js" ]
