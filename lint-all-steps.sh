#!/usr/bin/env bash

# Script to run lint --fix --unsafe in all step folders

set -e

STEP_FOLDERS=("00-start" "01-shadcn" "02-complete-ui" "03-auth" "04-database" "05-object-storage" "06-caching" "07-email" "08-ai" "09-with-tests")

echo "Running lint --fix --unsafe and typecheck in all step folders..."
echo ""

for step in "${STEP_FOLDERS[@]}"; do
  if [ -d "$step" ]; then
    echo "→ Processing $step..."
    cd "$step"
    
    if [ -f "package.json" ]; then
      npm run lint -- --fix --unsafe
      npm run typecheck
      echo "✓ Completed $step"
    else
      echo "⚠ Skipping $step (no package.json found)"
    fi
    
    cd ..
    echo ""
  else
    echo "⚠ Directory $step not found, skipping..."
    echo ""
  fi
done

echo "✓ All steps processed!"
