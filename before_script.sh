#!/bin/bash
touch INSTALLED
docker pull guifi/fiberfy:sails
docker run -v $(pwd):/usr/share/node/fiberfy guifi/fiberfy:sails /bin/sh -c "gosu fiberfy npm run build && gosu fiberfy npm run test-dev"
