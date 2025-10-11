# Layer caching architecture

### 1. Docker uses layer caching architecture

- this means once build and we run the dockerfile in a diff folder, the layers once cached will be cached again i.e. will be shared

2. Since dependencies don't change too often, package.json and npm install remain cached
