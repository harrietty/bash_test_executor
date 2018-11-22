FROM alpine:3.8
RUN apk upgrade && apk add --no-cache git
RUN apk add --no-cache bash gawk sed grep bc coreutils
RUN git clone https://github.com/bats-core/bats-core.git && cd bats-core && ./install.sh /usr/local
# Entrypoint allows you to add other arguments to the end of the run command which are appended to the entrypoint
ENTRYPOINT [ "bats", "--tap" ]

# CMD can be overridden at runtime by a command that was passed to the docker run command
