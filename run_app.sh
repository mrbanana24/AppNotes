#!/bin/bash

# Abrir terminal para el backend
osascript -e "tell application \"Terminal\" to do script \"cd $PWD/backend; npm install; npm start\""

# Esperar unos segundos para asegurarse de que el servidor backend se inicie correctamente
sleep 5

# Abrir terminal para el frontend
osascript -e "tell application \"Terminal\" to do script \"cd $PWD/frontend; npm install; npm start\""
