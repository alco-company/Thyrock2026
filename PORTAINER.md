# Portainer deploy

This project is prepared to run in Portainer as a Dockerized Node app.

The Docker setup forces `NITRO_PRESET=node_server` during build, so TanStack Start outputs a deployable `.output/` folder for Node hosting.

## Files added

- `Dockerfile`: builds the TanStack Start app and runs the Nitro server
- `docker-compose.portainer.yml`: simple Portainer stack definition
- `.dockerignore`: keeps the build context small

## Deploy from Portainer

### Option 1: Stack from Git repository

1. Push this project to a Git repository Portainer can access.
2. In Portainer, create a new stack.
3. Choose the Git repository option.
4. Point it to this repository.
5. Use `docker-compose.portainer.yml` as the compose path.
6. Deploy the stack.

### Option 2: Build on the server

1. Upload the whole project folder to the server.
2. In Portainer, create a stack or build an image from the project folder.
3. Use the included `Dockerfile`.
4. Start the container with port `3000`.

## Domain routing

The container listens on port `3000`.

Point your reverse proxy or Virtualmin proxy pass to:

- `http://127.0.0.1:3000`

If SSL already terminates in Virtualmin, keep the container on plain HTTP internally.

## Runtime command

The production server runs with:

```bash
node .output/server/index.mjs
```

This follows the TanStack Start and Nitro Node deployment shape.
