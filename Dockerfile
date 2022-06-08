FROM node:17.8.0
ENV NODE_ENV=production

WORKDIR /app
COPY . .

# Install dependencies
RUN cd client && \
    npm install --production && \
    npm run postinstall && \
    cd .. &&\
    \
    npm install --production

# Build
RUN cd client && \
    npm run build && \
    cd .. &&\
    \
    npm run build

# Build app and start server from script
CMD [ "node", "dist/index.js" ]
