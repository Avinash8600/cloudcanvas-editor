# Use the Nginx lightweight images as base
FROM nginx:alpine

# Delete the default nginx website files
RUN rm -rf /usr/share/nginx/html/*

# Copy all projet files (HTML, CSS, JS) into the nginx web folder
COPY . /usr/share/nginx/html

# Tell docker that container will use port 80
EXPOSE 80

# Start nginx server and keep container running 
CMD ["nginx", "-g", "daemon off;"] 
