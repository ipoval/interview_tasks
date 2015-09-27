#!/bin/sh
# to avoid setting up the LD_LIBRARY_PATH in startup scripts, use this wrapper
# LD_LIBRARY_PATH adds extra performance hit, so placing into startup scripts is bad

LD_LIBRARY_PATH=/opt/shared_missing/lib

export LD_LIBRARY_PATH

exec /opt/shared_missing/bin/shared_missing.bin $@
