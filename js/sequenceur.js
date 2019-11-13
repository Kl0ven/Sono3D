class Sequenceur {
	constructor(name, loop, sounds) {
		this.seq = sounds;
		this.playing = false;
		this.loop = loop;
		this.name = name;

	}

	isPlaying(){
		return this.playing;
	}

	play(){
		console.log('playing  seq ' + this.name);
		for (var e in this.seq) {

		}
	}
}
