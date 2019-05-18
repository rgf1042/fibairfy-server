FROM node:10-stretch

# Environment variables
ENV TZ UTC
ENV NODE_ENV production

RUN mkdir /app
WORKDIR /app

# Copy all required files
COPY ./api /app/api
COPY ./assets/ /app/assets
COPY ./config/ /app/config
COPY ./tasks/ /app/tasks
COPY ./views/ /app/views
COPY ./.sailsrc /app/.sailsrc
COPY ./Gruntfile.js /app/Gruntfile.js
COPY ./app.js /app/app.js
COPY ./doc.js /app/doc.js
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./LICENSE /app/LICENSE

# We install required dependencies to build software
RUN apt update && apt dist-upgrade -y && apt install \
  python2.7 build-essential -y

# Build & Install
RUN npm install

# Remove unnecessary dependencies
RUN apt purge build-essential -y && apt autoremove -y

EXPOSE 1337

ENTRYPOINT ["node","app.js"]