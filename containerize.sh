#!/bin/bash
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g') \
PACKAGE_VERSION=`echo $PACKAGE_VERSION | sed 's/ *$//g'`

PACKAGE_NAME=$(cat package.json \
  | grep name \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g') \
PACKAGE_NAME=`echo $PACKAGE_NAME | sed 's/ *$//g'`

docker build -t ghcr.io/easyfleetuae/${PACKAGE_NAME}:${PACKAGE_VERSION} .