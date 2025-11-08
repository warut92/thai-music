'use strict';

/**
 * RTTTL Parser + Player
 * รวมทั้ง parse และ play/stop เข้าไฟล์เดียว
 */

var rtttlPlay = (function () {
  // =========================
  //  RTTTL PARSER
  // =========================
  function parse(rtttl) {
    console.log(rtttl);
    document.getElementById('status').innerHTML = ": กำลังเล่น"
    var REQUIRED_SECTIONS_NUM = 3;
    var SECTIONS = rtttl.split(':');

    if (SECTIONS.length !== REQUIRED_SECTIONS_NUM) {
      throw new Error('Invalid RTTTL file.');
    }

    var NAME = getName(SECTIONS[0]);
    var DEFAULTS = getDefaults(SECTIONS[1]);
    var MELODY = getData(SECTIONS[2], DEFAULTS);

    return {
      name: NAME,
      defaults: DEFAULTS,
      melody: MELODY
    };
  }

  function getName(name) {
    var MAX_LENGTH = 10;
    if (name.length > MAX_LENGTH) {
      console.warn('Tune name should not exceed 10 characters.');
    }
    return name || 'Unknown';
  }

  function getDefaults(defaults) {
    var VALUES = defaults.split(',');
    var VALUES_ARR = VALUES.map(function (value) {
      if (value === '') return {};

      var KEY_VAL = value.split('=');
      if (KEY_VAL.length !== 2) {
        throw new Error('Invalid setting ' + value);
      }

      var KEY = KEY_VAL[0];
      var VAL = KEY_VAL[1];

      var ALLOWED_DURATION = ['1', '2', '4', '8', '16', '32'];
      var ALLOWED_OCTAVE = ['4', '5', '6', '7'];
      var ALLOWED_BPM = [
        '25', '28', '31', '35', '40', '45', '50', '56',
        '63', '70', '80', '90', '100', '112', '125', '140',
        '160', '180', '200', '225', '250', '285', '320',
        '355', '400', '450', '500', '565', '635', '715',
        '800', '900'
      ];

      switch (KEY) {
        case 'd':
          if (ALLOWED_DURATION.indexOf(VAL) !== -1) return {
            duration: VAL
          };
          throw new Error('Invalid duration ' + VAL);
        case 'o':
          if (ALLOWED_OCTAVE.indexOf(VAL) === -1) {
            console.warn('Invalid octave ' + VAL);
          }
          return {
            octave: VAL
          };
        case 'b':
          if (ALLOWED_BPM.indexOf(VAL) === -1) {
            console.warn('Invalid BPM ' + VAL);
          }
          return {
            bpm: VAL
          };
      }
    });

    var VALUES_OBJ = _toObject({}, VALUES_ARR);
    var DEFAULT_VALUES = {
      duration: '4',
      octave: '6',
      bpm: '63'
    };

    return Object.assign(DEFAULT_VALUES, VALUES_OBJ);
  }

  function _toObject(obj, arr) {
    if (arr.length === 0) return obj;
    var newObj = Object.assign(obj, arr[0]);
    return _toObject(newObj, arr.slice(1));
  }

  function getData(melody, defaults) {
    var NOTES = melody.split(',');
    var BEAT_EVERY = 60000 / parseInt(defaults.bpm);

    return NOTES.map(function (note) {
      var NOTE_REGEX = /(1|2|4|8|16|32|64)?((?:[a-g]|h|p)#?){1}(\.?)(4|5|6|7)?/;
      var NOTE_PARTS = note.match(NOTE_REGEX);

      var NOTE_DURATION = NOTE_PARTS[1] || parseInt(defaults.duration);
      var NOTE = NOTE_PARTS[2] === 'h' ? 'b' : NOTE_PARTS[2];
      var NOTE_DOTTED = NOTE_PARTS[3] === '.';
      var NOTE_OCTAVE = NOTE_PARTS[4] || parseInt(defaults.octave);

      return {
        note: NOTE,
        duration: _calculateDuration(BEAT_EVERY, parseFloat(NOTE_DURATION), NOTE_DOTTED),
        frequency: _calculateFrequency(NOTE, NOTE_OCTAVE)
      };
    });
  }

  function _calculateFrequency(note, octave) {
    if (note === 'p') return 0;

    //รับค่าในการเปลี่ยนคีย์และช่วงทบเสียง
    let k = Number(document.getElementById('key').value);
    var o = Number(document.getElementById('octave').value);
    // ====== เสียงในดนตรีไทย ======
    if (k > 10) {
      if (k === 11) {
        var thaiBase = {
          'c': 230.3,
          'd': 254.2,
          'e': 280.7,
          'f': 309.9,
          'g': 342.2,
          'a': 377.8,
          'b': 417.2
        };
      } else {
        var thaiBase = {
          'c': 254.2,
          'd': 280.7,
          'e': 309.9,
          'f': 342.2,
          'g': 377.8,
          'a': 417.2,
          'b': 460.6
        };
      }

      var noteOrder = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];
      var baseNote = note.replace('#', '');
      var baseFreq = thaiBase[baseNote];

      if (!baseFreq || !isFinite(baseFreq)) baseFreq = 230.3;

      var semitoneShift = noteOrder.indexOf(note) - noteOrder.indexOf(baseNote);
      if (!isFinite(semitoneShift)) semitoneShift = 0;

      var freq = baseFreq * Math.pow(2, semitoneShift / 12) * o;
      var freqAdjusted = freq * Math.pow(2, octave - 4) * (1 + 0 * 0.02);

      return Math.round(freqAdjusted * 10) / 10;
    }


    // ====== เสียงดนตรีตะวันตก ======
    var DO4;
    if (o >= 1) {
      DO4 = (233.082 + (28.544 * k)) * o;
    } else {
      DO4 = (233.082 + (28.544 * k)) / (o * -1);
    }

    var TWELFTH_ROOT = Math.pow(2, 1 / 12);
    var N = _calculateSemitonesFromC4(note, octave);
    var FREQUENCY = DO4 * Math.pow(TWELFTH_ROOT, N);

    if (!isFinite(FREQUENCY)) FREQUENCY = 0; // Safety fallback

    return Math.round(FREQUENCY * 10) / 10;
  }

  function _calculateSemitonesFromC4(note, octave) {
    var NOTE_ORDER = ['c', 'c#', 'd', 'd#', 'e', 'f',
      'f#', 'g', 'g#', 'a', 'a#', 'b'
    ];
    var MIDDLE_OCTAVE = 4;
    var SEMITONES_IN_OCTAVE = 12;
    var OCTAVE_JUMP = (octave - MIDDLE_OCTAVE) * SEMITONES_IN_OCTAVE;
    return NOTE_ORDER.indexOf(note) + OCTAVE_JUMP;
  }

  function _calculateDuration(beatEvery, noteDuration, isDotted) {
    var DURATION = beatEvery * 4 / noteDuration;
    var PROLONGED = isDotted ? DURATION / 2 : 0;
    return DURATION + PROLONGED;
  }

  // =========================
  //  PLAYER
  // =========================
  var shouldStop = false;

  function play(rtttl) {
    try {
      var parsedRtttl = parse(rtttl);
      var audioCtx = new(AudioContext || webkitAudioContext)();
      _playMelody(parsedRtttl.melody, audioCtx);
    } catch (err) {
      alert(err);
    }
  }

  function stop() {
    shouldStop = true;
    document.getElementById('status').innerHTML = ": สั่งหยุด"
  }

  function _playMelody(melody, audioCtx) {
    if (shouldStop) {
      shouldStop = false;
      return;
    }
    console.log(melody.length);
    if (melody.length === 0) {
      document.getElementById('status').innerHTML = ": จบเพลง"
    }
    if (melody.length === 0) return;


    var osc = audioCtx.createOscillator();
    //รับค่าชนิดของคลื่นเสียง
    var t = document.getElementById('type').value;
    osc.type = t;
    osc.start(0);

    var note = melody[0];
    osc.frequency.value = note.frequency;
    osc.connect(audioCtx.destination);

    setTimeout(function () {
      osc.disconnect(audioCtx.destination);
      _playMelody(melody.slice(1), audioCtx);
    }, note.duration);
  }

  // public API
  return {
    parse: parse,
    play: play,
    stop: stop
  };
})();

// ใช้ได้ทั้ง Node และ Browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = rtttlPlay;
} else {
  window.rtttlPlay = rtttlPlay;
}