1. TASK: https://github.com/EPAM-JS-Competency-center/cloud-development-course-initial/blob/main/task5-import-to-s3/task.md
2. Deadline: 22.09.2021 Done: 20.09.2021
3. Score: 8/8

Evaluation criteria:

1 - File serverless.yml contains configuration for importProductsFile function **(DONE)**
3 - The importProductsFile lambda function returns a correct response which can be used to upload a file into the S3 bucket **(https://aau3s2yy4k.execute-api.eu-west-1.amazonaws.com/dev/import?name=test.csv)**
4 - Frontend application is integrated with importProductsFile lambda **(https://github.com/Globus007/shop-react-redux-cloudfront/pull/1/)**
5 - The importFileParser lambda function is implemented and serverless.yml contains configuration for the lambda **(DONE)**

+1 async/await is used in lambda functions **(DONE)**
+1 importProductsFile lambda is covered by unit tests **(DONE)**
+1 At the end of the stream the lambda function should move the file from the uploaded folder into the parsed folder (move the file means that file should be copied into parsed folder, and then deleted from uploaded folder) **(DONE)**