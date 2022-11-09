#!/bin/bash
CONTINUER=1
nbr=${RANDOM:0:2}
coups=0
echo "$nbr"
highscore="highscore.txt"

while [ $CONTINUER == 1 ];
do
    a=0
    echo "Veuillez entrer un numéro entre 1 et 99"
    read a
    if [ "$a" -gt $nbr ]
    then
        echo "trop grand"
        ((coups++))
    elif [ "$a" -lt $nbr ]
    then
        echo "trop petit"
        ((coups++))
    elif [ "$a" -eq $nbr ]
    then
        echo "Bravo"
        ((coups++))
        echo "Vous avez réussi en $coups coup(s)"
        echo "Veuillez entrer votre Pseudo:"
        read nom
        place=1
        while read line; do
            score=$(echo "$line" | cut -d' ' -f2 )
            if [ "$score" -ge "$coups" ]
            then
                sed -i "${place}i $nom $coups" highscore.txt
                break;
            else
                ((place++))
            fi 
        done < highscore.txt
        echo "Voici le ScoreBoard : "
        number=1
        while read line; do
            echo "$line"
            if [ $number == 5 ]
            then
                break;
            else
                ((number++))
            fi
        done < highscore.txt
        CONTINUER=0
    fi
 
done