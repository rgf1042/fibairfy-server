#!/bin/bash
docker login -u $DOCKER_USER -p $DOCKER_PASS
echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
export REPO=rgf1042/fibairfy-server
docker build -t $REPO:$TRAVIS_TAG .
docker push $REPO