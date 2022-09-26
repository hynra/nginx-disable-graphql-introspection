# nginx-disable-graphql-introspection
Disable GraphQL Introspection in Nginx using JS Module

* Install Nginx js module: https://docs.nginx.com/nginx/admin-guide/dynamic-modules/nginscript/
* Load js module into your `.conf`:

  ```
  load_module modules/ngx_http_js_module.so;
  ```
  
 * wrap `server` with `http`:
 
 ```
 http {

    ....
    server {
      ....
    }

 }
 ```
 
 * in http scope, import the js file
 ```
 js_import /etc/nginx/njs/introspect.js;
 ```
 
 * Add upstream to your Graphql backend
 
 ```
    # http scope
    upstream backend {
	    # graphql server
        server localhost:8080;
    }
    
    # server scope
      location @app-backend {
        proxy_pass http://backend;
      }
 ```
 
 * validate all of requests with js code
 
 ```
      location / {
        js_content introspect.disableSchema;
      }
 ```
