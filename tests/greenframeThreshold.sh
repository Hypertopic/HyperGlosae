#!/bin/bash
outputGreenframe=$(greenframe analyze)
echo $outputGreenframe

threshold=0.05 ## set threshold here in Wh

interString=${outputGreenframe% Wh*}
finalConsumption=${interString##* (}

if (( $(echo "$finalConsumption > $threshold" |bc -l) ))
then 
    echo "[x] Greenframe test failed. The threshold set for this project is ${threshold}Wh and the test ran with a consumption of ${finalConsumption}Wh"
    exit 34
else 
    echo "[x] Greenframe test pass successfully. The threshold set for this project is ${threshold}Wh and the test ran with a consumption of ${finalConsumption}Wh"
    exit 0
fi