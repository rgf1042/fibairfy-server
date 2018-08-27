#!/bin/bash
touch INSTALLED
docker pull guifi/fiberfy:sails
docker run -v $(pwd):/usr/share/node/fiberfy guifi/fiberfy:sails gosu fiberfy bash -c 'npm run build && gosu fiberfy npm run test-dev'
