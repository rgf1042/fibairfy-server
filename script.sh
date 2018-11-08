#!/bin/bash
touch INSTALLED
docker-compose run fiberfy bash -c "./travis_test.sh"
