
import authInfo from './auth_info.json';

window.addEventListener('DOMContentLoaded', async () => {

  if(!window["NL_TOKEN"])window["NL_TOKEN"] = authInfo["nlToken"] || undefined;
  if(!window["NL_PORT"])window["NL_PORT"] = authInfo["nlPort"] || undefined;
  if(!window["NL_ARGS"])window["NL_ARGS"] = ["--neu-dev-auto-reload"]

  try{
    
    await window["Neutralino"].init();

    window["Neutralino"].events.on("windowClose", () => {
      window["Neutralino"].app.exit();
    });

    
  }
  catch(error){

  }
  finally{

  }

});