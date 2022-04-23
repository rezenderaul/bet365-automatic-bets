const allMatches = [['ASD Alcione', 'ASD Seravezza Calcio', '69:01', '33', '3', '0', '3', '0'],
['ACSO Filiasi', 'CSO Petrolul Potcoava', '68:23', '11', '1', '1', '1', '1'],
['RC Arba Sub-21', 'MC Alger Sub-21', '67:33', '29', '2', '6', '2', '6'],
['ACS Bucovina Radauti', 'Foresta Suceava', '67:19', '11', '0', '1', '0', '1'],
['FC Astana', 'FK Kaspyi Aktau', '66:13', '45', '4', '0', '4', '0'],
['FC Somesul Dej', 'CA Oradea', '65:59', '12', '0', '1', '0', '1'],
['ACS Olimpic Cetate Rasnov', 'FC Pucioasa', '65:43', '11', '0', '1', '0', '1'],
['SR Brasov', 'ACS Kids Tampa Brasov', '65:21', '11', '0', '0', '0', '0'],
['SJ Vaslui', 'ACS Somuz Falticeni', '65:12', '12', '1', '1', '1', '1'],
['ACS Viitorul Cluj', 'CS Hunedoara', '65:05', '12', '0', '1', '0', '1'],
['Sheff Wed Sub-23', 'QPR Sub-23', '39', '0', '0', '0', '0'],
['CS Unirea Ungheni 2018', 'CSO Cugir', '12', '2', '1', '2', '1'],
['FCSB II', 'Real Bradu', '9', '5', '1', '5', '1'],
['CS Blejoi', 'CSO Plopeni', '9', '5', '1', '5', '1'],
['Resistencia FC - Feminino', 'Cerro Porteño - Feminino', '11', '1', '0', '1', '0'],
['Crisul Chisineu Cris', 'CSC Dumbravita', '12', '0', '1', '0', '1'],
['Vissel Kobe', 'Chiangrai Utd', '52', '5', '0', '5', '0'],
['Sydney FC', 'Yokohama F-Marinos', '57', '0', '0', '0', '0'],
['Husana Husi', 'CS Dante Botosani', '63:40', '11', '0', '0', '0', '0'],
['FC Arges Pitesti II', 'FC Academica Clinceni II', '12', '0', '1', '0', '1'],
['CS Soimii Lipova', 'Ghiroda SI Giarmata VII', '11', '0', '1', '0', '1'],
['Rapid Bucuresti II', 'CS Tunari', '11', '0', '0', '0', '0'],
['CS Ocna Mures', 'CS Sanatatea Cluj', '12', '2', '0', '2', '0'],
['ACS Sepsi II', 'Odorheiu Secuiesc', '12', '0', '1', '0', '1'],
['ACS KSE Targu Secuiesc', 'AFC Hermannstadt 2', '61:43', '11', '1', '0', '1', '0'],
['FC Ceahlaul Piatra Neamt', 'AS Stiinta Miroslava', '61:36', '11', '1', '0', '1', '0'],
['AFC Metalul Buzau', 'CSM Focsani', '11', '0', '0', '0', '0'],
['CS Lotus Baile Felix', 'CS Minaur Baia Mare', '12', '2', '1', '2', '1'],
['Farul Constanta II', 'SC Popesti Leordeni', '12', '1', '1', '1', '1'],
['CS Sportul Simleu Silvaniei', 'CFR Cluj II', '10', '0', '3', '0', '3'],
['Puebla Sub-20', 'Necaxa Sub-20', '57:12', '36', '1', '3', '1', '3'],
['ES Setif Sub-21', 'Paradou AC Sub-21', '38', '3', '0', '3', '0'],
['HB Chelghoum Laid U21', 'MC Oran Sub-21', '3', '0', '0', '0', '0'],
['Terengganu', 'Selangor', '4', '1', '0', '1', '0'],
['JS Kabylie Sub-21', 'ASO Chlef Sub-21', '28', '2', '0', '2', '0'],
['Kerala', 'Punjab', '39', '1', '1', '1', '1'],
['FC Academica Clinceni', 'CS Mioveni', '23', '0', '1', '0', '1'],
['Trau FC', 'Indian Arrows', '57', '0', '0', '0', '0'],
['NA Hussein Dey Sub-21', 'CS Constantine Sub-21', '40:37', '52', '0', '1', '0', '1'],
['Olympique Medea', 'RC Relizane', '32', '0', '0', '0', '0'],
['FS Jelgava', 'FK Tukums 2000/TSS II', '50', '2', '1', '2', '1'],
['Pelikan Lowicz', 'Bron Radom', '65', '0', '0', '0', '0'],
['FC Haka', 'HIFK', '21:22', '99', '1', '1', '1', '1'],
['Garbarnia Krakow', 'Olimpia Elblag', '63', '0', '0', '0', '0'],
['LKS Wolczanka Wolka Pelkinska', 'Tomasovia Tomaszów', '65', '0', '1', '0', '1'],
['FK Kauno Zalgiris', 'FK Riteriai', '20:31', '87', '0', '0', '0', '0'],
['Lahti', 'KuPS Kuopio', '104', '0', '1', '0', '1'],
['Slask Wroclaw II', 'Stal Rzeszow', '65', '0', '0', '0', '0'],
['FC Juarez Sub-20', 'Mazatlan FC Sub-20', '68', '0', '0', '0', '0'],
['Atalanta (Walker) EsportsAC Milan (Bardo) Esports'],
['Inter (Thor) EsportsLazio (Zazabak) Esports'],
['Monaco (Mad) Esports', 'PSG (Mars) Esports', '11:18', '1', '0', '3', '0', '3'],
['Lyon (Nasmi) Esports', 'Lille (Dasko) Esports', '11:12', '1', '2', '2', '2', '2'],
['Man Utd (BPBP94) EsportsTottenham (VPbysik) Esports'],
['Liverpool (Plevis) EsportsMan City (ke4_official) Esports'],
['Dortmund (Nazario) EsportsInter (MakcwellLm) Esports'],
['A.Madrid (Luntik) EsportsMan City (Jekos) Esports']];
const allMatchesClean = allMatches
    .filter(array => array.length > 2)
    .filter(array => array[0].indexOf('Sub-') == -1)
    .filter(array => array[0].indexOf('Feminino') == -1)
    .filter(array => array[0].indexOf("(") == -1 && array[0].indexOf(")") && array[0].indexOf("Esports")
);

let matchWithTime = allMatchesClean.filter(array => array.length >= 8);
let matchWithoutTime = allMatchesClean.filter(array => array.length < 8);
//matchWithoutTime.splice(0,1);

function convertToTime(time = 0) {
    let newTime = '';
    if (typeof time != 'string') {
        newTime = time.toString();
    } else {
        newTime = time;
    }

    if (newTime.length == 1) {
        newTime = newTime.padStart(2,'0')
    }
    if (newTime.length == 2) {
        newTime = newTime.padEnd(5,":00")
    } 
    if (newTime.length == 3) {
        newTime = newTime.padEnd(6,":00")
    }

    return newTime;
}

const timeActualy = (() => {
    const date = new Date();
    return date.toLocaleTimeString()
});

function convertToMileseconds(time) {
    let timeString = convertToTime(time);
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if (timeString.split(":").length == 3) {
        timeString = timeString.split(":");
        hours = (parseInt(timeString[0]) != NaN ? parseInt(timeString[0]) : 0);
        minutes = (parseInt(timeString[1]) != NaN ? parseInt(timeString[1]) : 0);
        seconds = (parseInt(timeString[2]) != NaN ? parseInt(timeString[2]) : 0);
    } else {
        timeString = timeString.split(":");
        minutes = (parseInt(timeString[0]) != NaN ? parseInt(timeString[0]) : 0);
        seconds = (parseInt(timeString[1]) != NaN ? parseInt(timeString[1]) : 0);
    }

    return (hours * 60 * 60 * 1000 * minutes * 60 * 1000 + seconds * 1000);
}

function getAllMatches() {
    if (nextTimeGetAllTeams < convertToMileseconds(timeActualy())) {
        nextTimeGetAllTeams = convertToMileseconds(timeActualy()) + 1000 * 10;
        console.log("Resultado Novo");
    } else {
        console.log('Resultado Antigo');
    }
}

//let nextTimeGetAllTeams = convertToMileseconds(timeActualy());

//setInterval(getAllMatches, 1000);

let strategies = require('./strategies')

strategies([0,0,0]);


