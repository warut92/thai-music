//ฟังก์ชันแปลงตัวโน้ตไทยเป็น rtttl
let splitedNote = ""
let pureNote = []
let note = ""
let songName = ""

function convert() {
  //โน้ตทั้งหมด
  let thmtextarea = document.getElementById('thm');
  let allText = thmtextarea.value;

  if (allText.trim() == "") {
    alert("กรุณากรอกโน้ตดนตรีไทยก่อนกดปุ่มเล่น")
  }

  // ตรวจว่าเป็นโน้ตกี่บรรทัด
  const result = /^[^:\n]*\[ฆ้องวงใหญ่\]/.test(allText);

if (result) {
  allText = "[2]" + allText;
}

  const ALLTEXT_ARR = allText.split(":");

  if (ALLTEXT_ARR.length < 1) {
    alert("รูปแบบของโน้ตไม่ถูกต้อง")
  }

  //หากเป็นโน้ตฆ้องวงใหญ่ จะต้องทำการเรียงโน้ตให้ใหม่
  if (allText.startsWith('[2]')) {

    let twoLineNote = ALLTEXT_ARR[1].toString()
    const TWOLINENOTE = twoLineNote.split("\n");
 
    //ลบเอร์เรย์ที่ว่าง ๆ
    const cleanedTWOLINENOTE = TWOLINENOTE.filter(subArray => subArray.length > 0);
    //นำมาเลือกบรรทัดบน-ล่างและทำการจัดเรียง
    const upLine = cleanedTWOLINENOTE.filter((s, i) => (i + 1) % 2 !== 0).concat("$")
    // console.log("up",upLine);
    const downLine = cleanedTWOLINENOTE.filter((s, i) => (i + 1) % 2 === 0)
    // console.log("down",downLine);
    pureNote = upLine.concat(downLine)
    note = pureNote.toString()
    note = note.replace(/ /g,"").replace(/---/g,"-x-")
    // note = note.replace(/ /g,"").replace(/-/g,"x")
    // console.log(note);
    const nameWithBeat = ALLTEXT_ARR[0].split("(");
    // console.log('BEAT', beat)
    songName = nameWithBeat[0]
    beat = nameWithBeat[1]
    //หากไม่ได้กำหนดไว้ จะตั้งค่าปริยายไว้ 100
    if (beat === undefined) {
      beat = "100 "
    }
    beat = beat.slice(0, -1)
  } else { 
          const nameWithBeat = ALLTEXT_ARR[0].split("(");
          // console.log('BEAT', beat)
          songName = nameWithBeat[0]
          beat = nameWithBeat[1]
          //หากไม่ได้กำหนดไว้ จะตั้งค่าปริยายไว้ 100
          if (beat === undefined) {
            beat = "100 "
          }
          beat = beat.slice(0, -1)

          pureNote = ALLTEXT_ARR[1];
          // console.log(pureNote);
        
          //split เพื่อการเลือกเล่นเสียงเฉพาะที่
          splitedNote = pureNote.split(">");
          
          note = splitedNote[1];
          if (splitedNote[1] === undefined) {
            note = pureNote
          }
    }
  //การทำความสะอาดโน้ต
  // console.log(note);
  note = note.replace(/\s/g, '');
  note = note.replace(/\n/g, '');
  note = note.replace(/\//g, '');
  note = note.replace(/\,/g, '');

  //ลบ string ที่อยู่ในวงเล็บ คือเราจะไม่แปลงอะไรในวงเล็บ ก็เลยต้องลบทิ้งเสีย
  note = note.replace(/ *\([^)]*\) */g, "");
  
  // Map โน้ต (รวมโน้ตครึ่งเสียง และโน้ตเสียงสูง-ต่ำ)
const charMap = {
  // --- โน้ตปกติ (Octave 5) ---
  'ด': '6c5,',  'ร': '6d5,',  'ม': '6e5,',
  'ฟ': '6f5,',  'ซ': '6g5,',  'ล': '6a5,',  'ท': '6b5,',

  // --- โน้ตครึ่งเสียง (Accidentals) ---
  'ด#': '6c#5,', 'ดb': '6b4,',
  'ร#': '6d#5,', 'รb': '6c#5,',
  'ฟ#': '6f#5,', 'มb': '6d#5,',
  'ซ#': '6g#5,', 'ซb': '6f#5,',
  'ล#': '6a#5,', 'ลb': '6g#5,',
  'ทb': '6a#5,',

  // --- โน้ตเสียงสูง (Octave 6) ---
  'ดํ': '6c6,',  'รํ': '6d6,',  'มํ': '6e6,',
  'ฟํ': '6f6,',  'ซํ': '6g6,',  'ลํ': '6a6,',  'ทํ': '6b6,',
  'ลํb': '6g#6,', 'ทํb': '6a#6,', // ตัวอย่างครึ่งเสียงสูง

  // --- โน้ตเสียงต่ำ (Octave 4) ---
  'ดฺ': '6c4,',  'รฺ': '6d4,',  'มฺ': '6e4,',
  'ฟฺ': '6f4,',  'ซฺ': '6g4,',  'ลฺ': '6a4,',  'ทฺ': '6b4,',
  'ลฺb': '6g#4,', 'ทฺb': '6a#4,', // ตัวอย่างครึ่งเสียงต่ำ
};

// แปลงตัวอักษรไทยใน {}
// RegEx ใหม่: สแกนหาคำย่อย 3 ตัวใน {} โดยรองรับวรรณยุกต์/สระบน-ล่าง (ํ ฺ) และเครื่องหมาย # b
note = note.replace(/\{((?:[ดรมฟซลท][ํฺ]?[#b]?){3})\}/g, (match, group) => {
  // สกัดโน้ตแต่ละตัวออกจากกลุ่ม (จับคู่ตัวอักษร + สระบนล่าง + # หรือ b)
  const notes = group.match(/[ดรมฟซลท][ํฺ]?[#b]?/g);
  
  if (!notes) return match;
  
  const converted = notes.map(ch => charMap[ch] || ch).join('');
  return `${converted}`;
});

  //โน้ตไทยต่อไปนี้จะใช้ทางเพียงออ
  //กลุ่ม ท
  const BASE  = { ด: 0, ร: 2, ม: 4, ฟ: 5, ซ: 7, ล: 9, ท: 11 };
  const PITCH = ['c','c#','d','d#','e','f','f#','g','g#','a','a#','b'];
  const LEN   = [[8,'1',''],[6,'2','.'],[4,'2',''],[3,'4','.'],[2,'4',''],[1,'8','']];
  
  //สร้างตัวโน้ตปกติ
  // แตกจำนวนหน่วยเป็นรายการความยาว [ตัวเลข, จุด] แบบ greedy
  const split = n => {
    const r = [];
    for (const [u, d, dot] of LEN) for (; n >= u; n -= u) r.push([d, dot]);
    return r;
  };
  const token = ([d, dot], name, oct) => `${d}${name}${dot}${oct},`;
  
  note = note
    .replace(/([ดรมฟซลท])([\u0E3A\u0E4D#b]*)(-*)/g, (_, k, mods, dash) => {
      const n = c => mods.split(c).length - 1;
      const p = (5 - n('\u0E3A') + n('\u0E4D')) * 12 + BASE[k] + n('#') - n('b');
      const [first, ...tail] = split(dash.length + 1);
      return token(first, PITCH[p % 12], (p / 12) | 0)
           + tail.map(l => token(l, 'p', 5)).join('');
    })
    .replace(/-+|x+/g, m => split(m.length).map(l => token(l, 'p', 5)).join(''));
    console.log(note);
  note = note.replace(/''8/g, "32")
  note = note.replace(/'8/g, "16")

  // ลบ string สุดท้าย
  var noteSlice = note.slice(0, -1);
// console.log("slice",noteSlice);
  if (allText.trim().startsWith('[2]')) {
    // console.log("โน้ตสองบรรทัด");
    const ALLNOTE_ARR = noteSlice.split('$')
    // console.log(ALLNOTE_ARR );
    let upLineSlice = ALLNOTE_ARR[0].slice(0, -1);
    // upLineSlice = upLineSlice.replace(/,,/g,",")
    let downLineSlice = ALLNOTE_ARR[1];
    // downLineSlice = downLineSlice.replace(/,,/g,",")
    // console.log("บน",upLineSlice);
    // console.log("ล่าง",downLineSlice);
    document.getElementById('rtttl').value = "บรรทัดบน" + songName + ":d=32,o=5,b=" + beat + ":" + upLineSlice;
    document.getElementById('rtttl1').value = "บรรทัดล่าง" + songName + ":d=32,o=5,b=" + beat + ":" + downLineSlice;

  } else {
    //ดึงค่า splitedBeat นำมาใส่
    // console.log("โน้ตบรรทัดเดียว");
    var output = songName + ":d=32,o=5,b=" + beat + ":" + noteSlice;
    document.getElementById('rtttl').value = output;
    document.getElementById('rtttl1').value = songName + ":d=32,o=5,b=" + beat + ":p";

  } 
}

//ฟังก์ชันเล่นโน้ตสองบรรทัด โดยการตรวจว่าโน้ตนั้นมีคำว่าฆ้องวงใหญ่หรือไม่
function checkMultipleLine() {
  const textarea = document.querySelector('.thm');
  let rawNote = textarea.value
  const button = document.querySelector('.playBtn');
  const result = /^[^:\n]*\[ฆ้องวงใหญ่\]/.test(rawNote);

  if (result) {
    rawNote = "[2]" + rawNote;
  }
  // console.log(rawNote);
  
  // Check if textarea content starts with [2]
  if (rawNote.trim().startsWith('[2]')) {
    console.log("เป็นโน้ต 2 บรรทัด");
    // Replace the onmousedown attribute
    button.setAttribute(
      'onclick',
      "convert();rtttlPlay.play(document.querySelector('.rtttl').value);rtttlPlay.play(document.querySelector('.rtttl1').value)"
    );
    document.getElementById('status').innerHTML = ": โน้ต 2 บรรทัด"
  } else {
    console.log("เป็นโน้ต 1 บรรทัด");
    button.setAttribute(
      'onclick',
      "convert();rtttlPlay.play(document.querySelector('.rtttl').value)"
    );
    document.getElementById('status').innerHTML = ": โน้ต 1 บรรทัด"
  }
}
checkMultipleLine()