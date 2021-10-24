browser.browserAction.onClicked.addListener(function(){
	function onExecuted(result){
		let downloadUrl = result[0];
		if(downloadUrl !== false){
			browser.runtime.getPlatformInfo().then((info) => {
				if(info.os == 'android'){
					let creating = browser.tabs.create({
						url: downloadUrl
					});
					creating.then(onCreated, onError);
					
				}else{
					browser.downloads.download({
						url : downloadUrl
					});
				}
			});
		}else{
			console.log('Video not found!');
		}
	}

	function onError(error) {
		console.log(`Error: ${error}`);
	}
	
	function onCreated(tab) {
		console.log(`Created new tab: ${tab.id}`)
	}

	let executing = browser.tabs.executeScript({
		file: 'video-download.js'
	})

	executing.then(onExecuted, onError);
});