function disableSchema(r) {
  if(r.method === 'POST'){
    var requestBody = JSON.stringify(r.requestBody)
    if(requestBody.includes("__schema") || requestBody.includes("__type")){
      r.headersOut['Content-Type'] = 'application/json';
      r.return(
        400,
        JSON.stringify({
           "message": "GraphQL introspection is not allowed."
        })
      )
    }
    else r.internalRedirect('@app-backend')
  } else {
     r.internalRedirect('@app-backend')
  }
}
export default {disableSchema}
