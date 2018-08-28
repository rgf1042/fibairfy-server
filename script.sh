#!/bin/bash
touch INSTALLED
docker run -v $(pwd):/usr/share/node/fiberfy guifi/fiberfy:sails bash -c "./travis_test.sh"
