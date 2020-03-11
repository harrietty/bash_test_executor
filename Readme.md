# Notes

## Docker

Run a docker container, redirecting stdin to the container

    docker run -i test_stdin < foo.txt

This presumes the docker container begins with the ENTRYPOINT command which allows further arguments or stdin to be passed to the command executed as the entrypoint:

    ENTRYPOINT [ "bats", "--tap" ]

E.g. if you wanted to pass an argument to the `bats` command at runtime:

    docker run test_runner mytests.bats


Allow auto-completion of Docker commands:

    brew install docker-completion
