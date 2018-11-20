FROM alpine:3.8
RUN apk upgrade && apk add --no-cache git
RUN apk add --no-cache bash gawk sed grep bc coreutils
RUN git clone https://github.com/bats-core/bats-core.git && cd bats-core && ./install.sh /usr/local
CMD ["bats", "--tap", "./tests/tests.bats"]
