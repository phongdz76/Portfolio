FROM nginx:stable-alpine3.21-perl
COPY . /usr/share/nginx/html

# Update Nginx config to listen on 8888
RUN sed -i 's/listen       80;/listen       8888;/g' /etc/nginx/conf.d/default.conf

# Expose the port
EXPOSE 8888

# Set environment variables
ENV PORT 8888
ENV HOSTNAME "0.0.0.0"

CMD ["nginx", "-g", "daemon off;"]
