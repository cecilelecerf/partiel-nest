#!/bin/bash

# Renommer les fichiers et dossiers (ordre inversé pour traiter les enfants avant les parents)
find . -depth \( -name "*exercice*" -o -name "*exercices*" \) \
  ! -path "*/node_modules/*" \
  ! -path "*/.next/*" \
  ! -path "*/generated/*" \
  | while read path; do
    dir=$(dirname "$path")
    base=$(basename "$path")
    newbase=$(echo "$base" | sed 's/exercice/exercise/g; s/Exercice/Exercise/g; s/EXERCICE/EXERCISE/g')
    if [ "$base" != "$newbase" ]; then
      mv "$path" "$dir/$newbase"
      echo "✅ $base → $newbase"
    fi
  done

echo "Done"