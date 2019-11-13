class Sequenceur {
	constructor(name, loop, sounds) {
		this.seq = sounds;
		this.playing = false;
		this.loop = loop;
		this.name = name;
		this.doneNb = 0;
	}

	isPlaying(){
		return this.playing;
	}

	play(){
		if (this.isPlaying()) return;
		for (var e in this.seq) {
			let s = this.seq[e];
			let eps = Math.floor(Math.random() * s[2]);
			setTimeout(this.playSound.bind(this, s[1], parseInt(e)), s[0] + eps);
		}
		this.doneNb = 0
		this.playing = true;
	}

	playSound(sound_name, i){
		let sound = scene.getSoundByName(sound_name)
		sound.play()
		sound.onEndedObservable.addOnce(this.done.bind(this))

	}

	done(){
		this.doneNb += 1;
		if (this.doneNb == this.seq.length){
			this.playing = false;
			if (this.loop){
				this.play()
			}
		}

	}
}
