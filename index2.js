const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
    devtools: true,
  });
  const page = await browser.newPage();

  page.setDefaultTimeout(1000 * 60 * 60 * 24);

  // view football matches live
  await page.goto("https://www.bet365.com/#/IP/B1");

  // close statistics popup
  try {
    await (await page.waitForSelector(".iip-IntroductoryPopup_Cross")).click();
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

  // competitions
  const getAllMatches = async () => {
    return await page
      .evaluate(() => {
        // get teams names, match time and teams score
        const allMatchesInLiveInfo = [
          ...document.querySelectorAll(
            '[class="ovm-FixtureDetailsTwoWay_Wrapper"]'
          ),
        ].map((div) => div.childNodes[0].outerText.split("\n"));
        /*
            ['CR Belouizdad', 'HB Chelghoum Laid', '45:00', '43']
        1: (4) ['CS Constantine', 'RC Arba', '45:00', '49']
        2: (4) ['NC Magra', 'USM Alger', '48:52', '50']
        3: (4) ['Olympique Medea', 'ES Setif', '45:00', '51']
        4: (4) ['RC Relizane', 'ASO Chlef', '45:00', '48']
        5: (4) ['WA Tlemcen', 'US Biskra', '39:25', '64']
        6: (4) ['River Plate - Feminino', 'Deportivo Espanol - Feminino', '00:00', '17']
        7: (4) ['Huracán - Reservas', 'Rosario Central - Reservas', '90:19', '2']
        8: (4) ['Lanús - Reservas', 'CA Independiente - Reservas', '87:16', '21']
        9: (3) ['Sarmiento - Reservas', 'River Plate - Reservas', '11']
        10: (3) ['ASKO Kottmannsdorf', 'SAK Klagenfurt', '84']
        11: (3) ['Annabichler SV', 'SV Eberstein', '18']
        12: (3) ['FK Celinac', 'FK Sloga Trn', '43']
        13: (3) ['Beroe', 'Arda Kardzhali', '30']
        14: (3) ['SOL FC Abobo', "Societe Omnisports De L'Armee", '64']
        15: (3) ['NK Slavonija Pozega', 'NK Slavonac Bukovlje', '52']
        16: (3) ['NK Tresnjevka', 'NK Maksimir', '44']
        17: (3) ['Guayaquil City - Feminino', 'Barcelona Guayaquil - Feminino', '7']
        18: (3) ['Puchov', 'KFC Komárno', '36']
        19: (3) ['FK Zeleziarne Podbrezova', 'MFK Dubnica', '28']
        20: (3) ['Jadran Dekani', 'ND Ilirija Ljubljana', '57']
        21: (4) ['NK Smartno', 'NK Dobrovce', '14:24', '18']
        22: (3) ['Defence Force FC', 'Ethiopia Bunna', '53']
        23: (3) ['AC Oulu', 'FC Haka', '69']
        24: (3) ['FC Ilves', 'SJK', '68']
        25: (3) ['FC Inter', 'IFK Mariehamn', '63']
        26: (3) ['KuPS Kuopio', 'VPS Vaasa', '71']
        27: (3) ['Lahti', 'FC Honka', '69']
        28: (3) ['JaPS', 'KPV', '110']
        29: (3) ['PEPO', 'FF Jaro', '105']
        30: (3) ['FC Honka II', 'FC Jazz', '80']
        31: (3) ['I-Kissat', 'Klubi-04', '84']
        32: (3) ['KaaPo', 'EPS', '81']
        33: (4) ['MaPS', 'VG-62', '16:18', '69']
        34: (3) ['HJK - Feminino', 'FC Honka - Feminino', '32']
        35: (3) ['Punjab FC', 'Rajasthan United', '57']
        36: (3) ['Manipur', 'West Bengal', '41']
        37: (3) ['Millwall Sub-23', 'Colchester Sub-23', '3']
        38: (4) ['Inter Milan Sub-19', 'Spal Sub-19', '43:55', '54']
        39: (3) ['Selangor', 'Sri Pahang FC', '24']
        40: (4) ['Terengganu', 'Negeri Sembilan', '85:37', '36']
        41: (3) ['Mazatlan FC Sub-20', 'Puebla Sub-20', '56']
        42: (3) ['Mjondalen', 'Bryne', '52']
        43: (3) ['Borowiak Czersk', 'MKS Wladyslawowo', '18']
        44: (3) ['FK Banik Ratiskovice', 'Mutenice', '18']
        45: (3) ['AFC Metalul Buzau', 'Aerostar Bacau', '12']
        46: (3) ['Ariesul Turda', 'CS Ocna Mures', '6']
        47: (3) ['CS Viitorul Daesti', 'CSM Slatina', '9']
        48: (4) ['CSC Dumbravita', 'Ghiroda SI Giarmata VII', '92:11', '1']
        49: (3) ['Foresta Suceava', 'CS Dante Botosani', '8']
        50: (4) ['Avantul Reghin', 'Gloria Bistrita', '84:42', '10']
        51: (3) ['Giresunspor Sub-19', 'Adana Demirspor Sub-19', '3']
        52: (4) ['Montevideo Wanderers - Reservas', 'Deportivo Maldonado - Reservas', '59:31', '48']
        53: (3) ['Rosenborg', 'Stjordals/Blink', '9']
        54: (3) ['A.Madrid (Nazario) Esports', 'Barcelona (Gambit) Esports', '20']
        55: (3) ['Dortmund (Jekos) Esports', 'Man City (Luntik) Esports', '20']
        56: (4) ['Man Utd (VPbysik) Esports', 'Man City (ke4_official) Esports', '01:02', '20']
        57: (4) ['Tottenham (Plevis) Esports', 'Liverpool (BPBP94) Esports', '01:19', '20']
        58: (4) ['AC Milan (zohan) Esports', 'Napoli (Void) Esports', '10:16', '1']
        59: (3) ['Atalanta (OoLancer) Esports', 'Lazio (kiser) Esports', '1']
        60: (4) ['Marseille (Aibothard) Esports', 'Lille (Spex) Esports', '07:19', '6']
        61: (4) ['PSG (Lio) Esports', 'Lyon (Val) Esports', '07:03', '7']
            */

        const icons = [
          ...document.querySelectorAll('[class="ovm-StatsIcon "]'),
        ];
        /*
            0: div.ovm-StatsIcon
            1: div.ovm-StatsIcon
            2: div.ovm-StatsIcon
            3: div.ovm-StatsIcon
            4: div.ovm-StatsIcon
            5: div.ovm-StatsIcon
            6: div.ovm-StatsIcon
            7: div.ovm-StatsIcon
            8: div.ovm-StatsIcon
            9: div.ovm-StatsIcon
            10: div.ovm-StatsIcon
            11: div.ovm-StatsIcon
            12: div.ovm-StatsIcon
            13: div.ovm-StatsIcon
            14: div.ovm-StatsIcon
            15: div.ovm-StatsIcon
            16: div.ovm-StatsIcon
            17: div.ovm-StatsIcon
            18: div.ovm-StatsIcon
            19: div.ovm-StatsIcon
            20: div.ovm-StatsIcon
            21: div.ovm-StatsIcon
            22: div.ovm-StatsIcon
            23: div.ovm-StatsIcon
            24: div.ovm-StatsIcon
            25: div.ovm-StatsIcon
            26: div.ovm-StatsIcon
            27: div.ovm-StatsIcon
            28: div.ovm-StatsIcon
            29: div.ovm-StatsIcon
            30: div.ovm-StatsIcon
            31: div.ovm-StatsIcon
            32: div.ovm-StatsIcon
            33: div.ovm-StatsIcon
            34: div.ovm-StatsIcon
            35: div.ovm-StatsIcon
            36: div.ovm-StatsIcon
            37: div.ovm-StatsIcon
            38: div.ovm-StatsIcon
            39: div.ovm-StatsIcon
            40: div.ovm-StatsIcon
            41: div.ovm-StatsIcon
            42: div.ovm-StatsIcon
            43: div.ovm-StatsIcon
            44: div.ovm-StatsIcon
            45: div.ovm-StatsIcon
            46: div.ovm-StatsIcon
            47: div.ovm-StatsIcon
            48: div.ovm-StatsIcon
            49: div.ovm-StatsIcon
            50: div.ovm-StatsIcon
            51: div.ovm-StatsIcon
            52: div.ovm-StatsIcon
            53: div.ovm-StatsIcon
            54: div.ovm-StatsIcon
            55: div.ovm-StatsIcon
            56: div.ovm-StatsIcon
            57: div.ovm-StatsIcon
            58: div.ovm-StatsIcon
            59: div.ovm-StatsIcon
            60: div.ovm-StatsIcon
            */

        for (let i = 0; i < allMatchesInLiveInfo.length; i++) {
          for (let j = 0; j < icons.length; j++) {
            allMatchesInLiveInfo[i].push(icons[j]);
          }
        }
        console.log(allMatchesInLiveInfo);
        //icons[0].click()
      })
      .catch((error) => console.error(`Erro ao pegar jogos: ${error}`));
  };

  //getAllMatches[0].childNodes[0].innerText -> competition
  // ('Campeonatos Estaduais do Brasil\n1\nX\n2')

  // On second childNodes start with 1
  //getAllMatches[2].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[0].outerText -> info dos jogos
  // ('Barcelona SC\nMetropolitanos FC\n35:10\n92\n1\n0\n1\n0')

  // On second childNodes start with 1
  //getAllMatches[2].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].click()
  // (print more info of match)
})();
