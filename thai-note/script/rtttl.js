'use strict';

/**
 * RTTTL Parser + Player + Audio-Synced Highlighting System
 * (รองรับ Triplet Notes: 3, 6, 12, 24)
 */

var rtttlPlay = (function () {
  // =========================
  //  RTTTL PARSER
  // =========================
  function parse(rtttl) {
    console.log(rtttl);
    var statusElem = document.getElementById('status');
    if (statusElem) statusElem.innerHTML = ": กำลังเล่น";

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
    var MAX_LENGTH = 30; // ขยายความยาวชื่อเพลง
    if (name.length > MAX_LENGTH) {
      console.warn('Tune name exceeds 30 characters.');
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

      // เพิ่มความยาวโน้ต Triplet (3, 6, 12, 24)
      var ALLOWED_DURATION = ['1', '2', '3', '4', '6', '8', '12', '16', '24', '32', '64'];
      var ALLOWED_OCTAVE = ['1', '2', '3', '4', '5', '6', '7'];
      var ALLOWED_BPM = [
        '25', '28', '31', '35', '40', '45', '50', '56',
        '63', '70', '80', '90', '100', '112', '125', '140',
        '160', '180', '200', '225', '250', '285', '320',
        '355', '400', '450', '500', '565', '635', '715',
        '800', '900'
      ];

      switch (KEY) {
        case 'd':
          if (ALLOWED_DURATION.indexOf(VAL) !== -1) return { duration: VAL };
          throw new Error('Invalid duration ' + VAL);
        case 'o':
          if (ALLOWED_OCTAVE.indexOf(VAL) === -1) {
            console.warn('Invalid octave ' + VAL);
          }
          return { octave: VAL };
        case 'b':
          if (ALLOWED_BPM.indexOf(VAL) === -1) {
            console.warn('Invalid BPM ' + VAL);
          }
          return { bpm: VAL };
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
      // ปรับ Regex รองรับตัวเลขสัดส่วนโน้ตทุกรูปแบบ (\d+)
      var NOTE_REGEX = /(\d+)?((?:[a-g]|h|p)#?){1}(\.?)([1-7])?/;
      var NOTE_PARTS = note.match(NOTE_REGEX);

      if (!NOTE_PARTS) {
        throw new Error('Invalid note format: ' + note);
      }

      var NOTE_DURATION = NOTE_PARTS[1] || parseInt(defaults.duration);
      var NOTE = NOTE_PARTS[2] === 'h' ? 'b' : NOTE_PARTS[2];
      var NOTE_DOTTED = NOTE_PARTS[3] === '.';
      var NOTE_OCTAVE = NOTE_PARTS[4] || parseInt(defaults.octave);

      // ความยาวเวลาจริงของโน้ต (วินาที)
      var totalDurationSec = _calculateDuration(BEAT_EVERY, parseFloat(NOTE_DURATION), NOTE_DOTTED) / 1000;

      // คำนวณจำนวนตำแหน่ง Highlight (Sub-beats)
      var durVal = parseFloat(NOTE_DURATION);
      var subBeatCount = Math.round(8 / durVal);

      if (NOTE_DOTTED) {
        subBeatCount = Math.round(subBeatCount * 1.5);
      }
      if (subBeatCount < 1) subBeatCount = 1;

      return {
        note: NOTE,
        duration: totalDurationSec,
        frequency: _calculateFrequency(NOTE, NOTE_OCTAVE),
        subBeatCount: subBeatCount
      };
    });
  }

  function _calculateFrequency(note, octave) {
    if (note === 'p') return 0;

    let kElem = document.getElementById('key');
    let oElem = document.getElementById('octave');
    let k = kElem ? Number(kElem.value) : 0;
    let o = oElem ? Number(oElem.value) : 1;

    // ====== เสียงในดนตรีไทย ======
    if (k > 11) {
      let thaiBase;

      if (k === 12) {
        thaiBase = {
          'c': 230.3, 'd': 254.2, 'e': 280.7,
          'f': 309.9, 'g': 342.2, 'a': 377.8, 'b': 417.2
        };
        o = 1;
      } else if (k === 13) {
        thaiBase = {
          'c': 254.2, 'd': 280.7, 'e': 309.9,
          'f': 342.2, 'g': 377.8, 'a': 417.2, 'b': 460.6
        };
        o = 1;
      }

      var noteOrder = [
        'c', 'c#', 'd', 'd#', 'e', 'f',
        'f#', 'g', 'g#', 'a', 'a#', 'b'
      ];

      var baseNote = note.replace('#', '');
      var baseFreq = thaiBase ? thaiBase[baseNote] : 230.3;

      if (!baseFreq || !isFinite(baseFreq)) {
        baseFreq = 230.3;
      }

      var semitoneShift = noteOrder.indexOf(note) - noteOrder.indexOf(baseNote);
      if (!isFinite(semitoneShift)) {
        semitoneShift = 0;
      }

      var octaveMultiplier = Math.pow(2, o - 1);
      var freq = baseFreq * Math.pow(2, semitoneShift / 12) * octaveMultiplier;
      var freqAdjusted = freq * Math.pow(2, octave - 4);

      return Math.round(freqAdjusted * 10) / 10;
    }

    // ====== เสียงดนตรีตะวันตก ======
    var DO4 = 466.164 * Math.pow(2, k / 12);
    var octaveMultiplier = Math.pow(2, o - 1);
    DO4 *= octaveMultiplier;

    var N = _calculateSemitonesFromC4(note, octave);
    var FREQUENCY = DO4 * Math.pow(2, N / 12);

    if (!isFinite(FREQUENCY)) {
      FREQUENCY = 0;
    }

    return Math.round(FREQUENCY * 10) / 10;
  }

  function _calculateSemitonesFromC4(note, octave) {
    var NOTE_ORDER = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];
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
  //  PLAYER + HIGHLIGHT SYSTEM
  // =========================
  var shouldStop = false;
  var currentActiveNote = null;
  var animFrameId = null;
  var audioCtx = null;
  var schedTimer = null;

  // ===== ปรับความเร็วขณะเล่น (realtime tempo) =====
  // ความยาวโน้ตจาก parse() คิดตาม BPM ในหัวเพลง (baseBpm)
  // เวลาเล่นจริง = ความยาวเดิม × tempoScale โดย tempoScale = baseBpm / BPM ปัจจุบัน
  // โน้ตถูกจัดคิวล่วงหน้าเพียงช่วงสั้น ๆ (LOOKAHEAD) จึงเปลี่ยนความเร็วได้ตั้งแต่โน้ตถัดไป
  var LOOKAHEAD = 0.2;        // วินาทีที่จัดคิวเสียงล่วงหน้า
  var SCHED_INTERVAL = 25;    // ms ระหว่างรอบจัดคิว
  var baseBpm = 0;
  var tempoScale = 1;
  var player = null;          // สถานะการเล่นของเพลงปัจจุบัน

  function setTempo(bpm) {
    bpm = parseFloat(bpm);
    if (!(bpm > 0) || !(baseBpm > 0)) return;
    tempoScale = baseBpm / bpm;
  }

  function play(rtttl) {
    try {
      stop();
      shouldStop = false;

      var parsedRtttl = parse(rtttl);
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();

      baseBpm = parseInt(parsedRtttl.defaults.bpm, 10) || 0;
      tempoScale = 1;   // เริ่มที่ BPM ตามหัวเพลง (ช่อง ♩ = ซิงก์กับหัวเพลงอยู่แล้ว)

      var typeElem = document.getElementById('type');
      player = {
        ctx: audioCtx,
        melody: parsedRtttl.melody,
        waveType: typeElem ? typeElem.value : 'sine',
        nextIndex: 0,                       // โน้ตถัดไปที่จะจัดคิว
        nextTime: audioCtx.currentTime + 0.05,
        nextNoteId: 1,                      // ลำดับจังหวะย่อย (id ของ note-N)
        timeline: []
      };

      _scheduleAhead(player);
      schedTimer = setInterval(function () { _scheduleAhead(player); }, SCHED_INTERVAL);
      _syncHighlight(player);
    } catch (err) {
      alert(err);
    }
  }

  function stop() {
    shouldStop = true;

    if (schedTimer) {
      clearInterval(schedTimer);
      schedTimer = null;
    }

    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }

    if (audioCtx) {
      try {
        audioCtx.close();
      } catch (e) {}
      audioCtx = null;
    }
    player = null;

    clearHighlight();
    var statusElem = document.getElementById('status');
    if (statusElem) statusElem.innerHTML = ": สั่งหยุด";
  }

  // แจ้งตำแหน่งโน้ตที่กำลังเล่น (null = หยุด/จบ) ให้ส่วนอื่นของหน้าใช้
  // เช่น ตัวแสดงตำแหน่งในหน้าพิมพ์โน้ต: document.addEventListener('rtttl:note', ...)
  var lastEmittedIndex = null;
  function emitNote(noteIndex) {
    if (noteIndex === lastEmittedIndex) return;
    lastEmittedIndex = noteIndex;
    document.dispatchEvent(new CustomEvent('rtttl:note', { detail: { noteIndex: noteIndex } }));
  }

  function highlightStep(noteIndex) {
    emitNote(noteIndex);
    var elem = document.getElementById('note-' + noteIndex);
    if (currentActiveNote === elem) return;

    clearHighlight(true);

    if (elem) {
      elem.style.backgroundColor = '#ffeb3b';
      elem.style.color = '#000000';
      currentActiveNote = elem;
    }
  }

  // keepEmitted = true: ล้างเฉพาะไฮไลต์ในตาราง (ใช้ตอนเปลี่ยนโน้ต) ไม่แจ้งว่าหยุดเล่น
  function clearHighlight(keepEmitted) {
    if (!keepEmitted) emitNote(null);
    if (currentActiveNote) {
      currentActiveNote.style.backgroundColor = '';
      currentActiveNote.style.color = '';
      currentActiveNote = null;
    }
  }

  // จัดคิวโน้ตที่จะเริ่มภายในช่วง LOOKAHEAD ด้วยความเร็วปัจจุบัน
  function _scheduleAhead(p) {
    if (shouldStop || p !== player) return;
    var ctx = p.ctx;
    var horizon = ctx.currentTime + LOOKAHEAD;

    while (p.nextIndex < p.melody.length && p.nextTime < horizon) {
      var item = p.melody[p.nextIndex];
      var noteDuration = item.duration * tempoScale;
      var subBeats = item.subBeatCount;
      var stepDuration = noteDuration / subBeats;

      for (var i = 0; i < subBeats; i++) {
        p.timeline.push({
          startTime: p.nextTime + (i * stepDuration),
          endTime: p.nextTime + ((i + 1) * stepDuration),
          noteIndex: p.nextNoteId + i
        });
      }

      if (item.frequency > 0) {
        var osc = ctx.createOscillator();
        osc.type = p.waveType;
        osc.frequency.value = item.frequency;

        osc.connect(ctx.destination);
        osc.start(p.nextTime);
        osc.stop(p.nextTime + noteDuration);
      }

      p.nextTime += noteDuration;
      p.nextNoteId += subBeats;
      p.nextIndex++;
    }

    if (p.nextIndex >= p.melody.length && schedTimer) {
      clearInterval(schedTimer);
      schedTimer = null;
    }
  }

  function _syncHighlight(p) {
    if (shouldStop || p !== player) return;

    var now = p.ctx.currentTime;
    var timeline = p.timeline;

    // ตัดช่วงที่เล่นผ่านไปแล้วทิ้ง (เก็บตัวสุดท้ายไว้ใช้ตรวจว่าจบเพลง)
    while (timeline.length > 1 && timeline[0].endTime <= now) timeline.shift();

    var activeItem = null;
    for (var i = 0; i < timeline.length; i++) {
      var item = timeline[i];
      if (now >= item.startTime && now < item.endTime) {
        activeItem = item;
        break;
      }
    }

    if (activeItem) {
      highlightStep(activeItem.noteIndex);
    } else if (p.nextIndex >= p.melody.length &&
               (timeline.length === 0 || now >= timeline[timeline.length - 1].endTime)) {
      clearHighlight();
      var statusElem = document.getElementById('status');
      if (statusElem) statusElem.innerHTML = ": จบเพลง";
      return;
    }

    animFrameId = requestAnimationFrame(function () {
      _syncHighlight(p);
    });
  }

  return {
    parse: parse,
    play: play,
    stop: stop,
    setTempo: setTempo
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = rtttlPlay;
} else {
  window.rtttlPlay = rtttlPlay;
}