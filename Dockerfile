# Use the Nginx lightweight images as base
FROM nginx:alpine

# Delete the default nginx websites files
RUN rm -rf /usr/share/nginx/html/*

# Copy all project files (HTML, CSS, JS)
COPY . /usr/share/nginx/html

# Tells docker that container will use port 80
EXPOSE 80

# Start nginx server and keep container running
CMD ["nginx", "-g", "daemon off;"]
