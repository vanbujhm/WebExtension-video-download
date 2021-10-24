function searchVideo(videoId){
	let flashvars = window.wrappedJSObject['flashvars_' + videoId];
	let qualityItems = window.wrappedJSObject['qualityItems_' + videoId];
	let video240 = false;
	let video480 = false;
	let video720 = false;
	let video1080 = false;

	if(typeof qualityItems !== 'undefined'){
		for(var i = 0, len = qualityItems.length; i < len; i++){
			var media = qualityItems[i];

			if(media.text == '240p'){
				video240 = media.url;
			}else if(media.text == '480p'){
				video480 = media.url;
			}else if(media.text == '720p'){
				video720 = media.url;
			}else if(media.text == '1080p'){
				video1080 = media.url;
			}
		}
	}
	if(typeof flashvars !== 'undefined'){
		if(typeof flashvars.mediaDefinitions !== 'undefined'){
			for(var i = 0, len = flashvars.mediaDefinitions.length; i < len; i++){
				var media = flashvars.mediaDefinitions[i];

				if(media.format == 'mp4'){
					if(media.quality == '240'){
						video240 = media.videoUrl;
					}else if(media.quality == '480'){
						video480 = media.videoUrl;
					}else if(media.quality == '720'){
						video720 = media.videoUrl;
					}else if(media.quality == '1080'){
						video1080 = media.videoUrl;
					}else if(Array.isArray(media.quality) && media.videoUrl.includes('get_media')){
						httpRequest = new XMLHttpRequest();
						if(!httpRequest){
							console.log('Giving up :( Cannot create an XMLHTTP instance');
						}else{
							httpRequest.open('GET', media.videoUrl, false);
							httpRequest.send();
							if(httpRequest.status != 200){
								console.log( httpRequest.status + ': ' + httpRequest.statusText );
							} else {
								mediaInfo = JSON.parse(httpRequest.responseText);

								for(var i = 0, len = mediaInfo.length; i < len; i++){
									var media = mediaInfo[i];

									if(media.quality == '240'){
										video240 = media.videoUrl;
									}else if(media.quality == '480'){
										video480 = media.videoUrl;
									}else if(media.quality == '720'){
										video720 = media.videoUrl;
									}else if(media.quality == '1080'){
										video1080 = media.videoUrl;
									}
								}
							}
						}
					}
				}
			}
			
			if(video1080 != false){
				return video1080;
			}else if(video720 != false){
				return video720;
			}else if(video480 != false){
				return video480;
			}else if(video240 != false){
				return video240;
			}
		}
	}
	return false;
}

function relativeToAbsolute(relativeUrl) {
	var a = document.createElement('a');
	a.href = relativeUrl;
	return a.href;
}

var flashvarsString = false;
var video = false;
var player = document.getElementById('player');

if(player === null){
	player = document.getElementById('videoShow');
}
if(player !== null){
	flashvarsString = player.dataset.videoId;
	video = searchVideo(flashvarsString);
}

if(video === false){
	player = document.getElementsByTagName('video')[0];
	if(player !== undefined){
		var src = '';
		var sources = player.getElementsByTagName('source');
		if(sources.length > 0){
			for (let source of sources) {
				if(source.getAttribute('type') === 'video/mp4'){
					src = source.getAttribute('src')
				}
			}
		}

		if(src !== '' && src !== null){
			video = relativeToAbsolute(src)
		}
	}
}

video;