var util_timer_start = 0;

class Utilities {
	constructor() {
	}

	static startTimer() {
		util_timer_start = Date.now();
	}

	static stopTimer() {
		let util_timer_end = Date.now();
		console.log((util_timer_end-util_timer_start)/1000 + " seconds elapsed.");
	}

	static randomUsername( min_len = 0 ) {

		// First letter distribution in names
		let fld = [
			8.54, 4.50, 4.94, 5.04, 3.06,  2.50, 2.97, 3.08, 1.92, 5.68, 5.44, 4.28, 8.24,
			4.70, 1.83, 3.73, 0.39, 5.47, 10.72, 5.09, 0.72, 1.89, 1.59, 0.35, 1.87, 1.46 ];

		// Letter distribution in names
		let distribution = [ 
			14.8, 1.79, 2.06, 3.11, 9.67, 0.95, 1.70, 4.64, 8.64, 1.56, 2.49, 5.16, 3.54,
			 8.1, 5.11, 1.33, 0.23, 6.28, 5.27, 3.96, 3.24, 1.07, 0.88, 0.22, 2.98, 1.21 ];

		function first_letter(of_name = true) {
			let r = Math.random();
			let total = 0;
			let index = 0;

			if (of_name) {
				for (index = 0; index < fld.length; ++index) {
					total = total + fld[index];
					if (r < total/100) break;
				}
			} else {
				for (index = 0; index < distribution.length; ++index) {
					total = total + distribution[index];
					if (r < total/100) break;
				}
			}

			return String.fromCharCode(index+97);
		}

		function next_letter(options) {
			let adjusted = [];
			let total = 0;
			for (let i = 0; i < options.length; ++i) {
				let c = options[i];
				adjusted.push(distribution[c.charCodeAt(0)-97]);
				total = total + adjusted[i];
			}
			for (let i = 0; i < adjusted.length; ++i) {
				adjusted[i] = adjusted[i] / total;
			}

			let r = Math.random();
			let index = 0;
			total = 0;
			for (index = 0; index < adjusted.length; ++index) {
				total = total + adjusted[index];
				if (r < total) break;
			}

			return options[index];
		}

		let starters = { 
			"a" : ["a","b","c","d","e","f","g","h","j","k","l","m","n","p","r","s","t","u","v","w","x","y","z"],
			"b" : ["a","e","h","i","l","o","r","u","y"],
			"c" : ["a","e","h","i","l","o","r","u","y","z"],
			"d" : ["a","e","i","o","r","u","y"],
			"e" : ["b","c","d","d","e","f","g","h","j","k","l","m","n","p","r","s","t","v","w","x","y","z"],
			"f" : ["a","e","i","l","o","r","u","y"],
			"g" : ["a","e","h","i","l","o","r","u","w","y"],
			"h" : ["a","e","i","o","u","y"],
			"i" : ["b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","x","y","z"],
			"j" : ["a","e","i","o","u","y"],
			"k" : ["a","e","h","i","l","o","r","u","w","y"],
			"l" : ["a","e","i","o","u","y"],
			"m" : ["a","e","i","o","u","y"],
			"n" : ["a","e","g","i","o","u","y"],
			"o" : ["b","c","d","f","g","h","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
			"p" : ["a","e","h","i","l","n","o","r","s","u","y"],
			"q" : ["a","i","o","u","y"],
			"r" : ["a","e","h","i","o","u","w","y"],
			"s" : ["a","b","c","e","h","i","k","l","n","o","p","r","t","u","v","w","y"],
			"t" : ["a","e","h","i","o","r","u","w","y"],
			"u" : ["b","c","d","f","g","j","k","l","m","n","p","q","r","s","t","v","w","x","y","z"],
			"v" : ["a","e","i","o","u","y"],
			"w" : ["a","e","h","i","o","r","u","y"],
			"x" : ["a","e","i","o","u","y"],
			"y" : ["a","e","i","o","u"],
			"z" : ["a","e","i","o","u"]
		}

		let starters_ext = {
			"sc" : ["a","e","h","i","l","o","r","u"],
			"sh" : ["a","e","i","o","r","u","y"],
			"sp" : ["a","e","h","i","l","o","r","u","y"],
			"st" : ["a","e","i","o","r","u","y"],
			"th" : ["a","e","i","o","r","u","y"]
		}

		let enders = {
			"a" : ["b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
			"b" : ["a","e","i","o","s","t","u","y"],
			"c" : ["a","e","h","i","k","o","s","t","u","y"],
			"d" : ["a","d","e","i","l","o","s","t","u","y"],
			"e" : ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","r","s","t","u","v","w","x","y","z"],
			"f" : ["a","e","f","i","o","s","t","u","y"],
			"g" : ["a","e","g","h","i","l","n","o","r","s","u","y"],
			"h" : ["a","d","e","i","l","m","n","o","s","t","u","y"],
			"i" : ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
			"j" : ["a","e","i","o","s","u","y"],
			"k" : ["a","e","h","i","l","o","s","t","u","y"],
			"l" : ["a","b","c","d","e","f","g","i","k","l","m","n","o","p","q","s","t","u","v","y"],
			"m" : ["a","b","e","i","n","o","p","s","u","y"],
			"n" : ["a","c","d","e","g","i","k","n","o","s","t","u","x","y","z"],
			"o" : ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
			"p" : ["a","e","h","i","o","s","t","u","y","z"],
			"q" : ["a","e","i","o","s","u","y"],
			"r" : ["a","b","c","d","e","f","g","i","k","l","m","n","o","p","q","r","s","t","u","v","y","z"],
			"s" : ["a","e","h","i","k","l","m","o","p","t","u","y"],
			"t" : ["a","e","h","i","o","s","t","u","y","z"],
			"u" : ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","p","q","r","s","t","v","w","x","y","z"],
			"v" : ["a","e","i","o","s","u","y","z"],
			"w" : ["a","e","i","k","l","n","o","s","t","u","y","z"],
			"x" : ["a","e","i","l","o","t","u","y"],
			"y" : ["a","e","i","k","m","n","o","p","s","t","u"],
			"z" : ["a","e","i","l","o","u","y"]
		}

		let enders_ext = {
			"t" : "ch",
			"n" : "ch",
			"g" : "ht"
		}

		let n = Math.random();
		let syllables = Math.floor(4 * n) + 1;
		let username = ""
		let standalones = "aeo";
		let vowels = "aeiouy";

		for (let i = 0; i < syllables; ++i) {
			let first = first_letter(i == 0);

			if (!standalones.includes(first) || Math.random() > 0.1) {
				let options = starters[first];
				let second = next_letter(options); //[Math.floor(options.length * Math.random())];
				let third = "";
				let fourth = "";
				let fifth = "";
				let sixth = "";

				// First two letters already has a vowel, stop or add a third
				if (vowels.includes(first) || vowels.includes(second)) {
					if (Math.random() < 0.5) {
						options = enders[second];
						third = next_letter(options); //[Math.floor(options.length * Math.random())];
					}

				// First two letters is a special consonant, must add a third
				} else if (starters_ext[first + second] != undefined) {
					options = starters_ext[first + second];
					third = next_letter(options); //[Math.floor(options.length * Math.random())];

					// Third is a vowel, stop or add a fourth and fifth
					if (vowels.includes(third)) {
						if (Math.random() < 0.1) {
							options = enders[third];
							fourth = next_letter(options); //[Math.floor(options.length * Math.random())];
							if (Math.random() < 0.1) {
								if (enders_ext[fourth] != undefined) {
									fifth = enders_ext[fourth];
								}
							}
						}

					// Third is again a consonant, must add a vowel on the fourth, 
					// then optionally add a fifth and sixth
					} else {
						fourth = vowels.charAt(Math.floor(vowels.length * Math.random()));
						if (Math.random() < 0.1) {
							options = enders[third];
							fifth = next_letter(options); //[Math.floor(options.length * Math.random())];
							if (Math.random() < 0.1) {
								if (enders_ext[fifth] != undefined) {
									sixth = enders_ext[fifth];
								}
							}
						}
					}

				// First two letters are non-special consonants, must add a vowel on the third,
				// then optionally add a fourth and fifth
				} else {
					third = vowels.charAt(Math.floor(vowels.length * Math.random()));
					if (Math.random() < 0.1) {
						options = enders[third];
						fourth = next_letter(options); //Math.floor(options.length * Math.random())];
						if (Math.random() < 0.1) {
							if (enders_ext[fourth] != undefined) {
								fifth = enders_ext[fourth];
							}
						}
					}
				}

				username = username + first + second + third + fourth + fifth + sixth;

			} else {
				username = username + first;
			}

			// If the minimum length is not reached, add another syllable
			if (username.length < min_len && (i+1) == syllables) {
				--i;
			}
		}

		return username;
	}

	static colorNameToHex(color) {
		var colors = {"aliceblue":0xf0f8ff,"antiquewhite":0xfaebd7,"aqua":0x00ffff,"aquamarine":0x7fffd4,"azure":0xf0ffff,"beige":0xf5f5dc,"bisque":0xffe4c4,"black":0x000000,"blanchedalmond":0xffebcd,"blue":0x0000ff,"blueviolet":0x8a2be2,"brown":0xa52a2a,"burlywood":0xdeb887,"cadetblue":0x5f9ea0,"chartreuse":0x7fff00,"chocolate":0xd2691e,"coral":0xff7f50,"cornflowerblue":0x6495ed,"cornsilk":0xfff8dc,"crimson":0xdc143c,"cyan":0x00ffff,"darkblue":0x00008b,"darkcyan":0x008b8b,"darkgoldenrod":0xb8860b,"darkgray":0xa9a9a9,"darkgreen":0x006400,"darkkhaki":0xbdb76b,"darkmagenta":0x8b008b,"darkolivegreen":0x556b2f,"darkorange":0xff8c00,"darkorchid":0x9932cc,"darkred":0x8b0000,"darksalmon":0xe9967a,"darkseagreen":0x8fbc8f,"darkslateblue":0x483d8b,"darkslategray":0x2f4f4f,"darkturquoise":0x00ced1,"darkviolet":0x9400d3,"deeppink":0xff1493,"deepskyblue":0x00bfff,"dimgray":0x696969,"dodgerblue":0x1e90ff,"firebrick":0xb22222,"floralwhite":0xfffaf0,"forestgreen":0x228b22,"fuchsia":0xff00ff,"gainsboro":0xdcdcdc,"ghostwhite":0xf8f8ff,"gold":0xffd700,"goldenrod":0xdaa520,"gray":0x808080,"green":0x008000,"greenyellow":0xadff2f,"honeydew":0xf0fff0,"hotpink":0xff69b4,"indianred ":0xcd5c5c,"indigo":0x4b0082,"ivory":0xfffff0,"khaki":0xf0e68c,"lavender":0xe6e6fa,"lavenderblush":0xfff0f5,"lawngreen":0x7cfc00,"lemonchiffon":0xfffacd,"lightblue":0xadd8e6,"lightcoral":0xf08080,"lightcyan":0xe0ffff,"lightgoldenrodyellow":0xfafad2,"lightgrey":0xd3d3d3,"lightgreen":0x90ee90,"lightpink":0xffb6c1,"lightsalmon":0xffa07a,"lightseagreen":0x20b2aa,"lightskyblue":0x87cefa,"lightslategray":0x778899,"lightsteelblue":0xb0c4de,"lightyellow":0xffffe0,"lime":0x00ff00,"limegreen":0x32cd32,"linen":0xfaf0e6,"magenta":0xff00ff,"maroon":0x800000,"mediumaquamarine":0x66cdaa,"mediumblue":0x0000cd,"mediumorchid":0xba55d3,"mediumpurple":0x9370d8,"mediumseagreen":0x3cb371,"mediumslateblue":0x7b68ee,"mediumspringgreen":0x00fa9a,"mediumturquoise":0x48d1cc,"mediumvioletred":0xc71585,"midnightblue":0x191970,"mintcream":0xf5fffa,"mistyrose":0xffe4e1,"moccasin":0xffe4b5,"navajowhite":0xffdead,"navy":0x000080,"oldlace":0xfdf5e6,"olive":0x808000,"olivedrab":0x6b8e23,"orange":0xffa500,"orangered":0xff4500,"orchid":0xda70d6,"palegoldenrod":0xeee8aa,"palegreen":0x98fb98,"paleturquoise":0xafeeee,"palevioletred":0xd87093,"papayawhip":0xffefd5,"peachpuff":0xffdab9,"peru":0xcd853f,"pink":0xffc0cb,"plum":0xdda0dd,"powderblue":0xb0e0e6,"purple":0x800080,"rebeccapurple":0x663399,"red":0xff0000,"rosybrown":0xbc8f8f,"royalblue":0x4169e1,"saddlebrown":0x8b4513,"salmon":0xfa8072,"sandybrown":0xf4a460,"seagreen":0x2e8b57,"seashell":0xfff5ee,"sienna":0xa0522d,"silver":0xc0c0c0,"skyblue":0x87ceeb,"slateblue":0x6a5acd,"slategray":0x708090,"snow":0xfffafa,"springgreen":0x00ff7f,"steelblue":0x4682b4,"tan":0xd2b48c,"teal":0x008080,"thistle":0xd8bfd8,"tomato":0xff6347,"turquoise":0x40e0d0,"violet":0xee82ee,"wheat":0xf5deb3,"white":0xffffff,"whitesmoke":0xf5f5f5,"yellow":0xffff00,"yellowgreen":0x9acd32};

		if (typeof colors[color.toLowerCase()] != 'undefined')
			return colors[color.toLowerCase()];

		return false;
	}

	static getMarginFrame(pixels,width,height) {
		let frame = { x:0, y:0, width:width, height:height };

		if (pixels.length < 4*width*height) {
			console.log("Pixel data is too short. " + pixels.length + " != 4x" + width + "x" + height);
		}

		for (let i = 0; i < height; ++i) {
			let row_total = 0;
			for (let j = 0; j < width; j++) {
				let index = 4*i*width+j;
				row_total += pixels[index+3];
			}
			if (row_total == 0) 
				frame.x = i;
			else
				break;
		}

		for (let i = height-1; i >= 0; --i) {
			let row_total = 0;
			for (let j = 0; j < width; j++) {
				let index = 4*i*width+j;
				row_total += pixels[index+3];
			}
			if (row_total == 0) 
				frame.height = i;
			else
				break;
		}

		for (let j = 0; j < width; ++j) {
			let col_total = 0;
			for (let i = 0; i < height; i++) {
				let index = 4*i*width+j;
				col_total += pixels[index+3];
			}
			if (col_total == 0) 
				frame.y = j;
			else
				break;
		}

		for (let j = width-1; j >= 0; --j) {
			let col_total = 0;
			for (let i = 0; i < height; i++) {
				let index = 4*i*width+j;
				col_total += pixels[index+3];
			}
			if (col_total == 0) 
				frame.height = j;
			else
				break;
		}

		return frame;
	}

	static getSymbolFillRatio() {
		let fontStyle = new PIXI.TextStyle({ fontFamily:'Helvetica',fontSize:100,fill:'black' });
		let symbol = new PIXI.Text(SuitSymbol.Heart,fontStyle);
		let pixels = app.renderer.plugins.extract.pixels(symbol);
		let frame = Utilities.getMarginFrame(pixels,symbol.width,symbol.height);
		return (frame.height-frame.y+1)/100;
	}

	static CGRelPointMake(x,y) {
	}

	static CGRelRectMake(x,y,w,h) {
	}

	static CGRelRectMakeAspectFit(x,y,w,h) {
	}

	static CGOffsetRect(rect,offset) {
	}

	static CGRectMakeAspectFit(outer,inner) {
	}

	static CGRectMakeAspectFill(outer,inner) {
	}

	static getRGBA(color,r,g,b,a) {
	}

	static isVersion5orUp() {
	}

	static isValidHand(hand) {
	}

	static iAdSupported() {
	}

	static uintArrayToString(uintArray,count) {
	}

	static ucharToBinary(c) {
	}

	static colorToHex(color) {
	}

	static hexToColor(color) {
	}

	static randomColor() {
	}

	static deviceMacAddr(format) {
	}

	static sundayOfThisWeek() {
	}

	static oneMonthAgo() {
	}

	static getRowFromCardIndex(cardIndex) {
	}

	static getColFromCardIndex(cardIndex) {
	}

	static getSlotFromRowCol(row,col) {
	}

	static getPointFromAnchor(anchor,radius,angle) {
	}

	static getAngleFromRowCol(row,col,unitAngle) {
	}

	static downloadFacebookPhoto(facebookID) {
	}

	static getUniquePlayerId() {
	}

	static getUniquePlayerName() {
	}

	static getCurrentPlayerId() {
	}

	static setCurrentPlayerId(playerId) {
	}

	static timeElapsedString(refDate) {
	}

	static versionInfo() {
	}
}
