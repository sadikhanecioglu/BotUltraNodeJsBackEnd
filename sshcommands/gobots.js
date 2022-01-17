const lockercommand = () => {
    var file = "";

    file = `#!/bin/bash
          # Reset Selenium
          # Kill Chrome
          pkill -f chrom
          
          # Kill Phantom
          pkill -f phantom
          
          # Reset Selenium
          isim="selenium"
          screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
          screen -S "$isim" -X quit
          sleep 0.5
          pgorev='\\"^?cd;cd selenium;java -jar selenium-server-standalone-3.141.59.jar\\n\\"^?'
          screen -dmS "$isim"
          sleep 1
          komut="screen -S "$isim" -X stuff $pgorev"
          $komut
          
          sleep 3
  
          
          # Reset Locker1
          isim="locker"
          screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
          screen -S "$isim" -X quit
          sleep 0.5
          pgorev='\\"^?cd;cd GoHost/GoBot;python3 starter.py -type "LockerBot" -hub "http://localhost:4444/wd/hub" -url https://bahigo.com/tr/canli-bahis -amqRoute rivalo.bot.suspending -amq 192.168.2.31 -amqHost BetGoDev\\n\\"^?'
          screen -dmS "$isim"
          sleep 1
          komut="screen -S "$isim" -X stuff $pgorev"
          $komut
          
          sleep 2
          `;

    var b64File = Buffer.from(file).toString("base64");
    var restartFile = "";
    restartFile = "screen -ls;";
    restartFile += "echo -e '" + b64File + "' | base64 --decode | bash -s -l;";
    restartFile += "screen -ls";
    console.log(restartFile);
    return restartFile;
};

const bulletincommand = () => {
    var file = "";
    /*  # Reset Selenium
            isim="selenium"
            screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
            screen -S "$isim" -X quit
            sleep 0.5
            pgorev='\\"^?cd;cd selenium;java -jar selenium-server-standalone-3.141.59.jar\\n\\"^?'
            screen -dmS "$isim"
            sleep 1
            komut="screen -S "$isim" -X stuff $pgorev"
            $komut
            
            sleep 3 */
    file = `#!/bin/bash

            # Reset Tipco Futbol Bulletin
            isim="FutbolBulletinTipico"
            screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
            screen -S "$isim" -X quit
            sleep 0.5
            pgorev='\\"^?cd;cd GoHost/GoBot;python3 starter.py -type TipicoBulletinBot -headless 1  -amq 192.168.2.31 -amqHost BetGoDev -hub http://localhost:4444/wd/hub -rbc soccer \\n\\"^?'
            screen -dmS "$isim"
            sleep 1
            komut="screen -S "$isim" -X stuff $pgorev"
            $komut
            
            sleep 1

            # Reset Tipco Basketbol Bulletin
            isim="BasketbolBulletinTipico"
            screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
            screen -S "$isim" -X quit
            sleep 0.5
            pgorev='\\"^?cd;cd GoHost/GoBot;python3 starter.py -type TipicoBulletinBot -headless 1  -amq 192.168.2.31 -amqHost BetGoDev -hub http://localhost:4444/wd/hub -rbc basketball \\n\\"^?'
            screen -dmS "$isim"
            sleep 1
            komut="screen -S "$isim" -X stuff $pgorev"
            $komut
            
            sleep 1

            # Reset Tipco Diğer Branş Bulletin
            isim="OtherBransBulletinTipico"
            screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
            screen -S "$isim" -X quit
            sleep 0.5
            pgorev='\\"^?cd;cd GoHost/GoBot;python3 starter.py -type TipicoBulletinBot -headless 1  -amq 192.168.2.31 -amqHost BetGoDev -hub http://localhost:4444/wd/hub -rbc tennis,handball,volleyball,ice-hockey,darts,table-tennis \\n\\"^?'
            screen -dmS "$isim"
            sleep 1
            komut="screen -S "$isim" -X stuff $pgorev"
            $komut
            
            sleep 1

            # Reset TipBet Scpecial Bulletin
            isim="TipBetSpecialBulletin"
            screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
            screen -S "$isim" -X quit
            sleep 0.5
            pgorev='\\"^?cd;cd GoHost/GoBot;python3 starter.py -type TipBetBulletinBot -headless 1  -amq 192.168.2.31 -amqHost BetGoDev -hub http://localhost:4444/wd/hub -rbc Futbol \\n\\"^?'
            screen -dmS "$isim"
            sleep 1
            komut="screen -S "$isim" -X stuff $pgorev"
            $komut
            
            sleep 1

          `;

    /*
          
          
      # Reset TipBet Scpecial Bulletin
      isim="TipBetSpecialBulletin"
      screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
      screen -S "$isim" -X quit
      sleep 0.5
      pgorev='\\"^?cd;cd GoHost/GoBot;python3 starter.py -type TipBetBulletinBot -headless 1  -amq 192.168.2.31 -amqHost BetGoDev -hub http://localhost:4444/wd/hub -rbc Futbol \\n\\"^?'
      screen -dmS "$isim"
      sleep 1
      komut="screen -S "$isim" -X stuff $pgorev"
      $komut
      
      sleep 1

    */
    var b64File = Buffer.from(file).toString("base64");
    var restartFile = "";
    restartFile = "screen -ls;";
    restartFile += "echo -e '" + b64File + "' | base64 --decode | bash -s -l;";
    restartFile += "screen -ls";
    console.log(restartFile);

    return restartFile;
};

const otherbullitencommand = () => {
    var file = "";

    file = `#!/bin/bash
  
          # Reset Selenium
          isim="selenium"
          screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
          screen -S "$isim" -X quit
          sleep 0.5
          pgorev='\\"^?cd;cd selenium;java -jar selenium-server-standalone-3.141.59.jar\\n\\"^?'
          screen -dmS "$isim"
          sleep 1
          komut="screen -S "$isim" -X stuff $pgorev"
          $komut
          
          sleep 3

          # Reset Bulletin other
          isim="bulletinother"
          screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
          screen -S "$isim" -X quit
          sleep 0.5
          pgorev='\\"^?cd;cd GoHost/GoBot;python3 starter.py -type RivaloBullet -headless 1 -rbc otherbots -ps 8500 --url http://bahigo.com -amq 192.168.2.31 -amqHost BetGoDev -hub http://localhost:4444/wd/hub \\n\\"^?'
          screen -dmS "$isim"
          sleep 1
          komut="screen -S "$isim" -X stuff $pgorev"
          $komut
          
          sleep 1
  
          
            
          `;

    console.log(file);
    var b64File = Buffer.from(file).toString("base64");
    var restartFile = "";
    restartFile = "screen -ls;";
    restartFile += "echo -e '" + b64File + "' | base64 --decode | bash -s -l;";
    restartFile += "screen -ls";
    console.log(restartFile);

    return restartFile;
};

const tipicocommand = () => {
    var file = "";

    file = `#!/bin/bash
  

          # Reset Tipco LiveBulletin
          isim="ListeTipico"
          screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
          screen -S "$isim" -X quit
          sleep 0.5
          pgorev='\\"^?cd;cd GoHost/GoBot;python3 starter.py -type TipicoLiveList -headless 1  -amq 192.168.2.31 -amqHost BetGoDev -hub http://localhost:4444/wd/hub \\n\\"^?'
          screen -dmS "$isim"
          sleep 1
          komut="screen -S "$isim" -X stuff $pgorev"
          $komut
          
          sleep 1

          
          # Reset Tipco Futbol Live  
          isim="FutbolCanlitipico"
          screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
          screen -S "$isim" -X quit
          sleep 0.5
          pgorev='\\"^?cd;cd GoHost/GoBot;python3 starter.py -type TipicoLiveBot -headless 1  -amq 192.168.2.31 -amqHost BetGoDev -hub http://localhost:4444/wd/hub -rbc soccer \\n\\"^?'
          screen -dmS "$isim"
          sleep 1
          komut="screen -S "$isim" -X stuff $pgorev"
          $komut
          
          sleep 1



          # Reset Tipco Brans Live  
          isim="BransCanlitipico"
          screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
          screen -S "$isim" -X quit
          sleep 0.5
          pgorev='\\"^?cd;cd GoHost/GoBot;python3 starter.py -type TipicoLiveBot -headless 1  -amq 192.168.2.31 -amqHost BetGoDev -hub http://localhost:4444/wd/hub -rbc basketball,tennis,handball,volleyball,ice-hockey,darts,table-tennis \\n\\"^?'
          screen -dmS "$isim"
          sleep 1
          komut="screen -S "$isim" -X stuff $pgorev"
          $komut
          
          sleep 1


          # Reset Tipco Betgo  
          isim="BetgoTipico"
          screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
          screen -S "$isim" -X quit
          sleep 0.5
          pgorev='\\"^?cd;cd GoHost/GoBot;python3 starter.py -type TipicoCounterBot -headless 1  -amq 192.168.2.31 -amqHost BetGoDev -hub http://localhost:4444/wd/hub \\n\\"^?'
          screen -dmS "$isim"
          sleep 1
          komut="screen -S "$isim" -X stuff $pgorev"
          $komut
          
          sleep 1
  
          # Reset Tipco Radar  
          isim="TipicoRadar"
          screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
          screen -S "$isim" -X quit
          sleep 0.5
          pgorev='\\"^?cd;cd GoHost/GoBot;python3 starter.py -type TipicoRadarBot -headless 1  -amq 192.168.2.31 -amqHost BetGoDev -hub http://localhost:4444/wd/hub \\n\\"^?'
          screen -dmS "$isim"
          sleep 1
          komut="screen -S "$isim" -X stuff $pgorev"
          $komut
          
          sleep 1

            

            
          `;

    console.log(file);
    var b64File = Buffer.from(file).toString("base64");
    var restartFile = "";
    restartFile = "screen -ls;";
    restartFile += "echo -e '" + b64File + "' | base64 --decode | bash -s -l;";
    restartFile += "screen -ls";
    console.log(restartFile);

    return restartFile;
};

const tipicoTestcommand = () => {
    var file = "";

    file = `#!/bin/bash
  

          # Reset Tipco LiveBulletin
          isim="ListeTipicoTest"
          screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
          screen -S "$isim" -X quit
          sleep 0.5
          pgorev='\\"^?cd;cd GoHost/GoBot;python3 starter.py -type TipicoLiveList -headless 1  -amq 192.168.2.31 -amqHost BetGoDevTest -hub http://localhost:4444/wd/hub \\n\\"^?'
          screen -dmS "$isim"
          sleep 1
          komut="screen -S "$isim" -X stuff $pgorev"
          $komut
          
          sleep 1

          
          # Reset Tipco Futbol Live  
          isim="FutbolCanlitipicoTest"
          screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
          screen -S "$isim" -X quit
          sleep 0.5
          pgorev='\\"^?cd;cd GoHost/GoBot;python3 starter.py -type TipicoLiveBot -headless 1  -amq 192.168.2.31 -amqHost BetGoDevTest -hub http://localhost:4444/wd/hub -rbc soccer \\n\\"^?'
          screen -dmS "$isim"
          sleep 1
          komut="screen -S "$isim" -X stuff $pgorev"
          $komut
          
          sleep 1



          # Reset Tipco Brans Live  
          isim="BransCanlitipicoTest"
          screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
          screen -S "$isim" -X quit
          sleep 0.5
          pgorev='\\"^?cd;cd GoHost/GoBot;python3 starter.py -type TipicoLiveBot -headless 1  -amq 192.168.2.31 -amqHost BetGoDevTest -hub http://localhost:4444/wd/hub -rbc basketball,tennis,handball,volleyball,ice-hockey,darts,table-tennis \\n\\"^?'
          screen -dmS "$isim"
          sleep 1
          komut="screen -S "$isim" -X stuff $pgorev"
          $komut
          
          sleep 1


          # Reset Tipco Betgo  
          isim="BetgoTipicoTest"
          screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
          screen -S "$isim" -X quit
          sleep 0.5
          pgorev='\\"^?cd;cd GoHost/GoBot;python3 starter.py -type TipicoCounterBot -headless 1  -amq 192.168.2.31 -amqHost BetGoDevTest -hub http://localhost:4444/wd/hub \\n\\"^?'
          screen -dmS "$isim"
          sleep 1
          komut="screen -S "$isim" -X stuff $pgorev"
          $komut
          
          sleep 1


          # Reset Tipco Radar  
          isim="TipicoRadarTest"
          screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
          screen -S "$isim" -X quit
          sleep 0.5
          pgorev='\\"^?cd;cd GoHost/GoBot;python3 starter.py -type TipicoRadarBot -headless 1  -amq 192.168.2.31 -amqHost BetGoDevTest -hub http://localhost:4444/wd/hub \\n\\"^?'
          screen -dmS "$isim"
          sleep 1
          komut="screen -S "$isim" -X stuff $pgorev"
          $komut
          
          sleep 1
  
          # Reset Tipco Bulletin
          isim="BulletinTipicoTest"
          screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
          screen -S "$isim" -X quit
          sleep 0.5
          pgorev='\\"^?cd;cd GoHost/GoBot;python3 starter.py -type TipicoBulletinBot -headless 1  -amq 192.168.2.31 -amqHost BetGoDevTest -hub http://localhost:4444/wd/hub -rbc soccer,basketball,tennis,handball,volleyball,ice-hockey,darts,table-tennis \\n\\"^?'
          screen -dmS "$isim"
          sleep 1
          komut="screen -S "$isim" -X stuff $pgorev"
          $komut
          
          sleep 1

          # Reset TipBet Scpecial Bulletin
          isim="TipBetSpecialBulletin"
          screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
          screen -S "$isim" -X quit
          sleep 0.5
          pgorev='\\"^?cd;cd GoHost/GoBot;python3 starter.py -type TipBetBulletinBot -headless 1  -amq 192.168.2.31 -amqHost BetGoDevTest -hub http://localhost:4444/wd/hub -rbc Futbol \\n\\"^?'
          screen -dmS "$isim"
          sleep 1
          komut="screen -S "$isim" -X stuff $pgorev"
          $komut
          
          sleep 1
            
          `;

    console.log(file);
    var b64File = Buffer.from(file).toString("base64");
    var restartFile = "";
    restartFile = "screen -ls;";
    restartFile += "echo -e '" + b64File + "' | base64 --decode | bash -s -l;";
    restartFile += "screen -ls";
    console.log(restartFile);

    return restartFile;
};

const tipbetTestcommand = () => {
    var file = "";

    file = `#!/bin/bash
  

          # Reset Tipbet LiveBulletin
          isim="ListeTipbetTest"
          screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
          screen -S "$isim" -X quit
          sleep 0.5
          pgorev='\\"^?cd;cd GoHost/GoBot;python3 starter.py -type TipBetLiveListBot -headless 1  -amq 192.168.2.31 -amqHost BetGoDevTest -hub http://localhost:4444/wd/hub \\n\\"^?'
          screen -dmS "$isim"
          sleep 1
          komut="screen -S "$isim" -X stuff $pgorev"
          $komut
          
          sleep 1

          
          # Reset Tipbet Live  
          isim="TipBetLiveBot"
          screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
          screen -S "$isim" -X quit
          sleep 0.5
          pgorev='\\"^?cd;cd GoHost/GoBot;python3 starter.py -type TipBetLiveBot -headless 1  -amq 192.168.2.31 -amqHost BetGoDevTest -hub http://localhost:4444/wd/hub -rbc soccer \\n\\"^?'
          screen -dmS "$isim"
          sleep 1
          komut="screen -S "$isim" -X stuff $pgorev"
          $komut
          
          sleep 1



        
            
          `;

    console.log(file);
    var b64File = Buffer.from(file).toString("base64");
    var restartFile = "";
    restartFile = "screen -ls;";
    restartFile += "echo -e '" + b64File + "' | base64 --decode | bash -s -l;";
    restartFile += "screen -ls";
    console.log(restartFile);

    return restartFile;
};

const prsTestcommand = () => {
    var file = "";

    file = `#!/bin/bash
        
        # Reset Selenium
        isim="selenium"
        screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
        screen -S "$isim" -X quit
        sleep 0.5
        pgorev='\\"^?cd;cd selenium;java -jar selenium-server-standalone-3.141.59.jar\\n\\"^?'
        screen -dmS "$isim"
        sleep 1
        komut="screen -S "$isim" -X stuff $pgorev"
        $komut
        
        sleep 3  

        # PRSPre
        isim="PRSPre"
        screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
        screen -S "$isim" -X quit
        sleep 0.5
        pgorev='\\"^?cd;cd GoHost/GoBot;python3 starter.py -type PRSPreMatchBot -headless 1 -ps 5800  -amq 192.168.2.31 -amqHost PRS -hub http://localhost:4444/wd/hub -url http://www.delalb.com/en/ \\n\\"^?'
        screen -dmS "$isim"
        sleep 1
        komut="screen -S "$isim" -X stuff $pgorev"
        $komut
        
        sleep 1

        
        # PTipicoPre  
        isim="PT"
        screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
        screen -S "$isim" -X quit
        sleep 0.5
        pgorev='\\"^?cd;cd GoHost/GoBot;python3 starter.py -type PRSTipicoBulletinBot -headless 1  -amq 192.168.2.31 -amqHost PRS -hub http://localhost:4444/wd/hub -rbc soccer \\n\\"^?'
        screen -dmS "$isim"
        sleep 1
        komut="screen -S "$isim" -X stuff $pgorev"
        $komut
        
        sleep 1



        
            
          `;

    console.log(file);
    var b64File = Buffer.from(file).toString("base64");
    var restartFile = "";
    restartFile = "screen -ls;";
    restartFile += "echo -e '" + b64File + "' | base64 --decode | bash -s -l;";
    restartFile += "screen -ls";
    console.log(restartFile);

    return restartFile;
};


const EndCommand = function(command) {
    var b64File = Buffer.from(command).toString("base64");
    var restartFile = "";
    //restartFile = "screen -ls;";

    //restartFile += "echo -e '" + b64File + "' | base64 --decode | bash -s -l;";
    restartFile += "echo -e '" + command + "' | bash -s -l;";

    //restartFile += "screen -ls";
    //console.log(restartFile);

    this.command = restartFile;
};

const ScreenListCommand = function() {
    this.command = `
    screen -ls`;
}

const KillAll = function({ apps }) {
    this.command =
        `
    killall ${apps}` || "";
};

const StopVpn = function() {

    this.command = `
          sudo protonvpn d`;

}

const StartVpn = function({ region }) {

    if (!region)
        region = 'DE'
    this.command = `
          sudo protonvpn c --cc ${region}`;

}

const RestartServer = function() {
    this.command = `
  sudo reboot`;
}

const CurlIp = function({ url }) {
    this.command = `
        curl ${url}
  `
}

const Selenium = function() {
    this.command = `
    
    # Reset Selenium
    isim="selenium"
    screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
    screen -S "$isim" -X quit
    sleep 0.5


    pgorev='\\"^?cd;cd selenium;java -jar selenium-server-standalone-3.141.59.jar\\n\\"^?'
    screen -dmS "$isim"
    sleep 1
    komut="screen -S "$isim" -X stuff $pgorev"
    $komut
    
    sleep 3
        `;
}

const LiveBotCommand = function({ category, botIndex, botCount }) {
    this.command = `        
    # Reset RivaloSplitLiveBot
    isim${category}${botIndex}="CanliBot${category}x${botIndex}"
    screens=$(screen -ls | grep [{0-9}]*.$isim${category}${botIndex} | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
    screen -S "$isim${category}${botIndex}" -X quit
    sleep 0.5
    pgorev='\\"^?cd;cd GoHost/GoBot;python3 starter.py -bot "'${category}x${botIndex}x10'" -type SplitLiveBot -time 60 -headless 1 -url  https://bahigo.com/tr/canli-bahis -amq 192.168.2.31 -amqHost BetGoDev -hub http://localhost:4444/wd/hub \\n\\"^?'
    screen -dmS "$isim${category}${botIndex}"
    sleep 1
    komut="screen -S "$isim${category}${botIndex}" -X stuff $pgorev"
    $komut
    
    sleep 1`;
};

/*-rbc futbol -ps 1200 --url http://bahigo.com -amqHost BetGoDevTest -hub http://localhost:4444/wd/hub */
const GenericBotCreateCommand = function({
    name,
    url,
    rbc,
    ps,
    amqHost,
    hub,
}) {
    this.command = `        
    # Reset Bot
    isim="${name}"
    screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
    screen -S "$isim" -X quit
    sleep 0.5`;

    let paramas = ` -type ${name}`;

    if (url) {
        paramas += ` -url ${url}`;
    }
    if (rbc) {
        paramas += ` -rbc ${rbc}`;
    }
    if (ps) {
        paramas += ` -ps ${ps}`;
    }
    if (amqHost) {
        paramas += ` -amqHost ${amqHost}`;
    }
    if (hub) {
        paramas += ` -hub ${hub}`;
    }

    this.command += `
    pgorev='\\"^?cd;cd GoHost/GoBot;python3 starter.py   ${paramas} \\n\\"^?'
    screen -dmS "$isim"
    sleep 1
    komut="screen -S "$isim" -X stuff $pgorev"
    $komut
   
    sleep 1`;
};


const BotNodeCreateCommand = function({
    runtype,
    loglevel,
    startnode,
}) {
    this.command = `        
    # Reset BotNode
    isim="${startnode}"
    screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
    screen -S "$isim" -X quit
    sleep 0.5`;

    let paramas = ` -startnode ${startnode}`;

    if (loglevel) {
        paramas += ` -loglevel ${loglevel}`;
    }
    if (runtype) {
        paramas += ` -runtype ${runtype}`;
    }

    this.command += `
    pgorev='\\"^?cd;cd GoHost/BotNode;python3 botnode.py   ${paramas} \\n\\"^?'
    screen -dmS "$isim"
    sleep 1
    komut="screen -S "$isim" -X stuff $pgorev"
    $komut
   
    sleep 1`;
};


const BullitenLiveBot = function({}) {
    this.command = `
  # Reset Bulletin Live
  isim="bulletinlive"
  screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
  screen -S "$isim" -X quit
  sleep 0.5
  pgorev='\\"^?cd;cd GoHost/BetGoRadarBot; dotnet BetGoRadarCore.dll \\n\\"^?'
  screen -dmS "$isim"
  sleep 1
  komut="screen -S "$isim" -X stuff $pgorev"
  $komut
  
  sleep 1`;
}

module.exports = {
    lockercommand,
    bulletincommand,
    otherbullitencommand,
    tipicocommand,
    tipicoTestcommand,
    tipbetTestcommand,
    prsTestcommand,
    KillAll,
    Selenium,
    LiveBotCommand,
    GenericBotCreateCommand,
    EndCommand,
    ScreenListCommand,
    StartVpn,
    StopVpn,
    CurlIp,
    RestartServer,
    BullitenLiveBot,
    BotNodeCreateCommand

};