'use strict';

// probabilities of 1/16, 5/16, 7/16, and 3/16
var arr = [6, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9];
var line = 0;
var lines = [];
var numlines = 0;
var hexagram = 0;
var hexagram2 = 0;
var dekornURL = '';
var dekornURL2 = '';

$(function () {
	$('#help').on('click', function () {
		if ($('#instructions').css('display') == 'none') {
			$('#instructions').css('display', 'inline-block');
		} else {
			$('#instructions').css('display', 'none');
		}
	});
});

// Maps hexagram to James Dekorne's I Ching Pagee
function setURL() {
	var prefixUrl = "http://www.jamesdekorne.com/GBCh/hex";
	var postUrl = ".htm";
	var hexstr = hexagram.toString();
	dekornURL = prefixUrl + hexstr + postUrl;
	if (parseInt(hexagram2) > 0) {
		dekornURL2 = prefixUrl + hexagram2 + postUrl;
	}
}

// Returns integer corresponding to a hexagram line
function getLine() {
	shuffle(arr);
	line = arr[0];
	lines.push(line);
	numlines++;
	return line;
}

function eraseHexagram() {
	line = 0;
	numlines = 0;
	hexagram = 0;
	hexagram2 = 0;
	lines = [];
}

// Takes an array of line nums and gives resulting hexagram
// If there are changing lines, returns changes separated by .
// ie 54.3.6 -> 
function linesToHexagram(arr) {
	var primary = getPrimary(arr);
	// if the arrays are equal then no changing lines and return hexagram no.
	// uses arrow functions because comparing arrays in javascript
	var p = hexagramLookup(primary);
	hexagram = p;
	if (arr.length == primary.length && arr.every(function (v, i) {
		return v === primary[i];
	})) {
		return p;
	} else {
		var secondary = getSecondary(arr);
		var s = hexagramLookup(secondary);
		var c = changingLines(arr);
		hexagram2 = s;
		return p + c + ' --> ' + s;
	}
}

function changingLines(arr) {
	var changing = '';
	changing += arr.map(function (x, i) {
		if (x == 6 || x == 9) return (i + 1).toString();
	});
	//map seems to add commas for each iteration somehow
	changing = '.' + changing.replace(/,/g, '').split('').join('.');
	return changing;
}

//returns hexagram number from list of hexagrams
function hexagramLookup(arr) {
	var hexstr = arrayToString(arr);
	for (var i in Hexagrams) {
		if (Hexagrams[i] == hexstr) {
			return i;
		}
	}
}

// TODO -- create one function that returns both primary and secondary
// HINT -- reverses the added/sub values
// Takes a hexagram as an int array and returns primary hexagram
function getPrimary(arr) {
	return arr.map(function (x) {
		if (x == 6) return x += 2;
		if (x == 9) return x -= 2;
		return x;
	});
}

// Takes a hexagram as an int array and returns secondary hexagram
function getSecondary(arr) {
	return arr.map(function (x) {
		if (x == 6) return x += 1;
		if (x == 9) return x -= 1;
		return x;
	});
}

// Takes an integer between 6-9 and returns ascii i ching line
function lineToAscii(line) {
	switch (line) {
		case 8:
			return '=== ===';
		case 7:
			return '=======';
		case 9:
			return '===&theta;===';
		case 6:
			return '===x===';
	}
}

//convert array to string and remove commas
function arrayToString(arr) {
	return arr.toString().replace(/,/g, '');
}

function shuffle(arr) {
	var count = arr.length;
	while (count > 0) {
		var i = Math.floor(Math.random() * count);
		count--;
		var tmp = arr[count];
		arr[count] = arr[i];
		arr[i] = tmp;
	}
}

var Hexagrams = {
	1: '777777',
	2: '888888',
	3: '788878',
	4: '878887',
	5: '777878',
	6: '878777',
	7: '878888',
	8: '888878',
	9: '777877',
	10: '778777',
	11: '777888',
	12: '888777',
	13: '787777',
	14: '777787',
	15: '887888',
	16: '888788',
	17: '788778',
	18: '877887',
	19: '778888',
	20: '888877',
	21: '788787',
	22: '787887',
	23: '888887',
	24: '788888',
	25: '788777',
	26: '777887',
	27: '788887',
	28: '877778',
	29: '878878',
	30: '787787',
	31: '887778',
	32: '877788',
	33: '887777',
	34: '777788',
	35: '888787',
	36: '787888',
	37: '787877',
	38: '778787',
	39: '887878',
	40: '878788',
	41: '778887',
	42: '788877',
	43: '777778',
	44: '877777',
	45: '888778',
	46: '877888',
	47: '878778',
	48: '877878',
	49: '787778',
	50: '877787',
	51: '788788',
	52: '887887',
	53: '887877',
	54: '778788',
	55: '787788',
	56: '887787',
	57: '877877',
	58: '778778',
	59: '878877',
	60: '778878',
	61: '778877',
	62: '887788',
	63: '787878',
	64: '878787'
};