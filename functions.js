function convertToSlug(text) {
    const a = 'àáäâãèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
    const b = 'aaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
    const p = new RegExp(a.split('').join('|'), 'g')
    return text.toString().toLowerCase().trim()
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special chars
      .replace(/&/g, '-e-') // Replace & with 'e'
      .replace(/[\s\W-]+/g, '') // Replace spaces, non-word characters and dashes with a single dash (-)
}

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

const timeActualy = (() => {
    const date = new Date();
    return date.toLocaleTimeString()
});

module.exports = {convertToMileseconds, convertToSlug, timeActualy}