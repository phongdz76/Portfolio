FROM nginx:stable-alpine3.21-perl
COPY . /usr/share/nginx/html

# Expose the port
EXPOSE 8888

# Set environment variables
ENV PORT 8888
ENV HOSTNAME "0.0.0.0"
