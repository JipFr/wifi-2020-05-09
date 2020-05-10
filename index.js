const getConnected = require("./getConnected");
const fs = require("fs");

getConnected().then(main);

async function main(data) {
	setTimeout(() => {
		getConnected().then(main);
	}, 60e3 * 1);

	let deviceNames = data.map(d => d.HostName || d.IPAddress || d.MACAddress);
	
	let d = new Date();
	let timeStr = new Date().toISOString().replace(/\/|:|T/g, "-");
	
	for(let name of deviceNames) {
		if(!fs.existsSync(`data/${name}/`)) fs.mkdirSync(`data/${name}/`);

		fs.writeFileSync(`data/${name}/${timeStr}.timemark`, new Date().toLocaleString());

	}

	console.log(`Wrote: ${timeStr}`);

}