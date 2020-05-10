var char_to_morse_dict = {
  'a':  '.-',
  'b':  '-...',
  'c':  '-.-.',
  'd':  '-..',
  'e':  '.',
  'f':  '..-.',
  'g':  '--.',
  'h':  '....',
  'i':  '..',
  'j':  '.---',
  'k':  '-.-',
  'l':  '.-..',
  'm':  '--',
  'n':  '-.',
  'o':  '---',
  'p':  '.--.',
  'q':  '--.-',
  'r':  '.-.',
  's':  '...',
  't':  '-',
  'u':  '..-',
  'v':  '...-',
  'w':  '.--',
  'x':  '-..-',
  'y':  '-.--',
  'z':  '--..',
  'á':  '.--.-',
  'ä':  '.-.-',
  'é':  '..-..',
  'ñ':  '--.--',
  'ö':  '---.',
  'ü':  '..--',
  '1':  '.----',
  '2':  '..---',
  '3':  '...--',
  '4':  '....-',
  '5':  '.....',
  '6':  '-....',
  '7':  '--...',
  '8':  '---..',
  '9':  '----.',
  '0':  '-----',
  ',':  '--..--',
  '.':  '.-.-.-',
  '?':  '..--..',
  ';':  '-.-.-',
  ':':  '---...',
  '/':  '-..-.',
  '-':  '-....-',
  '\'': '.----.',
  '_':  '..--.-',
  '@':  '.--.-.',
  ' ':  '.......',
  '!':  '-.-.--',
  '(':  '-.--.',
  ')':  '-.--.-',
  '&':  '.-...',
  '=':  '-...-',
  '+':  '.-.-.',
  '"':  '.-..-.',
  '$':  '...-..-',
};

var morse_to_char_dict = {
  '.-':     'a',
  '-...':   'b',
  '-.-.':   'c',
  '-..':    'd',
  '.':      'e',
  '..-.':   'f',
  '--.':    'g',
  '....':   'h',
  '..':     'i',
  '.---':   'j',
  '-.-':    'k',
  '.-..':   'l',
  '--':     'm',
  '-.':     'n',
  '---':    'o',
  '.--.':   'p',
  '--.-':   'q',
  '.-.':    'r',
  '...':    's',
  '-':      't',
  '..-':    'u',
  '...-':   'v',
  '.--':    'w',
  '-..-':   'x',
  '-.--':   'y',
  '--..':   'z',
  '.--.-':  'á',
  '.-.-':   'ä',
  '..-..':  'é',
  '--.--':  'ñ',
  '---.':   'ö',
  '..--':   'ü',
  '.----':  '1',
  '..---':  '2',
  '...--':  '3',
  '....-':  '4',
  '.....':  '5',
  '-....':  '6',
  '--...':  '7',
  '---..':  '8',
  '----.':  '9',
  '-----':  '0',
  '--..--': ',',
  '.-.-.-': '.',
  '..--..': '?',
  '-.-.-':  ';',
  '---...': ':',
  '-..-.':  '/',
  '-....-': '-',
  '.----.': '\'',
  '-.--.-': '()',
  '..--.-': '_',
  '.--.-.': '@',
  '.......': ' ',
  '-.-.--':  '!',
  '-.--.':   '(',
  '-.--.-':  ')',
  '.-...':   '&',
  '-...-':   '=',
  '.-.-.':   '+',
  '.-..-.':  '"',
  '...-..-': '$'
}

function get_morse() {
  var text = document.getElementById('textbox').value;
  document.getElementById('morse').innerHTML = to_morse(text)
}

function get_text() {
  var morse = document.getElementById('morsebox').value;
  document.getElementById('text').innerHTML = to_text(morse)
}

function to_morse(text) {
    var chars = text.split('');
    var ret = '';
    for (var i = 0; i < chars.length; i++) {
        var char = chars[i].toLowerCase();
        if (char_to_morse_dict[char]) {
            ret += char_to_morse_dict[char] + ' ';
        }
    }
    return ret;
}

function to_text(morse) {
    var words = morse.split(/\s{3,}|\.{6,7}/);
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        word = word.replace(/^\s+/, '');
        word = word.replace(/\s+$/, '');
        word = word.replace(/\s+/, ' ');
        words[i] = word;
    }
    var ret = '';
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        var chars = word.split(' ');
        for (var j = 0; j < chars.length; j++) {
            var char = chars[j];
            if (morse_to_char_dict[char]) {
                var letter = morse_to_char_dict[char];
            }
            else {
                var letter = '?'
            }
            ret += letter;
        }
        ret += ' ';
    }
    return ret;

}
