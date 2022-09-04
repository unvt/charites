# Development Containers (DevContainer) for charites

## What is it?

- DevContainer is a Dockerfike and configuration file for remote development in Visual Studio Code or GitHub Codespaces
- DevContainer allows development environments to be written and maintained as code
- DevContainer allows everyone to develop in a common development environment

## Requirements

- Visual Studio Code
- Docker

## How to use it?

- Fork `charites` repository (If not yet)
- Sync your fork from upstream (If not yet)
- Clone `charites` repository (If not yet)
- Open cloned directory
- At this time, you should see a message `Reopen in container`, then click `Open` button
- DevContainer will be built...
  - It take a while...

### Once the DevContainer has been built and started...

- Development can be done as usual

```
npm ci
npm run build
npm install -g .
charites help
charites serve test/data/style.yml
```
