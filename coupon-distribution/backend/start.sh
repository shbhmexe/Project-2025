#!/usr/bin/env bash
# Print current directory
echo "Current directory: $(pwd)"

# List contents of current directory
echo "Contents of current directory:"
ls -la

# Navigate to the directory where server.js should be
cd /opt/render/project/src/

# Check if server.js exists
if [ ! -f "server.js" ]; then
  echo "server.js not found in current directory"
  # Try to find server.js
  SERVER_JS=$(find /opt/render -name "server.js" -type f | head -n 1)
  if [ -n "$SERVER_JS" ]; then
    echo "Found server.js at $SERVER_JS"
    # Copy it to current directory
    cp "$SERVER_JS" ./server.js
  else
    echo "Could not find server.js anywhere"
    exit 1
  fi
fi

# Start the server
echo "Starting server"
node server.js 