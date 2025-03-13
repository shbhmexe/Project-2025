#!/usr/bin/env bash
# Print current directory
echo "Current directory: $(pwd)"

# List contents of current directory
echo "Contents of current directory:"
ls -la

# Try to find package.json in various locations
echo "Searching for package.json:"
find /opt/render -name "package.json" -type f

# If we can't find it, let's create a package.json in the expected location
if [ ! -f "/opt/render/project/src/package.json" ]; then
  echo "Creating package.json in /opt/render/project/src/"
  # Copy the existing package.json if we can find it
  FOUND_PACKAGE=$(find /opt/render -name "package.json" -type f | head -n 1)
  if [ -n "$FOUND_PACKAGE" ]; then
    echo "Copying $FOUND_PACKAGE to /opt/render/project/src/package.json"
    mkdir -p /opt/render/project/src/
    cp "$FOUND_PACKAGE" /opt/render/project/src/package.json
  else
    # Create a minimal package.json
    echo "Creating minimal package.json"
    cat > /opt/render/project/src/package.json << EOF
{
  "name": "coupon-distribution-backend",
  "version": "1.0.0",
  "description": "Backend for Coupon Distribution System",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.18.2",
    "mongoose": "^8.12.1"
  }
}
EOF
  fi
fi

# Copy all necessary files to the expected location
echo "Copying project files to /opt/render/project/src/"
cp -r * /opt/render/project/src/ || true

# Navigate to the directory where package.json should be
cd /opt/render/project/src/

# Install dependencies
echo "Installing dependencies"
npm install 