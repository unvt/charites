FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt install -y --no-install-recommends \
    git \
    curl \
    vim \
    htop \
    make \
    jq

ENV DEBIAN_FRONTEND=dialog

RUN curl -Ls https://deb.nodesource.com/setup_18.x | bash
RUN apt update && apt install -y nodejs npm
RUN npm install npm@latest -g

RUN useradd -m user
USER user

ENV NPM_CONFIG_DIR="/home/user/.npm-global"
RUN mkdir -p "${NPM_CONFIG_DIR}"
RUN mkdir -p "${NPM_CONFIG_DIR}/bin"
RUN mkdir -p "${NPM_CONFIG_DIR}/lib"
ENV PATH="/home/user/.npm-global/bin:${PATH}"

EXPOSE 8080

CMD [ "sleep", "infinity" ]
