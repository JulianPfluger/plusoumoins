SHELL := /bin/bash

run:
	./test.sh

scores:
	while read line; do echo $$line; done < highscore.txt 

reset-scores:
	echo "" > highscore.txt
score-by:
	read nom; while read line; do if [ score=$$(echo "$$line" | cut -d' ' -f1 ) == $$nom ]; echo $$line; break; fi; done < highscore.txt 

