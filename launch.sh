#!/bin/zsh
dev=false
build=false
while getopts 'db' flag
do
    case "${flag}" in
        d) dev="true";;
        b) build="true";;
    esac
done
echo "Parameters:"
echo "  - Dev mode : $dev"
echo "  - Build    : $build"

command="docker-compose -f ./docker-compose.yaml "
if [ "$dev" = "true" ]; then
    command+="-f ./docker-compose.dev.yaml ";
else
    command+="-f ./docker-compose.prod.yaml ";
fi

command+="up -d "

if [ "$build" = "true" ]; then
    command+="--build "
fi

echo "\nRunning compose command: \n${command} \n"
eval ${command}

blue='\033[0;32m'
normal='\033[0m'
echo -e "\nNow running on ${blue}http://localhost:3000"
echo -e "${normal}\nTo stop the containers, call ${blue}docker-compose down"