class Sequenceur {
	constructor(name, loop, sounds) {
		this.seq = sounds;
		this.playing = false;
		this.loop = loop;
		this.name = name;
		this.doneNb = 0;
		this.origine = null;
		this.origine_time = null;
		for (var e in this.seq) {
			this.seq[e][1] = scene.getSoundByName(this.seq[e][1]).clone()
		}
	}

	isPlaying(){
		return this.playing;
	}

	getPriority(){
		if (this.origine === null) {
			return -1
		}
		else if (this.origine === "classic") {
			return 0
		}
		else if (this.origine === "nimbus") {
			return 1
		}
		else if (this.origine === "focus") {
			return 2
		}
		else if (this.origine === "click") {
			return 3
		}
	}

	play(origine){
		this.origine = origine;
		this.origine_time = Date.now()
		if (this.isPlaying()) return;
		for (var e in this.seq) {
			let s = this.seq[e];
			let eps = Math.floor(Math.random() * s[2]);
			setTimeout(this.playSound.bind(this, s[1], parseInt(e)), s[0] + eps);
		}
		this.doneNb = 0
		this.playing = true;
		updateCocktail();
	}

	playSound(sound, i){
		sound.play()
		sound.onEndedObservable.addOnce(this.done.bind(this))

	}

	setVolume(vol){
		if (!this.isPlaying()) return;
		for (var e in this.seq) {
			let s = this.seq[e];
			s[1].setVolume(vol)
		}
	}
	done(){
		this.doneNb += 1;
		if (this.doneNb == this.seq.length){
			this.setVolume(1)
			this.playing = false;
			if (this.loop){
				this.play(this.origine)
			}
		}

	}
}
