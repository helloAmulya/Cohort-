# Exploring Docker Exec Commands

<b>Exec</b> command is mainly used to look inside a container and do operations inside it

1. this command gives list of files

   > <span style="color:lightblue">docker exec container_id ls </span>

2. to access and execute a terminal and work on the container

   > <span style="color:lightblue">docker exec -it container_id /bin/sh </span>
