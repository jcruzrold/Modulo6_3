const WORK_HOURS = [
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
    "15:00 - 16:00",
    "16:00 - 17:00"
];

let myTeam = [
    {
        name: "María",
        availability: new Array(WORK_HOURS.length).fill(true)
    },
    {
        name: "Pedro",
        availability: new Array(WORK_HOURS.length).fill(true)
    },
    {
        name: "Esther",
        availability: new Array(WORK_HOURS.length).fill(true)
    },
    {
        name: "Marcos",
        availability: new Array(WORK_HOURS.length).fill(true)
    }
];

let generateRandom = (option1, option2) => (Math.random() < 0.5) ? option1 : option2;

let generateRandomAvailability = (myTeam) => {
    for(teamMembersIterator = 0; teamMembersIterator < myTeam.length; teamMembersIterator ++) {
        for(availabilityIterator = 0; availabilityIterator < myTeam[teamMembersIterator].availability.length; availabilityIterator++) {
            myTeam[teamMembersIterator].availability[availabilityIterator] = generateRandom(true, false);
        }
    }
}

let showTeamAgenda = (myTeam, workHours) => {
    let agenda = "";

    for(teamMembersIterator = 0; teamMembersIterator < myTeam.length; teamMembersIterator ++) {
        agenda += "Disponibilidad de " + myTeam[teamMembersIterator].name + "\n";

        for(availabilityIterator = 0; availabilityIterator < workHours.length; availabilityIterator++) {
            agenda += "\t" + workHours[availabilityIterator] + ": ";
            if(myTeam[teamMembersIterator].availability[availabilityIterator]) {
                agenda += "disponible" + "\n";
            }
            else {
                agenda += "ocupado" + "\n";
            }
        }
    }

    agenda += "\n";

    return agenda;
}

let getAvailableMeetingTimes = (myTeam, workHours) => {
    let availableMeetingTimes = [];
    let availableTime = true;

    for(hoursIterator = 0; hoursIterator < workHours.length; hoursIterator ++) {
        for(teamMembersIterator = 0, availableTime = true; teamMembersIterator < myTeam.length && availableTime; teamMembersIterator ++) {
            availableTime = availableTime && myTeam[teamMembersIterator].availability[hoursIterator];
        }
        if(availableTime) {
            availableMeetingTimes.push(workHours[hoursIterator]);
        }
    }

    return availableMeetingTimes;
}

let showAvailableMeetingTimes = (availableMeetingTimes) => {
    let timesAvailableForMeetingOutput = "";

    if(availableMeetingTimes.length > 0) {
        for(availableMeetingTime of availableMeetingTimes) {
            timesAvailableForMeetingOutput += "Hueco encontrado en el horario " + availableMeetingTime + "\n";
        }
    }
    else {
        timesAvailableForMeetingOutput = "Lo siento. No hay hueco disponible en el equipo";
    }

    return timesAvailableForMeetingOutput;
}

let loadBlackboardContent = () => {
    generateRandomAvailability(myTeam);
    document.getElementById("blackboard").value = showTeamAgenda(myTeam, WORK_HOURS);
    document.getElementById("blackboard").value += showAvailableMeetingTimes(getAvailableMeetingTimes(myTeam,WORK_HOURS));
}

window.onload = () => {
    document.getElementById("reloadButton").addEventListener("click",loadBlackboardContent);
    loadBlackboardContent();
}