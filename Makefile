
init:
	sudo pip install -r requirements.txt

run:
	python thomebox/app.py

run-prod:
	cd thomebox && gunicorn --bind 0.0.0.0:3675 wsgi:app

clean:
	find . -name "*.pyc" -exec rm -rf {} \;


.PHONY: init test cleans
