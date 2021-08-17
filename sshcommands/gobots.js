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
          pgorev='\\"^?cd;cd GoHost/GoBot;python3 starter.py -type "LockerBot" -hub "http://localhost:4444/wd/hub" -url https://bahigo.com/tr/canli-bahis -amqRoute rivalo.bot.suspending -amq 172.16.5.10 -amqHost BetGoDevTest\\n\\"^?'
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
          # Reset Selenium
          # Kill Chrome
          pkill -f chrom
          
          # Kill Phantom
          pkill -f phantom
          

  
          
          # Reset Bulletin Futbol
          isim="bulletinfutbol"
          screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
          screen -S "$isim" -X quit
          sleep 0.5
          pgorev='\\"^?cd;cd GoHost/GoBot;python3 starter.py -type RivaloBullet -rbc futbol -ps 1200 --url http://bahigo.com -amqHost BetGoDevTest -hub http://localhost:4444/wd/hub \\n\\"^?'
          screen -dmS "$isim"
          sleep 1
          komut="screen -S "$isim" -X stuff $pgorev"
          $komut
          
          sleep 1
  
          
          # Reset Bulletin Basketbol
          isim="bulletinbasketbol"
          screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
          screen -S "$isim" -X quit
          sleep 0.5
          pgorev='\\"^?cd;cd GoHost/GoBot;python3 starter.py -type RivaloBullet -rbc basketbol -ps 3500 --url http://bahigo.com -amqHost BetGoDevTest -hub http://localhost:4444/wd/hub \\n\\"^?'
          screen -dmS "$isim"
          sleep 1
          komut="screen -S "$isim" -X stuff $pgorev"
          $komut
          
          sleep 1
  
  
  
  
          # Reset Listen Bot
          isim="listen"
          screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
          screen -S "$isim" -X quit
          sleep 0.5
          pgorev='\\"^?cd;cd GoHost/GoBot;python3 starter.py -type RivaloListenBot --url http://bahigo.com -amqHost BetGoDevTest -hub http://172.16.5.21:4444/wd/hub \\n\\"^?'
          screen -dmS "$isim"
          sleep 1
          komut="screen -S "$isim" -X stuff $pgorev"
          $komut
          
          sleep 1
  
  
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
          
          sleep 1
  
  
          `;

  var b64File = Buffer.from(file).toString("base64");
  var restartFile = "";
  restartFile = "screen -ls;";
  restartFile += "echo -e '" + b64File + "' | base64 --decode | bash -s -l;";
  restartFile += "screen -ls";
  console.log(restartFile);

  return restartFile;
};

const livebotcommand = (parameter) => {
  botCount = parameter.split(";")[0].split("x")[3];

  var file = "";

  // tüm screenlar uçur
  file = `#!/bin/bash`;
  file += `killall screen
           sleep 0.5
  `;

  //   file += `
  //         # Reset Selenium
  //         # Kill Chrome
  //         pkill -f chrom

  //         # Kill Phantom
  //         pkill -f phantom

  //         # Reset Selenium
  //         isim="selenium"
  //         screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
  //         screen -S "$isim" -X quit
  //         sleep 0.5

  //         pgorev='\\"^?cd;cd selenium;java -jar selenium-server-standalone-3.141.59.jar\\n\\"^?'
  //         screen -dmS "$isim"
  //         sleep 1
  //         komut="screen -S "$isim" -X stuff $pgorev"
  //         $komut

  //         sleep 3
  //         `;

  file += `

        # Reset RivaloLive
        isim="livebot"
        screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
        screen -S "$isim" -X quit
        for((index=1;index<=5;index++))
        do
            screen -S "$isim$index" -X quit
            sleep 1
            done
            `;

  file += `

        # Reset RivaloLive
        isim="livebot"
        screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
        screen -S "$isim" -X quit
        for((index=1;index<=${botCount};index++))
        do
            screen -S "$isim$index" -X quit
            sleep 1
            screen -dmS "$isim$index"
            sleep 1
            pgorev='\\"^?cd;cd GoHost/GoBot;python3 starter.py -bot "'$index''x${botCount}'" -type RivaloBot -time 60 -url  https://bahigo.com/tr/canli-bahis \\n\\"^?'
            komut="screen -S "$isim$index" -X stuff $pgorev"
            $komut
        done`;

  file += `
        # Reset RivaloBetgo
        isim="betgobot"
        screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
        screen -S "$isim" -X quit
        sleep 0.5
        pgorev='\\"^?cd;cd GoHost/GoBot;python3 starter.py -type BetGoBot -url  https://bahigo.com/tr/canli-bahis \\n\\"^?'
        screen -dmS "$isim"
        sleep 1
        komut="screen -S "$isim" -X stuff $pgorev"
        $komut
        
        sleep 1



        # Reset RivaloGuard
        isim="guardbot"
        screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
        screen -S "$isim" -X quit
        sleep 0.5
        pgorev='\\"^?cd;cd GoHost/GoBot;python3 starter.py  -type GuardBot -url  https://bahigo.com/tr/canli-bahis \\n\\"^?'
        screen -dmS "$isim"
        sleep 1
        komut="screen -S "$isim" -X stuff $pgorev"
        $komut
        
        sleep 1 `;

  var b64File = Buffer.from(file).toString("base64");
  var restartFile = "";
  restartFile = "screen -ls;";
  restartFile += "echo -e '" + b64File + "' | base64 --decode | bash -s -l;";
  restartFile += "screen -ls";
  console.log(restartFile);

  return restartFile;
};

const EndCommand = function (command) {
  var b64File = Buffer.from(command).toString("base64");
  var restartFile = "";
  //restartFile = "screen -ls;";
  
  restartFile += "echo -e '" + b64File + "' | base64 --decode | bash -s -l;";
  //restartFile += "echo -e '" + command + "' | bash -s -l;";
  
  //restartFile += "screen -ls";
  //console.log(restartFile);

  this.command = restartFile;
};

const ScreenListCommand = function(){
    this.command = `
    screen -ls`;
}

const KillAll = function ({ apps }) {
  this.command =
    `
    killall ${apps}` || "";
};

const Selenium = function () {
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
};

const LiveBotCommand = function ({ category, botIndex, botCount }) {
  this.command = `        
    # Reset RivaloSplitLiveBot
    isim${category}${botIndex}="CanliBot${category}x${botIndex}"
    screens=$(screen -ls | grep [{0-9}]*.$isim${category}${botIndex} | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
    screen -S "$isim${category}${botIndex}" -X quit
    sleep 0.5
    pgorev='\\"^?cd;cd GoHost/GoBot;python3 starter.py -bot "'${category}x${botIndex}x${botCount}'" -type SplitLiveBot -time 60 -headless 0 -url  https://bahigo.com/tr/canli-bahis \\n\\"^?'
    screen -dmS "$isim${category}${botIndex}"
    sleep 1
    komut="screen -S "$isim${category}${botIndex}" -X stuff $pgorev"
    $komut
    
    sleep 1`;
};
/*-rbc futbol -ps 1200 --url http://bahigo.com -amqHost BetGoDevTest -hub http://localhost:4444/wd/hub */
const GenericBotCreateCommand = function ({
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

module.exports = {
  lockercommand,
  bulletincommand,
  livebotcommand,
  KillAll,
  Selenium,
  LiveBotCommand,
  GenericBotCreateCommand,
  EndCommand,
  ScreenListCommand
};
