# gravity-simulator
Simulate several gravitational bodies in 3D space, tracing their paths as they go.

This started as a port of my [Processing app](https://github.com/HarrySadleir/gravitySimulator) of the same name, with the aim of learning web technologies, and eventually experimenting with local hosting.

You can checkout the site hosted on Vercel here: https://gravity-simulator.vercel.app/


## Local hosting
I am also working towards local hosting to practice devops skills. 

To run the app locally, call `./launch.sh` with the following optional flags:
- -d: Developer mode, as supposed to Production mode. This runs the app with `nodemon` using a bind mount on the host device so changes are picked up in real time.
- -b: Build the docker container before bring it up, equivalent to `docker-compose up --build`.