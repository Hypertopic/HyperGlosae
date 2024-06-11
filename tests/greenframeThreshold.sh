#!/bin/bash
if [[ "$1" == "pull_request" ]]; then
    echo "[x] Running Greenframe scenario in free mode"
    cd /home/runner/work
    outputGreenframe=$(greenframe analyze http://localhost:3000 ./HyperGlosae/HyperGlosae/tests/scenario.js --databaseContainers="backend-couchdb-1")
    echo "$outputGreenframe";
else 
    echo "[x] Running Greenframe scenario in normal mode, results will be available on the greenframe UI"
    outputGreenframe=$(greenframe analyze)
    echo "$outputGreenframe";
fi

threshold=0.05 ## set threshold here in Wh

interString=${outputGreenframe% Wh*}
finalConsumption=${interString##* (}

if (( $(echo "$finalConsumption > $threshold" | bc -l) )); then 
    echo "[x] Greenframe test failed. The threshold set for this project is ${threshold}Wh and the test ran with a consumption of ${finalConsumption}Wh"
    exit 34
else 
    echo "[x] Greenframe test passed successfully. The threshold set for this project is ${threshold}Wh and the test ran with a consumption of ${finalConsumption}Wh"
    exit 0
fi
