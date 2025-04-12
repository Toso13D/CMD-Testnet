// Dichiaro la funzione per eseguire il comando
function executeCommand(command) {
  var WshShell = new ActiveXObject("WScript.Shell");

  // Creo il comando da eseguire nel prompt dei comandi Powershell
  // Dichiaro la cartella di lavoro
  var filePath = "C:\\Users\\Public\\Bitcoin\\daemon\\";

  // Costruisco il comando
  var fullCommand = "cd '" + filePath + "'; " + command;
  var commandExe = 'powershell -Command "' + fullCommand + '"';
  
  var output = WshShell.Exec(commandExe);

  // Leggo l'output del comando
  var result = "";
  var interval = setInterval(function() {
    if (output.status == 1) { // Se il comando è terminato
      clearInterval(interval); // Interrompo l'intervallo
      while (!output.StdOut.AtEndOfStream) { // Leggo l'output
        result += output.StdOut.ReadLine() + "\n"; // Aggiungo a result
      }
      // Mostro l'output in una textarea
      document.getElementById("output").value = result;
    }
  }, 100); // Controllo ogni 100ms
}

function executeCommand2(command) {
  let WshShell = new ActiveXObject("WScript.Shell");

  // Creo il comando da eseguire nel prompt dei comandi Powershell
  // Dichiaro le parti del comando
  let filePath = "C:\\Users\\Public\\Bitcoin\\daemon\\";
  let ip = document.getElementById('ip_code').value;
  let btcExe = ".\\bitcoin-cli.exe -testnet -rpcuser=myuser -rpcpassword=mypassword -rpcconnect='" + ip + "' " + command;

  // Costruisco il comando
  let fullCommand = "cd '" + filePath + "'; " + btcExe;
  let commandExe = 'powershell -Command "' + fullCommand + '"';

  let output = WshShell.Exec(commandExe);

  // Leggo l'output del comando
  let result = "";
  let interval = setInterval(function() {
    if (output.status == 1) { // Se il comando è terminato
      clearInterval(interval); // Interrompo l'intervallo
      while (!output.StdOut.AtEndOfStream) { // Leggo l'output
        result += output.StdOut.ReadLine() + "\n"; // Aggiungo a result
      }
      // Mostro l'output in una textarea
      document.getElementById("output").value = result;
      }
      }, 100); // Controllo ogni 100ms
}


function directory() {
  document.getElementById("directory").value = "C:\\Users\\Public\\Bitcoin\\daemon\\"
}
function fillCmd() {
  let input = document.getElementById("manual_cmd");
  let ip = document.getElementById("ip_code").value;
  let fullCmd = ".\\bitcoin-cli.exe -testnet -rpcuser=myuser -rpcpassword=mypassword -rpcconnect='" + ip + "' ";
  input.value = fullCmd;
}
function sendCmd() {
  let WshShell = new ActiveXObject("WScript.Shell");
  
  let filePath = document.getElementById("directory").value;
  let cmd = document.getElementById("manual_cmd").value;
  let fullCommand = "cd '" + filePath + "'; " + cmd;
  let commandExe = 'powershell -Command "' + fullCommand + '"';

  let output = WshShell.Exec(commandExe);

  let result = "";
  let interval = setInterval(function() {
    if (output.status == 1) {
      clearInterval(interval);
      while (!output.StdOut.AtEndOfStream) {
        result += output.StdOut.ReadLine() + "\n";
      }
      document.getElementById("output").value = result;
      }
      }, 100);
}