#!/bin/bash

DB_DIR="db/data"
ERR_MSG="Please make sure docker and docker-compose are installed"

trap "echo $ERR_MSG" ERR

if [ ! -d "$DB_DIR" ]; then
  mkdir "$DB_DIR"
fi

docker-compose up -d --build
