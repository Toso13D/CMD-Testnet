// Funzione comando senza rpc...=
function executeCommand(command) {
  let WshShell = new ActiveXObject("WScript.Shell");

  // Creo il comando da eseguire nel prompt dei comandi Powershell
  let filePath = "C:\\Users\\Public\\Bitcoin\\daemon\\";
  // Costruisco il comando
  let commandExe = "powershell -Command \"cd '" + filePath + "'; " + btcExe + '"'; 
  
  // Dichiaro e leggo l'output del comando
  let output = WshShell.Exec(commandExe);
  
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

// Funzione comando con rpc...=
function executeCommandRpc(command) {
  let WshShell = new ActiveXObject("WScript.Shell");

  // Creo il comando da eseguire nel prompt dei comandi Powershell
  let ip = document.getElementById('ip_code').value;
  let rpcWallet = document.getElementById("rpc_wallet").value;
  let filePath = "C:\\Users\\Public\\Bitcoin\\daemon\\";
  let btcExe = ".\\bitcoin-cli.exe -testnet -rpcuser=myuser -rpcpassword=mypassword -rpcconnect='" + ip + "' -rpcwallet='" + rpcWallet + "' " + command;
  // Costruisco il comando
  let commandExe = "powershell -Command \"cd '" + filePath + "'; " + btcExe + '"'; 

  // Dichiaro e leggo l'output del comando
  let output = WshShell.Exec(commandExe);

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
  let rpcWallet = document.getElementById("rpc_wallet").value;
  let fullCmd = ".\\bitcoin-cli.exe -testnet -rpcuser=myuser -rpcpassword=mypassword -rpcconnect='" + ip + "' -rpcwallet='" + rpcWallet + "' ";
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
        document.getElementById("output").value += result;
      }
      }, 100);
}

function clearOutput() {
  document.getElementById("output").value = "";
}