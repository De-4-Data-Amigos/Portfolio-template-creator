# First stage: build the react frontend
FROM node:18 as build-stage
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Second stage: serve the frontend with nginx
FROM nginx:1.25
COPY --from=build-stage /app/dist/ /usr/share/nginx/html

# Copy the nginx configuration file
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
