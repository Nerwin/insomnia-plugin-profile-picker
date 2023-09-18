#!/bin/sh

# Exit on any error
set -e

# Execute inside root directory
basedir="${0%/*}/.."
cd "$basedir"

#  Retrieve pluginName from parameter of the script file or use default name
PLUGIN_NAME=${1:-"insomnia-plugin-profile-picker"}
TARGET_DIR="$HOME/Library/Application Support/Insomnia/plugins/$PLUGIN_NAME"

# Create the target directory if it doesn't exist
mkdir -p "$TARGET_DIR"

# Clear the existing dist folder
rm -rf "$TARGET_DIR/dist"

# Copy the build folder and package.json to the target directory
cp -r ./dist "$TARGET_DIR"
cp ./package.json "$TARGET_DIR"
cp ./bun.lockb "$TARGET_DIR"

# Move to the target directory
cd "$TARGET_DIR"

# Install the plugin's NPM packages
bun install --production --no-summary

# Move back to previous folder
cd - > /dev/null

# Print a message indicating successful deployment
echo "Successfully deployed Insomnia plugin to $PLUGIN_NAME"
