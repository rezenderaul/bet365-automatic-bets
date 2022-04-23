const puppeteer = require("puppeteer");
let { convertToMileseconds, convertToSlug, timeActualy } = require('./functions');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
        devtools: true
    });
    const page = await browser.newPage();

    page.setDefaultTimeout(1000 * 60 * 60 * 24);

    // view football matches live
    await page.goto("https://www.bet365.com/#/IP/B1");

    // close statistics popup
    try {
        await (
            await page.waitForSelector(".iip-IntroductoryPopup_Cross")
        ).click();
    } catch (error) {
        console.log(`Error: ${error}`);
    }

    // accept cookies
    try {
        await (
            await page.waitForSelector(".ccm-CookieConsentPopup_Accept")
        ).click();        
    } catch (error) {
        console.log(`Error: ${error}`);
    }

    // list by time
    let ordenateMatches = (async () => {
        try {
            await page.waitForSelector('.ovm-CompetitionHeader_Header')
            let competitionHeader = await page.evaluate(() => {
                return document.querySelectorAll('.ovm-CompetitionHeader_Header').length
            });

            if(competitionHeader > 1) {
                await (await page.waitForSelector(".ovm-StatsModeButton")).click();
            }
    
            if(competitionHeader > 1) {
                await (
                    await page.waitForSelector(
                        ".osm-ControlBar-open > div > div > div:nth-child(2)"
                    )
                ).click();
                await (
                    await page.waitForSelector(
                        ".osm-DropdownContainer > div > div > div > div:nth-child(6)"
                    )
                ).click();
            }
                
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    })

    ordenateMatches();    

    await page.waitForTimeout(5000);

    const getAllMatches = (async () => {
        return await page.evaluate(() => {
            // get teams names, match time and teams score
            const dataRaw = document.querySelectorAll(
                ".ovm-FixtureDetailsTwoWay.ovm-FixtureDetailsTwoWay-1"
            );
        return [...dataRaw]
                .map( ({ outerText }) => outerText )
                .map(match => match.split("\n"));
        })
        .catch((error) => console.error(`Erro ao pegar jogos: ${error}`));
    });

    console.log(await getAllMatches())

    let filteredMatches = async () => {
        const result = await getAllMatches();
        return result
            .filter(array => array.length > 2)
            .filter(array => array[0].indexOf('Sub-') == -1)
            .filter(array => array[0].indexOf('Feminino') == -1)
            .filter(array => array[0].indexOf("(") == -1 && array[0].indexOf(")") && array[0].indexOf("Esports"))
            
    };

    function intervalBuilder(match, waitForTimeOfMatch) {
        let team = convertToSlug(match[0]);
        let waitTime = convertToMileseconds(waitForTimeOfMatch) - (match[2].indexOf(":") != -1 ? convertToMileseconds(match[2]) : false);
        waitTime = (waitTime > 1 ? waitTime : false)

        let test = setInterval(async () => {
            infoMatch(match, waitForTimeOfMatch);
            clearInterval(team);
            team = undefined;
        }, waitTime)       

        eval("team = test")
    }

    function removeMatchFromArray(match) {
        let index = allMatchesFiltereds.indexOf(match);
        allMatchesClean.splice(index, 1);
        return allMatchesFiltereds.length
    }

    let allMatchesClean = await filteredMatches();
    let NumberOfMatchesInLive = await getAllMatches();
    let allMatchesFiltereds = [];

    const bets = (filteredsMatches) => {
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
        };
    }

    bets(allMatchesClean);

    const infoMatches = ((mumberOfMatchesInLive) => {
        console.log(
`
*******************************************************************
************************** TODOS OS JOGOS *************************
*******************************************************************

Total: ${mumberOfMatchesInLive}
Aguardando Tempo: ${allMatchesFiltereds.length}
Hora: ${timeActualy()}

*******************************************************************
`
        );
    });

    const infoMatch = (async (match, waitForTimeOfMatch) => {
        await ordenateMatches();
        let totalMatches = await getAllMatches();
        let numberofMatchesWaiting = removeMatchFromArray(match);
        let waitingMatchs = allMatchesFiltereds.length;
        console.log(
`
*******************************************************************
****************************** JOGO *******************************
*******************************************************************

Jogo: ${match[0]} x ${match[1]}
Tempo Atual: ${match[2]}
Tempo Aguardado: ${waitForTimeOfMatch}
Hora: ${timeActualy()}
Total de Jogos: ${totalMatches.length}
Jogos Aguardando: ${numberofMatchesWaiting}

*******************************************************************
`
        );
    });
    
    infoMatches(NumberOfMatchesInLive.length);

    async function reScan() {
        ordenateMatches();
        const matches = await filteredMatches();
        let indexes = allMatchesFiltereds.map(match => matches.indexOf(match));
        const newList = indexes.filter(number => matches.indexOf(number) == -1)
        bets(newList);
    }

    setInterval(reScan, 1000*60*30)


    /*
    const closePopup = ".g5-PopupManager_ClickMask ";
    const firstTime = allMatches.firstTime;
    for (let i = 0; i < firstTime.length; i++) {
        let timeMatch = parseInt(teamsTimeScoreList[firstTime[i]][2]);
        let selector = `body > div:nth-child(1) > div > div.wc-WebConsoleModule_SiteContainer > div.wc-PageView > div.wc-PageView_Main.wc-InPlayPageResponsive_PageViewMain > div > div > div > div > div > div > div.ovm-OverviewView_Content > div.ovm-OverviewView_Classification > div.ovm-SortedFixtureList > div:nth-child(${firstTime[i]}) > div.ovm-Fixture_Container > div.ovm-FixtureDetailsTwoWay.ovm-FixtureDetailsTwoWay-1 > div > div.ovm-FixtureDetailsTwoWay_ScoresWrapper.ovm-StandardScores.ovm-StandardScores-1.ovm-StandardScores_StatsMode > div.ovm-StatsIcon`;
        await page.waitForSelector(selector);
        await page.click(selector);
        await page.evaluate(() => {
            let soccerStats = document.querySelectorAll('.oss-SoccerStats ');
            let soccerStatsArray = [...soccerStats];
            let statsSoccerArray = soccerStatsArray
                .map( ({outerText}) => ({outerText}) )
                .map(soccerMatch => soccerMatch.outerText.split('\n'))
                .filter(stats => {
                    let stats1 = stats.slice(0,8).map(Number)
                    let stats2 = stats.slice(8).map(Number)
                    let appm = false;
                    if ( stats1[0] / timeMatch >= 1.3 || stats2[0] / timeMatch >= 1.3 ) {
                        appm = true;
                    }
                    let cg = (stats1[3] + stats1[4] + stats1[5] >= 9 || stats2[3] + stats2[4] + stats2[5] >= 9);
                    let qt = false;
                    if (stats1[0] / cg >= 0.5 || stats2[0] / cg >= 1.5) {
                        qt = true;
                    };
                    return (appm && cg && qt);
                })
            })
        });
        await page.waitForSelector(closePopup);
        await page.click(closePopup);
    }
    /*
    for (let i=0; i<firstAndSecondTime.length; i++) {
        console.log(`Jogos filtrados: ${firstAndSecondTime[i]}`);
        console.log(teamsTimeScoreList.indexOf(firstAndSecondTime[i]));
    } */
    /*
    //while (allMatches.firstAndSecondTime.length != 0) {
        if(allMatches.firstAndSecondTime.length > 0) {
            for (let i=0; i<allMatches.firstAndSecondTime.length; i++) {
                let index = allMatches.teamsTimeScoreList.indexOf(allMatches.firstAndSecondTime[i]);
                let selector = `body > div:nth-child(1) > div > div.wc-WebConsoleModule_SiteContainer > div.wc-PageView > div.wc-PageView_Main.wc-InPlayPageResponsive_PageViewMain > div > div > div > div > div > div > div.ovm-OverviewView_Content > div.ovm-OverviewView_Classification > div.ovm-SortedFixtureList > div:nth-child(${index}) > div.ovm-Fixture_Container > div.ovm-FixtureDetailsTwoWay.ovm-FixtureDetailsTwoWay-1 > div > div.ovm-FixtureDetailsTwoWay_ScoresWrapper.ovm-StandardScores.ovm-StandardScores-1.ovm-StandardScores_StatsMode > div.ovm-StatsIcon`;
                console.log(selector)
                try {
                    console.log(`Índice: ${index}`)
                    await page.waitForSelector(selector);
                    await page.evaluate(() => {
                        document.querySelector(selector).click();
                    });
                    //await page.click(selector, {delay: 1000}); 
                    console.log('Clicado')
                } catch (error) {
                    console.log(error);
                }
            }
        } else {
            console.log('Sem indíce')
        }*/
    //}*/

    /*
   for (let i=0; i<allMatches.firstAndSecondTime.length; i++) {
       let index = allMatches.teamsTimeScoreList.indexOf(allMatches.firstAndSecondTime[i]);
       let selector = `.ovm-SortedFixtureList > div:nth-child(${index}) > div.ovm-MediaIconContainer > div > div`;
       await page.waitForSelector(selector);
       await page.click(selector, {delay: 500})
   }
*/
    /*

        //$x('(//div[@class="ovm-FixtureDetailsTwoWay_TeamsAndInfoWrapper"])[1]')
        //document.querySelector(".ovm-SortedFixtureList > div:nth-child(2) > div.ovm-MediaIconContainer > div > div")

        //const index = timeList.map(math => teamsTimeScoreList.indexOf(math)).map(index => document.querySelector(`.ovm-SortedFixtureList > div:nth-child(${index}) > div.ovm-MediaIconContainer > div > div`).click())

        const index = timeList.map(math => teamsTimeScoreList.indexOf(math));
        let betListArray = index.map(i => `.ovm-SortedFixtureList > div:nth-child(${i}) > div.ovm-Fixture_Container > div.ovm-FixtureDetailsTwoWay.ovm-FixtureDetailsTwoWay-1 > div > div.ovm-FixtureDetailsTwoWay_ScoresWrapper.ovm-StandardScores.ovm-StandardScores-1.ovm-StandardScores_StatsMode > div.ovm-StatsIcon`);

        if(timeList.length > 0) {
            while(betListArray.length > 0) {
                for (let i=0; i<betListArray.length; i++) {
                    try {
                        await document.querySelector(`${betListArray[i]}`).click();
                        let soccerStats = document.querySelectorAll('.oss-SoccerStats ');
                        let soccerStatsArray = [...soccerStats];
                        let statsSoccerArray = soccerStatsArray
                            .map( ({outerText}) => ({outerText}) )
                            .map(soccerMatch => soccerMatch.outerText.split('\n'))
                            .filter(stats => {
                                let [ 
                                    ataquesPerigososHome, 
                                    ataquesHome, ,
                                    chutesNogolHome, 
                                    chutesHome, 
                                    escanteiosHome, 
                                    cartaoAmareloHome, 
                                    cartaoVermelhoHome ] = stats.slice(0,8).map(Number);
                                let [ 
                                    ataquesPerigososFora, 
                                    ataquesFora, ,
                                    chutesNogolFora, 
                                    chutesFora, 
                                    escanteiosFora, 
                                    cartaoAmareloFora, 
                                    cartaoVermelhoFora ] = stats.slice(8).map(Number);
        
                                let appm = false;
                                let cg = false;
                                let qt = false;
                                let teamHomeScore = teamsTimeScoreList[index[i]].slice(4,5);
                                let teamWayScore = teamsTimeScoreList[index[i]].slice(5,6);
                                let time = teamsTimeScoreList[15].slice(2,3).map(time => Number(time.split(':')))
                                if ((teamHomeScore == 0 || teamHomeScore == 1) && (teamWayScore == 0 || teamWayScore == 1)) {
                                    let appmHome = ataquesPerigososHome / time[0];
                                    let appmWay = ataquesPerigososFora / time[0];
            
                                    if (appmHome >= 1.3 || appmWay >= 1.3) {
                                        appm = true;
                                    }
                                }
            
                                let cgHome = chutesNogolHome + chutesHome + escanteiosHome;
                                let cgWay = chutesNogolFora + chutesFora + escanteiosFora;
                                if ((time[0] >= 33 && time[0] <=36) && (cgHome >= 9 || cgWay >= 9)) {
                                    cg = true;
                                }
            
                                if ((time[0] >= 83 && time[0] <=85) && (cgHome >= 15 || cgWay >= 15)) {
                                    cg = true;
                                }
            
                                if (cgHome / ataquesPerigososHome >= 1.3 || cgWay / ataquesPerigososFora >= 1.3) {
                                    qt = true;
                                }
                                
                                console.log(statsSoccerArray)

                                return (appm && cg && qt);
                            });
                        if (statsSoccerArray.length > 0) {
                            betListArray.splice(i,1);
                        }
                    console.log(statsSoccerArray);
                    } catch (error) {
                        console.log(`Error: ${error}`)
                    }
                    
                }
            }
        }

        const statsRaw = document.querySelectorAll(".ovm-StatsIcon");
        const statsArray = [...statsRaw];
        statsArray.map(el => el.click());

        sleep(2000).then(() => {
            const soccerStats = document.querySelectorAll('.oss-SoccerStats ');
            const soccerStatsArray = [...soccerStats];
            const statsSoccerArray = soccerStatsArray
                .map( ({outerText}) => ({outerText}) )
                .map(soccerMatch => soccerMatch.outerText.split('\n'))
                .filter(stats => {
                    const [ 
                        ataquesPerigososHome, 
                        ataquesHome, ,
                        chutesNogolHome, 
                        chutesHome, 
                        escanteiosHome, 
                        cartaoAmareloHome, 
                        cartaoVermelhoHome ] = stats.slice(0,8).map(Number);
                    const [ 
                        ataquesPerigososFora, 
                        ataquesFora, ,
                        chutesNogolFora, 
                        chutesFora, 
                        escanteiosFora, 
                        cartaoAmareloFora, 
                        cartaoVermelhoFora ] = stats.slice(8).map(Number);

                        let appm = false;
                        let cg = false;
                        let qt = false;
                        let teamHomeScore = teamsTimeScoreList[index[i]].slice(4,5);
                        let teamWayScore = teamsTimeScoreList[index[i]].slice(5,6);
                        if ((teamHomeScore == 0 || teamHomeScore == 1) && (teamWayScore == 0 || teamWayScore == 1)) {
                            const appmHome = ataquesPerigososHome / time;
                            const appmWay = ataquesPerigososFora /time;
    
                            if (appmHome >= 1.3 || appmWay >= 1.3) {
                                appm = true;
                            }
                        }
    
                        const cgHome = chutesNogolHome + chutesHome + escanteiosHome;
                        const cgWay = chutesNogolFora + chutesFora + escanteiosFora;
                        if ((time >= 33 && time <=36) && (cgHome >= 9 || cgWay >= 9)) {
                            cg = true;
                        }
    
                        if ((time >= 83 && time <=85) && (cgHome >= 15 || cgWay >= 15)) {
                            cg = true;
                        }
    
                        if (cgHome / ataquesPerigososHome >= 1.3 || cgWay / ataquesPerigososFora >= 1.3) {
                            qt = true;
                        }

                        return (appm && cg && qt);
                })

            //const [ ataquesPerigososHome, ataquesHome, ,chutesNogolHome, chutesHome, escanteiosHome, cartaoAmareloHome, cartaoVermelhoHome ] = statsSoccerArray[i].slice(0,8).map(Number);
            //const [ ataquesPerigososFora, ataquesFora, ,chutesNogolFora, chutesFora, escanteiosFora, cartaoAmareloFora, cartaoVermelhoFora ] = statsSoccerArray[i].slice(8).map(Number);

            //const data = []
            for (let index = 0; index < teamsTimeScoreList.length; index++) {
                const [ teamHomeName, teamWayName, rawTime ] = teamsTimeScoreList[index];
                if (teamsTimeScoreList[index].length == 6) {
                    const time = Number(rawTime.slice(0,2));
                    const [ 
                        ataquesPerigososHome, 
                        ataquesHome, ,
                        chutesNogolHome, 
                        chutesHome, 
                        escanteiosHome, 
                        cartaoAmareloHome, 
                        cartaoVermelhoHome ] = statsSoccerArray[index].slice(0,8).map(Number);
                    const [ 
                        ataquesPerigososFora, 
                        ataquesFora, ,
                        chutesNogolFora, 
                        chutesFora, 
                        escanteiosFora, 
                        cartaoAmareloFora, 
                        cartaoVermelhoFora ] = statsSoccerArray[index].slice(8).map(Number);
                    const homeScore = Number(teamsTimeScoreList[index][4]);
                    const wayScore = Number(teamsTimeScoreList[index][5]);

                    if (time != false && (time >= 33 && time <= 36 || time >= 83 && time <= 85 )) {
                        let appm = false;
                        let cg = false;
                        let qt = false;
                        if ((homeScore == 0 || homeScore == 1) && (wayScore == 0 || wayScore == 1)) {
                            const appmHome = ataquesPerigososHome / time;
                            const appmWay = ataquesPerigososFora /time;
    
                            if (appmHome >= 1.3 || appmWay >= 1.3) {
                                appm = true;
                            }
                        }
    
                        const cgHome = chutesNogolHome + chutesHome + escanteiosHome;
                        const cgWay = chutesNogolFora + chutesFora + escanteiosFora;
                        if ((time >= 33 && time <=36) && (cgHome >= 9 || cgWay >= 9)) {
                            cg = true;
                        }
    
                        if ((time >= 83 && time <=85) && (cgHome >= 15 || cgWay >= 15)) {
                            cg = true;
                        }
    
                        if (cgHome / ataquesPerigososHome >= 1.3 || cgWay / ataquesPerigososFora >= 1.3) {
                            qt = true;
                        }
    
                        
                        if(appm == true && cg == true && qt == true) {
                            console.log(`Position: ${index} Match: ${teamHomeName} x ${teamWayName}: APPM + CG + QT: ${true}`);
                        } else {
                            console.log(false)
                        }
    
                    }
                    
                    if (time != false && time >= 80 && time <=82) {
                        if ((homeScore - wayScore == 2 || wayScore - homeScore == 2) && cartaoVermelhoHome == cartaoVermelhoFora) {
                            console.log(`Position: ${index} Match: ${teamHomeName} x ${teamWayName}: Diferença de gols: ${true}`);
                        } else {
                            console.log(false)
                        }
                    }
                }
            }
        })
    });

    allMatches;*/
})();
