#!/bin/bash
docker login -u $DOCKER_USER -p $DOCKER_PASS
export REPO=rgf1042/fibairfy-server
docker build -f Dockerfile -t $REPO:$TRAVIS_TAG
docker push $REPO