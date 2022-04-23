module.exports = (filteredsMatches) => {
        // bet 33 minutes
        () => {
            filteredsMatches
                .filter(array => convertToMileseconds(array[2]) > 0 && 
                    convertToMileseconds(array[2]) < convertToMileseconds(33) )
                .map(match => { intervalBuilder(match, 33); allMatchesFiltereds.push(match); })
        };
    
        //bet 80 minutes
        () => {
            filteredsMatches
                .filter(array => convertToMileseconds(array[2]) > convertToMileseconds(45) && 
                    convertToMileseconds(array[2]) < convertToMileseconds(80) )
                .map(match => { intervalBuilder(match, 80); allMatchesFiltereds.push(match); })
        }
}