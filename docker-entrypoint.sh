#!/bin/sh
set -e

# Run the application
exec npm run command -- "$@"
