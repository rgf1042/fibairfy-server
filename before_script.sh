#!/usr/bin/bash
touch INSTALLED
docker pull guifi/fiberfy:sails
docker run guifi/fiberfy:sails -v "$PWD":/usr/share/node/fiberfy /bin/sh -c "gosu fiberfy npm run build && gosu fiberfy npm run test-dev"
