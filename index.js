module.exports = function drop(mod){
	const command = mod.command || mod.require.command;
	var enabled = false;
	var currZone;
	
	mod.command.add('fall', ()=>{
		enabled = !enabled;
		command.message(`Fall damage has been ${enabled ? 'en' : 'dis'}abled.`);
	});
	
	mod.hook('S_LOAD_TOPO', 3, e=>{
		currZone = e.zone;
	});
	
	mod.hook('C_PLAYER_LOCATION', 5, e=>{
		if(!enabled) return;
		return !([2, 10].includes(e.type) && (currZone < 10 || currZone > 200));       
	});
}
