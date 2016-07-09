var charDown;
var popper;
var lastKey = null;

function mainKeyEvents() {
  document.onkeydown = function(e){
    if(charDown && lastKey === e.keyCode) {
     event.preventDefault();
     return;
    }
    find(e);
  };
  document.onkeyup = function(e) {
    //todo cancel the specific keydown instead of all of them
    window.clearTimeout(popper);
    window.clearTimeout(charDown);
    if(lastKey === e.keyCode) {
    lastKey = null;
    charDown = null;
    popper = null;
    }
  };
}

mainKeyEvents();

function eventGo(e, message, callback) {
  popper = window.setTimeout(function() {
    console.log(e);
  	callback(e);
    console.log('DOING SOMETHING with: ', message);
    lastKey = null;
    charDown = null;
  }, 2500);
  charDown = window.setTimeout(function() {
    console.log('DOING SOMETHING with: ', message);
    lastKey = null;
    charDown = null;
  }, 2500);
}

var codeMap = {
	79: _o,
  69: _e,
  85: _u,
  65: _a,
  73: _i,
  83: _s,
  78: _n,
  67: _c,
  s79: _O,
  s69: _E,
  s85: _U,
  s65: _A,
  s73: _I,
  s83: _S,
  s78: _N,
  s67: _C
 };

var superKeys = {
  find: find,
  codeMap: codeMap
};

function find(e) {
  if(codeMap[e.keyCode] && !e.shiftKey) {
    codeMap[e.keyCode](e);
  }
  else if(codeMap['s' + e.keyCode] && e.shiftKey) {
  	codeMap['s' + e.keyCode](e);
  }
  else {
    return;
  }
}

function pop(e) {
  var coord = getCaretCoordinates(e.srcElement, e.srcElement.selectionEnd);
  console.log('gofoit', coord);
  model.inputEl = e.srcElement;
  var wrapperDiv = document.createElement('div');
  wrapperDiv.setAttribute('id', 'char-outer');
  wrapperDiv.style.position = 'relative';
  wrap(e.srcElement, wrapperDiv, function() {
    build(e.srcElement, model, coord);
  });
}

function _o(e) {
  model.chars = ['ò', 'ó',	'ô',	'õ', 'ö', 'ø'];
  lastKey = e.keyCode;
  eventGo(e, 'o!', pop);
}
function _e(e) {
  model.chars = ['è', 'é', 'ê', 'ë'];
  lastKey = e.keyCode;
	eventGo(e, 'o!', pop);
}
function _a(e) {
  model.chars = ['à',	'á',	'â',	'ã',	'ä',	'å',	'æ'];
  lastKey = e.keyCode;
	eventGo(e, 'o!', pop);
}
function _i(e) {
  model.chars = ['ì',	'í',	'î',	'ï'];
  lastKey = e.keyCode;
	eventGo(e, 'o!', pop);
}
function _u(e) {
  model.chars = ['ù',	'ú',	'û',	'ü'];
  lastKey = e.keyCode;
	eventGo(e, 'o!', pop);
}
function _s(e) {
  model.chars = ['ß'];
  lastKey = e.keyCode;
	eventGo(e, 'o!', pop);
}
function _n(e) {
  model.chars = ['ñ'];
  lastKey = e.keyCode;
	eventGo(e, 'o!', pop);
}
function _c(e) {
  model.chars = ['ç'];
  lastKey = e.keyCode;
	eventGo(e, 'o!', pop);
}
function _O(e) {
	model.chars = ['Ò' ,'Ó' ,'	Ô' ,'Ö' ,'Ö' , 'Ø'];
  lastKey = e.keyCode;
	eventGo(e, 'o!', pop);
}
function _E(e) {
	model.chars = ['È',	'É',	'Ê',	'Ë'];
  lastKey = e.keyCode;
	eventGo(e, 'o!', pop);
}
function _A(e) {
  model.chars = ['À',	'Á',	'Â',	'Ã',	'Ä',	'Å',	'Æ'];
  lastKey = e.keyCode;
	eventGo(e, 'o!', pop);
}
function _I(e) {
  model.chars = ['Ì',	'Í',	'Î',	'Ï'];
  lastKey = e.keyCode;
	eventGo(e, 'o!', pop);
}
function _U(e) {
  model.chars = ['Ù',	'Ú',	'Û',	'Ü'];
  lastKey = e.keyCode;
	eventGo(e, 'o!', pop);
}
function _S(e) {
  model.chars = ['ß'];
  lastKey = e.keyCode;
	eventGo(e, 'o!', pop);
}
function _N(e) {
  model.chars = ['Ñ'];
  lastKey = e.keyCode;
	eventGo(e, 'o!', pop);
}
function _C(e) {
  model.chars = ['Ç'];
  lastKey = e.keyCode;
	eventGo(e, 'o!', pop);
}


///////////////////////////////////////////////////////////////////////////////////////////
//  Utils
///////////////////////////////////////////////////////////////////////////////////////////

function wrap(target, wrapper, callback) {
	var parent = target.parentElement;
	parent.replaceChild(wrapper, target);
	wrapper.appendChild(target);
	if(callback) {
	  callback();
	}
}

// NOTE this will delete siblings only for single element
// This isn't an issue here but might become one.
function unwrap(target, wrapper, callback) {
  var parent = wrapper.parentElement;
  parent.replaceChild(target, wrapper);
  if(callback) {
    callback();
  }
}

/*
Future to add...
¿

*/

