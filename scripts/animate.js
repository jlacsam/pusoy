const AnimationOption = {
    Linear : 0,
    SlowDown : 1,
    SpeedUp : 2,
    SpeedUpSlowDown : 3
}

function animate(object,duration,delay,target,option = AnimationOption.Linear,completion) {
	let start_time = undefined;
	let start_position, start_rotation, start_alpha;
	let value = {...target};

	function step(t) {
		if (start_time == undefined) {
			start_time = t;
		}
		let elapsed = t - start_time;

		// Change properties here
		let ratio = duration > 0 ? elapsed / duration : 1.0;

		if (option == AnimationOption.Linear) {
			ratio *= 1.0; 
		} else if (option == AnimationOption.SlowDown) {
			ratio = -1.0 * (ratio - 1.0) * (ratio - 1.0) + 1.0;
		} else if (option == AnimationOption.SpeedUp) {
			ratio *= ratio;
		} else { // Speed up then slow down
			ratio = Math.sqrt(-1.0 * (ratio - 1.0) * (ratio - 1.0) + 1.0);
		}

		if (value.position != undefined) {
			object.x = ratio * (value.position.x - start_position.x) + start_position.x;
			object.y = ratio * (value.position.y - start_position.y) + start_position.y;
		}
		if (value.rotation != undefined) {
			object.rotation = ratio * (value.rotation - start_rotation) + start_rotation;
		}
		if (value.alpha != undefined) {
			object.alpha = ratio * (value.alpha - start_alpha) + start_alpha;
		}

		if (elapsed < duration) {
			requestAnimationFrame(step);
		} else {
			if (value.zIndex != undefined) {
				object.zIndex = value.zIndex;
			}
			if (completion != undefined) {
				if (typeof completion === "function") {
					completion(arguments[6],arguments[7],arguments[8],arguments[9],arguments[10]);
				} else if (typeof completion === "object") {
					if (completion.position != undefined) {
						object.x = completion.position.x;
						object.y = completion.position.y;
					}
					if (completion.rotation != undefined) {
						object.rotation = completion.rotation;
					}
					if (completion.alpha != undefined) {
						object.alpha = completion.alpha;
					}
					if (completion.zIndex != undefined) {
						object.zIndex = completion.zIndex;
					}
				}
			}
		}
	}

	function kickstart() {
		start_position = { x:object.x, y:object.y };
		start_rotation = object.rotation;
		start_alpha = object.alpha;
		requestAnimationFrame(step);
	}

	setTimeout(kickstart,delay);
}

