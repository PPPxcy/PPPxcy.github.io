let Count = 0;
 
function htmlEscape(text) {
	return text.replace(/[<>"&]/g, function(match, pos, originalText) {
		switch(match){
			case "<":
				return "&lt;"; 
			case ">":
				return "&gt;";
			case "&":
				return "&amp;"; 
			case "\"":
				return "&quot;"; 
		} 
	}); 
}

function copierCopy(Copier, Counter) {
	let copyData = `${document.getElementsByClassName(`PPP-code-id${Counter}`)[0].getAttribute("PPP-text-info")}`;
	let textArea = document.createElement("textarea");
	textArea.value = copyData;
	textArea.style.position = "absolute";
	textArea.style.left = "-100000000vw";
	textArea.style.top = "-100000000vh";
	textArea.style.opacity = "0";
	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();
	document.execCommand("copy");
	textArea.remove();
	Copier.value = "Copied successful";
	Copier.style.color = "#FFF";
	let colors = [
		"#08D",
		"#18D",
		"#29D",
		"#39D",
		"#4AD",
		"#5AD",
		"#6BE",
		"#7BE",
		"#8CE",
		"#9CE",
		"#ADE",
		"#BDF",
		"#CEF",
		"#DEF",
		"#EFF",
		"#FFF",
	];
	for(let i = 0; i < 16; i++) {
		setTimeout(function() {
			Copier.style.backgroundColor = colors[i];
		}, 15.625 * i);
	}
	setTimeout(
		function() {
			Copier.style.color = "#08D";
			Copier.style.backgroundColor = "#FFF";
			Copier.value = "Copy";
		}, 250
	);
}

while(document.querySelector("code[PPP-not-highlighted]") != null) {
	let innertext = "\n" + document.querySelector("code[PPP-not-highlighted]").innerText + "\n";
	let innerhtml = "";
	let type = document.querySelector("code[PPP-not-highlighted]").getAttribute("code-language");

	function beDigit(chr) {
		return 48 <= chr && chr < 58;
	}
	function be_alpha(chr) {
		return 96 < chr && chr <= 122;
	}
	function be_Alpha(chr) {
		return 64 < chr && chr <= 90;
	}
	function beAlpha(chr) {
		return be_alpha(chr) || be_Alpha(chr);
	}
	function beAlpha_(chr) {
		return beAlpha(chr) || chr == "_".charCodeAt(0);
	}

	if(type == "Cpp") {
	//	Cpp14 most
		let keywords = [
			"do", "if", "asm", "for", "int", "new",
			"try", "auto", "bool", "case", "char",
			"else", "enum", "goto", "long", "this",
			"true", "void", "break", "catch", 
			"class", "const", "false", "float", 
			"short", "throw", "using", "union", 
			"while", "delete", "double", "export", 
			"extern", "friend", "public", "inline", 
			"return", "signed", "sizeof", "static", 
			"struct", "switch", "typeid", "alignas", 
			"alignof", "default", "mutable", 
			"nullptr", "private", "typedef", 
			"virtual", "wchar_t", "char16_t", 
			"char32_t", "continue", "decltype", 
			"explicit", "noexcept", "operator", 
			"register", "template", "typename", 
			"unsigned", "volatile", "constexpr", 
			"namespace", "protected", "const_cast", 
			"static_cast",  "dynamic_cast", 
			"thread_local", "static_assert", 
			"reinterpret_cast"
		];
		let symbolwords = [
			"or", "and", "not", "xor", "bitor", "compl",
			"or_eq", "and_eq", "bitand", "not_eq", "xor_eq",
		];
		let symbols = [
			"!", "%", "&", "*", "+", ",", "-", ".", "/",
			":", ";", "<", "=", ">", "?", "^", "|", "~",
			"!=", "%=", "&&", "&=", "*=", "+=", "-=", "->",
			"/=", "::", "<=", "==", ">=", "^=", "|=", "||",
			"(", ")", "[", "]", "{", "}"
		];
		let nowword = "";
		let isNumber = false;
		let isOnlyNumber = false;
		let haveDot = false;
		let isFirstWordOfLine = true;
		let isLastCharAlpha_ = -1;
		for(let i = 0; i < innertext.length; i++) {
			if((beDigit(innertext.charCodeAt(i)) || beAlpha_(innertext.charCodeAt(i))) != isLastCharAlpha_ || innertext.charAt(i) == "\n" || innertext.charAt(i) == " " || innertext.charAt(i) == "\t" || innertext.charAt(i) == "'" || innertext.charAt(i) == '"') {
				isLastCharAlpha_ = (beDigit(innertext.charCodeAt(i)) || beAlpha_(innertext.charCodeAt(i)));
				if(innertext.charAt(i) == "'" || innertext.charAt(i) == '"')
					isLastCharAlpha_ = -1;
				if(isFirstWordOfLine == true && nowword == '#') {
					innerhtml += `<span class="PPP-Cpp-preprocessor">#`;
					for(let j = i; j < innertext.length; j++) {
						if(innertext.charAt(j) == "\n") {
							if(innertext.charAt(j - 1) == `\\`) {
								innerhtml += `</span><br><span class="PPP-Cpp-preprocessor">`;
							} else {
								i = j;
								innerhtml += `</span>`;
								break;
							}
						} else {
							innerhtml += htmlEscape(`${innertext.charAt(j)}`);
						}
					}
					isFirstWordOfLine = true;
					isNumber = beDigit(innertext.charCodeAt(i));
					isOnlyNumber = beDigit(innertext.charCodeAt(i));
					haveDot = false;
					nowword = "";
					innerhtml += `<br>`;
					continue;
				} else if(nowword == `"`) {
					innerhtml += `<span class="PPP-Cpp-string">"`;
					for(let j = i; j < innertext.length; j++) {
						if(innertext.charAt(j) == `"`) {
							innerhtml += `"`;
							if(innertext.charAt(j - 1) != `\\`) {
								i = j + 1;
								break;
							}
						} else if(innertext.charAt(j) == "\n") {
							if(innertext.charAt(j - 1) == `\\`) {
								innerhtml += `</span><br><span class="PPP-Cpp-string">`;
							} else {
								i = j;
								break;
							}
						} else {
							innerhtml += htmlEscape(`${innertext.charAt(j)}`);
						}
					}
					innerhtml += `</span>`;
				} else if(nowword == `'`) {
					innerhtml += `<span class="PPP-Cpp-charactor">'`;
					for(let j = i; j < innertext.length; j++) {
						if(innertext.charAt(j) == `'`) {
							innerhtml += `'`;
							if(innertext.charAt(j - 1) != `\\`) {
								i = j + 1;
								break;
							}
						} else if(innertext.charAt(j) == "\n") {
							i = j;
							break;
						} else {
							innerhtml += htmlEscape(`${innertext.charAt(j)}`);
						}
					}
					innerhtml += `</span>`;
				} else if(isNumber == true) {
					innerhtml += `<span class="PPP-Cpp-number">${nowword}</span>`;
				} else if(symbolwords.indexOf(nowword) != -1) {
					innerhtml += `<span class="PPP-Cpp-symbolword">${nowword}</span>`;
				} else if(keywords.indexOf(nowword) != -1) {
					innerhtml += `<span class="PPP-Cpp-keyword">${nowword}</span>`;
				} else if(nowword == '.' && beDigit(innertext.charCodeAt(i))) {
					if(beDigit(innertext.charCodeAt(i - 2))) {
						innerhtml = innerhtml.substring(0, innerhtml.length - 7) + `${nowword}</span>`;
					}
					innerhtml += `<span class="PPP-Cpp-number">${nowword}</span>`;
				} else if(beAlpha_(nowword.charCodeAt(0))) {
					innerhtml += `<span class="PPP-Cpp-identifier">${nowword}</span>`;					
				} else if(nowword.substr(0, 2) == "//") {
					innerhtml += `<span class="PPP-Cpp-comment">//`;
					for(let j = i - nowword.length + 2; j < innertext.length; j++) {
						if(innertext.charAt(j) == "\n") {
							if(innertext.charAt(j - 1) == `\\`) {
								innerhtml += `</span><br><span class="PPP-Cpp-comment">`;
							} else {
								i = j;
								break;
							}
						} else {
							innerhtml += htmlEscape(`${innertext.charAt(j)}`);
						}
					}
					innerhtml += `</span>`;
				} else if(nowword.substr(0, 2) == "/*") {
					innerhtml += `<span class="PPP-Cpp-comment">/*`;
					for(let j = i - nowword.length + 2; j < innertext.length; j++) {
						if(innertext.charAt(j) == "/" && j != i - nowword.length + 2) {
							innerhtml += "/";
							if(innertext.charAt(j - 1) == "*") {
								innerhtml += `</span>`;
								i = j + 1;
								break;
							}
						} else if(innertext.charAt(j) == "\n") {
							innerhtml += `</span><br><span class="PPP-Cpp-comment">`;
						} else {
							innerhtml += htmlEscape(`${innertext.charAt(j)}`);
						}
					}
					innerhtml += `</span>`;
				} else {
					if(symbols.indexOf(nowword.substr(0, 2)) != -1) {
						innerhtml += `<span class="PPP-Cpp-symbol">${nowword.substr(0, 2)}</span>`;
						nowword = nowword.substr(2);
					}
					for(let j = 0; j < nowword.length; j++) {
						innerhtml += `<span class="PPP-Cpp-symbol">${nowword.charAt(j)}</span>`;
					}
				}
				isFirstWordOfLine = false;
				isNumber = beDigit(innertext.charCodeAt(i));
				isOnlyNumber = beDigit(innertext.charCodeAt(i));
				haveDot = false;
				nowword = "";
			}
			if(innertext.charAt(i) == "\n") {
				innerhtml += `<br>`;
				isFirstWordOfLine = true;
				continue;
			}
			if(innertext.charAt(i) == " " || innertext.charAt(i) == "\t") {
				innerhtml += `${innertext.charAt(i)}`;
				continue;
			}
			if(!beDigit(innertext.charCodeAt(i))) {
				isOnlyNumber = false;
			}
			if(!(beDigit(innertext.charCodeAt(i)) || beAlpha_(innertext.charCodeAt(i)))) {
				isNumber = false;
			}
			nowword += innertext.charAt(i);
		}
		innerhtml = `<input class="PPP-copier" id="PPP-copier-id${Count}" type="submit" value="Copy" onclick="copierCopy(document.getElementById('PPP-copier-id${Count}'), ${Count})">` + innerhtml.substr(4);
	} else {
		console.log(`Invalid code language: \`${type}\``);
	}

	document.querySelector("code[PPP-not-highlighted]").innerHTML = innerhtml;
	document.querySelector("code[PPP-not-highlighted]").setAttribute("PPP-highlighted", "");
	document.querySelector("code[PPP-not-highlighted]").setAttribute("PPP-text-info", `${innertext.substring(1, innertext.length - 1)}`);
	document.querySelector("code[PPP-not-highlighted]").setAttribute("class", document.querySelector("code[PPP-not-highlighted]").getAttribute("class") + ` PPP-code-id${Count}`);
	document.querySelector("code[PPP-not-highlighted]").removeAttribute("PPP-not-highlighted");
	Count++;
}
