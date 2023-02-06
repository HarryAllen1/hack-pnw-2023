chrome.commands.onCommand.addListener(function (command) {
	if (command === 'keybind1') {
		console.log(localStorage.getItem('commands'));
		eval(JSON.parse(localStorage.getItem('commands'))[0].code);
	}
	if (command === 'keybind2') {
		console.log('keybind2');
	}
	if (command === 'keybind3') {
		console.log('keybind3');
	}
	if (command === 'keybind4') {
		console.log('keybind4');
	}
});

onkeydown = console.log;
