const ffmpegStreamCommand = (playist) => {

    var playistffMpegCommand = `#!/bin/bash
    # Reset ffmpeg
    # Kill ffmpeg
    killall ffmpeg
    killall screen`;
    for (let index = 0; index < playist.length; index++) {
        const element = playist[index];

        if(element.isactive)
        {
        playistffMpegCommand += `
        
        isim="ffmpeg-${element.name}"
        screens=$(screen -ls | grep [{0-9}]*.$isim | grep -v grep | grep \\) | awk '{print $1}' | grep -o '[[:digit:]].[[:digit:]]*')
        screen -S "$isim" -X quit

        sleep 1
            screen -dmS "$isim$index"
            sleep 1
            pgorev='\\"^?ffmpeg -reconnect 1 -reconnect_at_eof 1 -reconnect_streamed 1 -reconnect_delay_max 5 -hide_banner -stream_loop -1 -re -i ${element.streamurl} -c:a aac -c:v h264 -g 48 -f flv  ${element.outputservers[0].url}  \\n\\"^?'
            komut="screen -S "$isim$index" -X stuff $pgorev"
            $komut
    
        
        \\n`
        }
    }

    
  var b64File = Buffer.from(playistffMpegCommand).toString("base64");
  var restartFile = "";
  restartFile = "screen -ls;";
  restartFile += "echo -e '" + b64File + "' | base64 --decode | bash -s -l;";
  restartFile += "screen -ls";
  console.log(restartFile);

  return restartFile;

 

}

module.exports = {
    ffmpegStreamCommand
}