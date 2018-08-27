#!/bin/bash
touch INSTALLED
docker pull guifi/fiberfy:sails
docker run -v $(pwd):/usr/share/node/fiberfy guifi/fiberfy:sails gosu fiberfy bash -c "./travis_test.sh"
