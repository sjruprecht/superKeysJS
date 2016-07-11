//model
var model = {
	chars: [],
  selected: -1,
  inputEl: null
};

function build(el, chars, coord) {
  var $charContainer = document.createElement('div');
  $charContainer.setAttribute('id', 'char-container');
  //$charContainer.style.visibility = 'hidden';

  model.chars.forEach(function(char) {
  	var $charBlock = document.createElement('div');
    addClass($charBlock, 'char-blocks');
    $charBlock.innerText = char;

    $charContainer.appendChild($charBlock);
  });
  $charContainer.style.position = 'absolute';
  $charContainer.style.display = 'inline';
  $charContainer.style.left = coord.left;
  $charContainer.style.top = coord.top;

  var outerDiv = document.getElementById('char-outer');
  outerDiv.style.display = 'inline';
  outerDiv.appendChild($charContainer);
  boxKeyEvents();

}

function boxKeyEvents() {


  document.onkeydown = function(e) {
    var $charContainer = document.getElementById('char-container');
    var $charOuter = $charContainer.parentElement;
    event.preventDefault();
    if(e.keyCode === 37 && model.selected > 0) {
    model.selected--;
      highlightChar('left');
    }
    else if(e.keyCode === 39 && model.selected < model.chars.length - 1) {
      model.selected++;
      highlightChar('right');
    }
    else if(e.keyCode >= 49 && e.keyCode <= 54) {
      getNumber(e);
    }
    else if(e.keyCode === 27) {
      //esc
      unwrap(model.inputEl, $charOuter);
      model.inputEl.focus();
      model.selected = 0;
      $charContainer.remove();
      mainKeyEvents();
    }
    else if(e.keyCode === 13) {
      //enter
      var inputVal = model.inputEl.value;
      model.inputEl.value.slice(0, -1);
      model.inputEl.value += model.chars[model.selected];
      unwrap(model.inputEl, $charOuter);
      model.inputEl.focus();
      $charContainer.remove();
      model.selected = 0;
      mainKeyEvents();
    }
    else {
      return;
    }
  };
}


//todo listen for a number corresponding with the letter.
function getNumber(e) {
	var $charContainer = document.getElementById('char-container');
	var $charOuter = $charContainer.parentElement;
	event.preventDefault();
  var numberMap = { 49: 0, 50: 1, 51: 2, 53: 3, 54: 4, 55: 5, 56: 6 };
  if(numberMap[e.keyCode] < model.chars.length - 1) {
		var inputVal = model.inputEl.value;
		model.inputEl.value.slice(0, -1);
		model.inputEl.value += model.chars[numberMap[e.keyCode]];
		unwrap(model.inputEl, $charOuter);
		model.inputEl.focus();
		$charContainer.remove();
		model.selected = 0;
		mainKeyEvents();
  }
	else {
		return;
	}
}

function highlightChar(dir) {
    console.log(model.selected);
    var $charContainer = document.getElementById('char-container');
    var $charBlocks = $charContainer.children;
    //remove highlight style from previously selected block
    for (var i in $charBlocks) {
        if(hasClass($charBlocks[i], 'char-highlight')) {
    	    removeClass($charBlocks[i], 'char-highlight');
        }
    }
    addClass($charBlocks[model.selected], 'char-highlight');
    //$charBlocks[model.selected].style.color = 'red';

}

//////
//utils
/////
function hasClass(el, className) {
  if(typeof el != 'object') return;
  if (el.classList)
    return el.classList.contains(className);
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}

function addClass(el, className) {
  if(typeof el != 'object') return;
  if (el.classList)
    el.classList.add(className);
  else if (!hasClass(el, className)) el.className += " " + className;
}

function removeClass(el, className) {
  if(typeof el != 'object') return;
  if (el.classList)
    el.classList.remove(className);
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    el.className=el.className.replace(reg, ' ');
  }
}

// This is how to split the string and append a char. Good Luck
// Make a func, reuse.
var str = 'I am the walrus.';
left = str.slice(0, -4);
// elStrngPos - string.length - 1 = -4
// 'I am the wal'
right = str.slice(-3);
// 'us.'
// elStringPos - string.length = -3
var done = left + 'R' + right;
