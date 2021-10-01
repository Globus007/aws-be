1. Task-3: https://github.com/EPAM-JS-Competency-center/cloud-development-course-initial/blob/main/task3-product-magamanent-api/task.md
2. Done 29.08.2021 / deadline 30.08.2021
3. Score 11/11

Main scope:
+4. Your own Frontend application is integrated with product service (/products API) and products from product-service are represented on Frontend. AND POINT1 and POINT2 are done.

Front: https://d3sf5lfqcwbeu5.cloudfront.net
Lambdas: https://newp4jdf84.execute-api.eu-west-1.amazonaws.com/dev/products
https://newp4jdf84.execute-api.eu-west-1.amazonaws.com/dev/products/1

Additional scope:
+1  Async/await is used in lambda functions
<img width="397" alt="image" src="https://user-images.githubusercontent.com/58741778/131259461-e3536654-1e5c-4eb6-be7d-3910afeb9b69.png">
+1 ES6 modules are used for product-service implementation
Used arrow functions, const and so on
+1 Webpack is configured for product-service
<img width="254" alt="image" src="https://user-images.githubusercontent.com/58741778/131259518-5070be44-4699-445f-8f0e-fbfc30b54bff.png">
+1 SWAGGER documentation is created for product-service
https://app.swaggerhub.com/apis-docs/Globus007/ProductService/1.0.0#/default
+1 Lambda handlers are covered by basic UNIT tests (NO infrastructure logic is needed to be covered)
<img width="339" alt="image" src="https://user-images.githubusercontent.com/58741778/131259563-101ef65c-2eee-49b5-9527-8943b2fa28ce.png">
+1 Lambda handlers (getProductsList, getProductsById) code is written not in 1 single module (file) and separated in codebase.
<img width="202" alt="image" src="https://user-images.githubusercontent.com/58741778/131259619-8f07cbcb-4754-440a-8a5b-9973f41fd660.png">
+1 (All languages) - Main error scenarious are handled by API ("Product not found" error)
https://newp4jdf84.execute-api.eu-west-1.amazonaws.com/dev/products/666

Link to Frontend repository:
https://github.com/Globus007/shop-react-redux-cloudfront/pull/1

1. Task: https://github.com/EPAM-JS-Competency-center/cloud-development-course-initial/blob/main/task4-integration-with-database/task.md
2. Deadline: 08.09.2021 Done:08.09.2021
3. Score: 9/9

Fronend: https://d3sf5lfqcwbeu5.cloudfront.net

**Task4.1** SQL: https://github.com/Globus007/aws-be/blob/task4/product-service/init_db.sql
**Task4.2** getAllProducts: https://newp4jdf84.execute-api.eu-west-1.amazonaws.com/dev/products
getProductById: https://newp4jdf84.execute-api.eu-west-1.amazonaws.com/dev/products/9ecf696f-faba-4c58-873c-cd2f45b0b8f6
**Task4.3** addProduct:
USE THIS LINK: https://newp4jdf84.execute-api.eu-west-1.amazonaws.com/dev/products
WITH THIS SCHEMA { "title": "iPhone test", "price": 555, "count": 10}
**Task5** Done in previous task already https://github.com/Globus007/shop-react-redux-cloudfront/pull/1

+1: POST/products lambda functions returns error 400 status code if product data is invalid - Done
+1: All lambdas return error 500 status code on any error (DB connection, any unhandled error in code) - Done
+1: All lambdas do console.log for each incoming requests and their arguments - Done
+1: Transaction based creation of product (in case stock creation is failed then related to this stock product is not created and not ready to be used by the end user and vice versa) - Done
