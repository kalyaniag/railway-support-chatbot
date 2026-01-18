#!/bin/bash

# Replace all orange colors with blue in component files
find components/chat -name "*.tsx" -type f -exec sed -i '' \
  -e 's/from-orange-600 to-orange-500/from-blue-600 to-blue-700/g' \
  -e 's/from-orange-50 to-orange-100/from-blue-50 to-blue-100/g' \
  -e 's/border-orange-600/border-blue-600/g' \
  -e 's/border-orange-500/border-blue-500/g' \
  -e 's/border-orange-200/border-blue-200/g' \
  -e 's/bg-orange-600/bg-blue-600/g' \
  -e 's/bg-orange-500/bg-blue-500/g' \
  -e 's/bg-orange-100/bg-blue-100/g' \
  -e 's/bg-orange-50/bg-blue-50/g' \
  -e 's/text-orange-600/text-blue-600/g' \
  -e 's/text-orange-700/text-blue-700/g' \
  -e 's/text-orange-100/text-blue-100/g' \
  -e 's/hover:bg-orange-50/hover:bg-blue-50/g' \
  -e 's/hover:border-orange-600/hover:border-blue-600/g' \
  -e 's/hover:text-orange-600/hover:text-blue-600/g' \
  -e 's/focus:ring-orange-500/focus:ring-blue-500/g' \
  -e 's/focus:border-orange-500/focus:border-blue-500/g' \
  -e 's/hover:from-orange-700 to-orange-600/hover:from-blue-700 to-blue-800/g' \
  -e 's/border-orange-300/border-blue-300/g' \
  -e 's/hover:border-orange-300/hover:border-blue-300/g' \
  -e 's/hover:border-orange-200/hover:border-blue-200/g' {} \;

echo "Color replacement complete!"
