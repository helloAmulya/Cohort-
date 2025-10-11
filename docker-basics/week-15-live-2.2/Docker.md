# Exploring Docker Exec Commands and Pushing Image

<b>Exec</b> command is mainly used to look inside a container and do operations inside it

1. this command gives list of files

   > <span style="color:lightblue">docker exec container_id ls </span>

2. to access and execute a terminal and work on the container

   > <span style="color:lightblue">docker exec -it container_id /bin/sh </span>

3. For pushing your image to docker hub :

- build with a suitable name of your org
  `docker build -t daddycorp/week-15-apps:latest .`

  > <span style="color:lightgreen">'latest' here is the tagname</span>

- login to your docker hub account : docker login
- push the image

  > <span style="color:lightblue">docker push daddycorp/week-15-apps:latest</span>
