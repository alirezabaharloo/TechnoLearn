#!/bin/bash
trap 'kill 0' EXIT
cd /home/user/TechnoLearn/backend
python manage.py runserver 0.0.0.0:8000 &
cd /home/user/TechnoLearn/frontend
npm run dev &
wait
