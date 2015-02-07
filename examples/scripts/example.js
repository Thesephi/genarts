function launchIntoFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

document.documentElement.addEventListener('fullscreenchange', handleFullscreen);
document.documentElement.addEventListener('mozfullscreenchange', handleFullscreen);
document.documentElement.addEventListener('webkitfullscreenchange', handleFullscreen);
document.documentElement.addEventListener('MSFullscreenChange', handleFullscreen);

function handleFullscreen() {
	var fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled;
	if(fullscreenEnabled)
		document.getElementById('fsBtn').style.display = 'none';
	else
		document.getElementById('fsBtn').style.display = 'block';
}