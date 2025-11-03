FROM nginx:1.24.0-alpine

# Define arguments
# ARG REACT_APP_MASTER_API_BASE_URL
# ARG REACT_APP_CUSTOMER_API_BASE_URL

# Set environment variables
# ENV REACT_APP_MASTER_API_BASE_URL=$REACT_APP_MASTER_API_BASE_URL
# ENV REACT_APP_CUSTOMER_API_BASE_URL=$REACT_APP_CUSTOMER_API_BASE_URL

WORKDIR /usr/share/nginx/html

COPY build/ .

WORKDIR /etc/nginx/conf.d

COPY server-conf/ .

EXPOSE 80

CMD ["nginx","-g","daemon off;"]
