//โค้ดสำหรับหน้า index ที่ไม่เกี่ยวกับการแปลงตัวโน้ต
//โน้ตเพลงตัวอย่าง
const melodies = {
  "template": {
    title: "ชื่อเพลง",
    bpm: 120,
    notes: `---- ---- ---- ---- ---- ---- ---- ----`
},
  "lao-kruan": {
      title: "ลาวครวญ 2 ชั้น",
      bpm: 120,
      notes: `---- ---- ->ซ-ม รดรม ---- -ด-ร -ด-ม -รรร
---ซ -ซซซ ลซมซ -ล-ดํ ---ดํ -ดํดํดํ -ซ-ม รด-ร`
  },

  "lao-phung-khao": {
      title: "ลาวพุงขาว 2 ชั้น",
      bpm: 120,
      notes: `---- ---- >รมซล ซม-ซ ---- -ดํ-ล -ซ-ม รด-ร
---ม ---ร ---ดํ มํรํดํล -ซ-ด -ร-ม ซลซม -ร-ด`
  },

  "lao-joy-song": {
      title: "ลาวจ้อย สองชั้น",
      bpm: 120,
      notes: `---ด รมซร ---- -ม-ร ---ด รมซร มรดร -ม-ซ
---ม ซลดํซ ---ม รดรม --ซล -ดํ-รํ มํรํดํล ดํซซซ
---ซ -ซซซ -ซ-ล ดํรํมํล ---- -ซ-ล -ลซล ดํซซซ
---ซ -ซซซ ซมรด -ร-ม ---- ซลดํรํ มํรํดํรํ -มํ-ดํ`
  },

  "lao-joy-single": {
      title: "ลาวจ้อย ชั้นเดียว",
      bpm: 150,
      notes: `-ดรม ซด-ร -ดรม ซล-ซ -มซม รดรม รมซม ซล-ซ
---- รมซล --ดํล ซม-ซ -มรด -ร-ม รด-ร -มรด`
  },

  "lao-long-nan": {
      title: "ลาวล่องน่าน ชั้นเดียว",
      bpm: 200,
      notes: `---- มซลดํ -ดํ-ล ซม-ซ -ดํรํมํ ซํรํ-มํ มํรํดํท ลซ-ดํ`
  },

  "khaek-borathete": {
      title: "แขกบรเทศ ชั้นเดียว",
      bpm: 150,
      notes: `ดํลลล ดํลลล ดํซซซ ดํลซม ซมรด ซดรม ซลซม ซมรด
มมซร มรดล ซมซล ซลดํรํ ซมรด ซดรม ซลซม ซมรด`
  },

  "lao-siang-thian": {
      title: "ลาวเสี่ยงเทียน 2 ชั้น",
      bpm: 120,
      notes: `(ท่อน 1)
---- ---- ->ลลล ซลดํซ ---ฟ -ม-- -ร-ซ -ลซซ
---- ---- -ลลล ซลดํซ ---ฟ -ม-- -ร-ซ -ลซซ
-ลซม ซรมซ --ดํรํ มํรํดํล --ดํล ซมซล -ดํรํมํ -รํ-ดํ
-มํ-รํ -ดํ-มํ --ดํรํ มํรํดํล --ดํล ซมซล -ดํรํมํ -รํ-ดํ

(ท่อน 2)
---- ---- ซลซม ซรมซ ---- ---- ซลซม รด-ร
---- ---- ซลซม ซรมซ ---- ---- ซลซม รด-ร
-มํ-รํ -ดํ-มํ --ดํรํ มํรํดํล --ดํล ซมซล -ดํรํมํ -รํ-ดํ
-มํ-รํ -ดํ-มํ --ดํรํ มํรํดํล --ดํล ซมซล -ดํรํมํ -รํ-ดํ`
  },

  "khaek-borathete-khong": {
      title: "แขกบรเทศ ชั้นเดียว [ฆ้องวงใหญ่] ",
      bpm: 220,
      notes: `--ลล --ลล --ซซ --มม -ซ-ดํ -รํ-มํ -มํ-มํ -รํ-ดํ
-ลฺ-- -ลฺ-- -ซฺ-- -ทฺ-- -ร-ด -ร-ม -ซ-ม -ร-ด

--ลล --ลล --ซซ --มม -ซ-ดํ -รํ-มํ -มํ-มํ -รํ-ดํ
-ลฺ-- -ลฺ-- -ซฺ-- -ทฺ-- -ร-ด -ร-ม -ซ-ม -ร-ด

-มํ-รํ -ดํ-ล --ซล -ดํ-รํ -ซ-ดํ -รํ-มํ -มํ-มํ -รํ-ดํ
-ม-ร -ด-ม -ฟx- -ด-ร -ร-ด -ร-ม -ซ-ม -ร-ด

-มํ-รํ -ดํ-ล --ซล -ดํ-รํ -ซ-ดํ -รํ-มํ -มํ-มํ -รํ-ดํ
-ม-ร -ด-ม -ฟx- -ด-ร -ร-ด -ร-ม -ซ-ม -ร-ด`
  },

  "laa": {
    title: "ลา [ฆ้องวงใหญ่]",
    bpm: 180,
    notes: `---ล -ท-- -ม-ร ---ม -ท-ล -ซ-ม --รม -ซ-ล
-ลฺ-- ---ทฺ ---ลฺ ---ทฺ -ทฺ-ลฺ -ซฺ-ทฺ -ด-- -ซฺ-ลฺ

-รํ-ท -ล-- ซซ-- ลล-ท --ลท -รํ-มํ -มํ-มํ -รํ-ท
-ร-ทฺ -ลฺ-ซฺ ---ลฺ ---ทฺ -ซ-- -ร-ม -ซ-ม -ร-ทฺ

--ลล -ท-ล -ซ-ม -ซ-ล -ท-รํ -ท-- ลล-- ซซ-ม
-ลฺ-- -ทฺ-ลฺ -ซฺ-ทฺ -ซฺ-ลฺ -ทฺ-ร -ทฺ-ลฺ ---ซฺ ---ทฺ

--รร -ม-ซ -ท-ล -ซ-ม -รํ-ท -ล-ซ -ลซซ ---ซ
-ลฺ-- -ทฺ-ซฺ -ทฺ-ลฺ -ซฺ-ทฺ -ร-ทฺ -ลฺ-ซฺ ---ด -ซฺ--`
},

  "luk-om": {
      title: "ลูกอม",
      bpm: 120,
      notes: `--->ซ ลดํดํ- ---มํ รํดํรํ- ---ซ ลดํลดํ ---มํ รํดํรํ-
--มํ- ซํมํรํดํ ---ล ล-ซ- ดํ-ดํ- --ซฟ -มฟ- ล-มํ- รํ---`
  },

  "sai-ta-lok-kan": {
      title: "สายตาหลอกกันไม่ได้",
      bpm: 120,
      notes: `--->ท -ดํ-รํ ---ท ลซ-ซ -ม-ซ -รํ-รํ --ท-
---- ---รํ ดํทดํท -ซซ- มร-- -ม-ซ -ล-ท --xดํ --xท
--xท -ดํ-รํ ---ท ลซ-ซ -ม-ซ -รํ-รํ --ท-
---- --ทท ดํทดํรํ ท-ซ- --มร -มซ- -ล-ซ ---x`
  },

  "tai-thang-pen": {
      title: "ตายทั้งเป็น",
      bpm: 120,
      notes: `---- --->ท -ล-ล -ซล- ---ซ -ล-ท -ล-ล -ซล-
---ท -รํ-มํ -รํ-รํ -ทรํ- ---- -รํ-มํ -รํ-รํ -ทรํ-
---รํ -มํ-ท -ล-ล -ซล- ---ซ -ล-ท -ล-ล -ซล-
---ท -รํ-มํ -รํ-รํ -ทรํ- ---- -รํ-มํ -รํ-รํ -ทรํ-
---มํ ---ซํ ---- -มํ-- ---- ---ซํ -ซํ-ซํ -ซํ-ฟํ#
-มํ-มํ -มํ-มํ ---- -รํ-- ---- -ฟํ-- -ฟํ-ฟํ -มํมํ-
-ท-ดํ -รํ-ท ---ซ -ล-- ---- -ล-ท ---ล ---ซ
---ล ---ซ ---- ---- ---- ---- ---- ----
-ซ-ซ -ซ-ซํ ---- -มํ-- ---- ---ซํ -ซํ-ซํ -ซํ-ฟํ#
-มํ-มํ -มํ-มํ ---- -รํ--- --- -ฟํ-- -ฟํ-ฟํ -มํมํ-
-ท-ดํ -รํ-ท ---ล -ล-- ---- -ล-ท ---ล ---ซ
---ล ---ซ ---- ---- ---- ---- ---- ----`
  },

  "kaem-nong-nang": {
      title: "แก้มน้องนางนั้นแดงกว่าใคร",
      bpm: 120,
      notes: `---- --->ล ซลซล ทลซม
-ร-- -มซล ซลซล -มํรํ-
---- -ทรํมํ รํมํซํมํ รํทท-
---- -ทรํล ทลซม -ซล-`
  },

  "thak-khrab": {
      title: "ทักครับ - Lipta",
      bpm: 160,
      notes: `---- ->ซ-ท --รํท -ล-ซ ---ม -ซ-ท --รํท -ล-ซ
---- -ซ-ฟ# --ซฟ# -ม-ร ---ทฺ -ร-ฟ# --ซฟ# -ม-ร
---- -ซ-ท --รํท -ล-ซ ---ม -ซ-ท --รํท -ล-ซ
---- -มซฟ# --ซฟ# -ม-ร ---ม -ล-- -ซ-- -`
  },

  "sao-suan-taeng": {
      title: "สาวสวนแตง",
      bpm: 120,
      notes: `---- --->ดํ --ลซ ฟซลดํ --ซล ดํลซฟ -ฟรฟ ซลฟซ
---- ดํลซฟ --ซล ดํลซฟ ---ร ฟซฟด -รฟซ ดํลซฟ`
  },

  "nirat-wiang-phing": {
      title: "นิราศเวียงพิงค์",
      bpm: 120,
      notes: `---- --->ด --รม ซลซล --ดํม ซลซล --ซม ซมรม
---- xมซด --รม รมลฺด --รม รมซด --ซฺด รมซม
---- -มซล --ซม รมดร --มร ดลฺซฺด -ลฺซฺลฺ ดลฺซฺลฺ
---- ---ด --รม ซลซล --ดํม ซลซล --ซม ซมรม
---- xมซด --รม รมลฺด --รม รมซด --ซฺด รมซม
---- -มซล --ซม รมดร --มร ดลฺซฺด -ลฺซฺลฺ ดลฺซฺลฺ ---`
  }
};

function changeMelody() {

    const id = document.getElementById("melody").value;

    if (!id) {
        document.getElementById("thm").value = "";
        return;
    }

    const melody = melodies[id];

    document.getElementById("thm").value = melody.title + "(" + melody.bpm + "):\n" + melody.notes;

    // ถ้ามีช่องแสดง BPM
    // document.getElementById("tempo").value = melody.bpm;

    addRowTextarea();
}

function addRowTextarea() {
    var lines = document.querySelector("textarea").value.split(/\r\n|\r|\n/).length;
    document.getElementById("thm").rows = lines;
}

//สร้างลิงก์สำหรับการแชร์
function getSongHash() {
    //สร้างตัวแปรสำหรับการสร้างลิงก์ใหม่ โดยการกดปุ่มเพื่อรันฟังก์ชัน
    let song = document.getElementById('thm').value;
    song = song.replace(/\n/g, "%0A")
    let songName = song.split("(")[0]
    location.hash = song
    navigator.clipboard.writeText(" https://music.warut.net/thai-note/"+ location.hash)
    alert(`คัดลอกลิงก์ URL ${songName} เรียบร้อย` )
}

function loadShareSong() {
    //โหลดเพลง หากลิงก์มีข้อมูลสำหรับโน้ต ให้ดำเนินการรับค่ามาใส่ใน textarea
    if (location.hash) {
        let shareSong = location.hash
        let decodeSongSlice = shareSong.slice(1)
        document.getElementById('thm').innerHTML = decodeURI(decodeSongSlice)
        showTable()
    }
}
loadShareSong()

//ฟังก์ชันคีย์บอร์ดสำหรับมือถือ
//ใส่ค่าโน้ต/สัญญลักษณ์ที่ต้องการ
function keyboardInput(note) {
    let thmNote = document.getElementById('thm');
    if (thmNote.value || !thmNote.value) {
        let noteVal = note.value
        thmNote.value += noteVal
    }
    thmNote.focus()
}

function keyboardDelete() {
    let thmNote = document.getElementById('thm');
    thmNote.value = thmNote.value.slice(0,-1)
    thmNote.focus()
}

const textarea = document.getElementById('thm');
const deleteBtn = document.getElementById('btn12');

deleteBtn.addEventListener('click', () => {
  const pos = textarea.selectionStart; // caret position
  const text = textarea.value;

  const charsToDelete = 5; // you can change this
  const newText = text.slice(0, pos) + text.slice(pos + charsToDelete);

  textarea.value = newText;
  textarea.selectionStart = textarea.selectionEnd = pos; // keep caret in same spot
});



//หน้าต่างผุดสำหรับการโหลดไฟล์
var modal = document.getElementById("saveFilePopup");
var btn = document.getElementById("openFile");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function editor() {
    let ed = document.getElementById('editor');
    if (ed.style.display === "none") {
        ed.style.display = "block"
    } else {
        ed.style.display = "none"
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const thm = document.getElementById("thm");
    const toggleBtn = document.getElementById("toggle");
  
    const keyMap = {
      '1': 'ด',
      '2': 'ร',
      '3': 'ม',
      '4': 'ฟ',
      '5': 'ซ',
      '6': 'ล',
      '7': 'ท',
      '8': 'ดํ',
      '9': 'รํ',
      '+': 'มํ',
      '*': 'ํ',
      '.': 'ฺ'
    };
  
    let isEnabled = false;
  
    // Update button label
    function updateButton() {
      toggleBtn.textContent = isEnabled ? "✔ แปลงโน้ต Auto" : "✘ แปลงโน้ต Auto";
    }
  
    // Toggle function
    toggleBtn.addEventListener("click", function () {
      isEnabled = !isEnabled;
      updateButton();
    });
  
    // Keydown logic (only if enabled)
    document.addEventListener('keydown', function (event) {
      if (!isEnabled) return;
  
      if (keyMap[event.key]) {
        event.preventDefault();
  
        const start = thm.selectionStart;
        const end = thm.selectionEnd;
        const text = thm.value;
        const insertChar = keyMap[event.key];
  
        thm.value = text.slice(0, start) + insertChar + text.slice(end);
        thm.selectionStart = thm.selectionEnd = start + insertChar.length;
      }
    });
  
    // Initial button label
    updateButton();
});

    const text = document.getElementById("thm");
    const increaseBtn = document.getElementById("increaseBtn");
    const decreaseBtn = document.getElementById("decreaseBtn");
    const fontInput = document.getElementById("fontInput");

    // Load from localStorage or set default
    let fontSize = parseInt(localStorage.getItem("fontSize")) || 18;
    fontInput.value = fontSize;
    text.style.fontSize = fontSize + "px";

    function updateFontSize() {
      text.style.fontSize = fontSize + "px";
      fontInput.value = fontSize;
      localStorage.setItem("fontSize", fontSize);
      addRowTextarea()
    }

    increaseBtn.addEventListener("click", () => {
      fontSize += 2;
      updateFontSize();
    });

    decreaseBtn.addEventListener("click", () => {
      if (fontSize > 8) {
        fontSize -= 2;
        updateFontSize();
      }
    });

    fontInput.addEventListener("input", () => {
      fontSize = parseInt(fontInput.value) || 8;
      updateFontSize();
    });
 
    function getTempo() {
      let textarea = document.getElementById("thm");
      let noteData = textarea.value;
      if (noteData === " (100):") {
        textarea.value = ""
      } else if (noteData.value === "") {
        textarea.value = ""
      }
      
      let match = noteData.match(/\((\d+)\)/);
      let numberTempo;
    
      if (match) {
        // ถ้ามี tempo อยู่แล้ว
        numberTempo = parseInt(match[1]);
      } else {
        // ถ้าไม่มี → ใส่ค่า default
        numberTempo = 100;
        // เพิ่ม (100) ต่อท้ายชื่อเพลงก่อน :
        if (noteData.includes(":")) {
          textarea.value = noteData.replace(":", `(${numberTempo}):`);
        } else {
          console.log(textarea.value);
          if (textarea.value === "") {
            textarea.value = "";
          } else 
          textarea.value = noteData + ` (${numberTempo}):`;
        }
      }
    
      return numberTempo;
    }
    getTempo()
    
    // const textarea = document.getElementById("thm");
    const tempoInput = document.getElementById("tempoInput");
    const deBtn = document.getElementById("deBtn");
    const inBtn = document.getElementById("inBtn");
    
    function getTempoFromText() {
      let match = textarea.value.match(/\((\d+)\)/);
    
      if (match) {
        return parseInt(match[1]);
      } else {
        // ถ้าไม่มี tempo ให้ใส่ default
        let defaultTempo = 100;
        textarea.value = textarea.value.replace(":", `(${defaultTempo}):`);
        return defaultTempo;
      }
    }
    
    function updateTempoInText(newTempo) {
      textarea.value = textarea.value.replace(/\(\d+\)/, `(${newTempo})`);
      tempoInput.value = newTempo;
    }
    
    // โหลดค่าเริ่มต้น
    tempoInput.value = getTempoFromText();
    
    inBtn.addEventListener("click", () => {
      let current = parseInt(tempoInput.value) || 100;
      let max = parseInt(tempoInput.max);
      if (current < max) {
        updateTempoInText(current + 10);
      }
    });
    
    deBtn.addEventListener("click", () => {
      let current = parseInt(tempoInput.value) || 100;
      let min = parseInt(tempoInput.min);
      if (current > min) {
        updateTempoInText(current - 10);
      }
    });
    
    // ถ้าพิมพ์เลขตรง input เอง
    tempoInput.addEventListener("input", () => {
      let value = parseInt(tempoInput.value);
      if (!isNaN(value)) {
        updateTempoInText(value);
      }
    });

    function showTable() {

      const settingArea = document.getElementById("settingArea");
      const thmArea = document.getElementById("thm");
      const selectionMelodyArea = document.getElementById("melody");
      const settingTableArea = document.getElementById("sizeTable");
      const outputArea = document.getElementById("output");
  
      // =========================================
      // สลับการแสดงผล
      // =========================================
  
      if (settingArea.style.display === "none") {
  
          settingArea.style.display = "flex";
          thmArea.style.display = "block";
          selectionMelodyArea.style.display = "flex";
          outputArea.style.display = "none";
          settingTableArea.style.display = "none";
  
      } else {
  
          settingArea.style.display = "none";
          thmArea.style.display = "none";
          selectionMelodyArea.style.display = "none";
          settingTableArea.style.display = "flex";
          outputArea.style.display = "block";
      }
  
  
      // =========================================
      // รับค่า textarea
      // =========================================
  
      const textarea = document.getElementById("thm");
      const output = document.getElementById("output");
  
      // ล้างผลลัพธ์เก่า
      output.innerHTML = "";
  
      let text = textarea.value.trim();
      //ลบเครื่องหมาย > สำหรับการเริ่มเล่นเฉพาะจุด
      text = text.replace(/\>/g,"")
  
      // ถ้าไม่มีข้อความ
      if (!text) {
          return;
      }
  
  
      // =========================================
      // แยกข้อความออกเป็นบรรทัด
      // =========================================
  
      const lines = text.split(/\r?\n/);
      // table ปัจจุบัน
      let currentTable = null;

      // =========================================
      // วนแต่ละบรรทัด
      // =========================================
  
      lines.forEach((line, index) => {
          // console.log("บรรทัดที่", index, ":", line);
  
          // =====================================
          // บรรทัดว่าง
          // =====================================
          // บรรทัดว่าง = จบ table เดิม
          // และ table ถัดไปจะถูกสร้างใหม่
          // =====================================
  
          if (line.trim() === "") {
              currentTable = null;
              return;
          }
  
          // ตัดช่องว่างหน้า-หลัง
          line = line.trim();
  
          // =========================================
          // เพลง + tempo
          // =========================================
  
          if (index === 0 && line.includes(":")) {
              const titlePart = line.split(":")[0];
              // ชื่อเพลง
              const name = titlePart
                  .replace(/\(\d+\)/, "")
                  .trim();
              // tempo
              const tempoMatch = titlePart.match(/\((\d+)\)/);
  
              const tempo = tempoMatch
                  ? tempoMatch[1]
                  : "";

              // สร้าง h2
              const hTitle = document.createElement("h2");
              hTitle.textContent = name;
              output.appendChild(hTitle);

              return;
          }
  
  
          // =========================================
          // ท่อนเพลง
          // เช่น
          // (ท่อน 1)
          // (เที่ยวกลับ)
          // =========================================
  
          if (/^\(.*\)$/.test(line)) {
              const section = document.createElement("h");
              section.textContent = line.replace(/[()]/g, "");
              output.appendChild(section);
  
              // เริ่ม table ใหม่
              currentTable = document.createElement("table");
              currentTable.border = "1";
              currentTable.style.borderCollapse = "collapse";
              output.appendChild(currentTable);
  
              return;
          }
  
  
          // =========================================
          // ถ้ายังไม่มี table
          // ให้สร้าง table ใหม่
          // =========================================
  
          if (!currentTable) {
              currentTable = document.createElement("table");
              currentTable.border = "1"; 
              currentTable.style.borderCollapse = "collapse";
              output.appendChild(currentTable);
          }
  
  
          // =========================================
          // สร้างแถว
          // =========================================
  
          const tr = document.createElement("tr");
  
  
          // =========================================
          // แยกโน้ตด้วยช่องว่าง
          // =========================================
  
          const columns = line.split(/\s+/);
  
  
          // =========================================
          // สร้าง td
          // =========================================
  
          columns.forEach(col => {
  
              const td = document.createElement("td");
              td.textContent = col;
              td.style.padding = "6px";
              tr.appendChild(td);
          });
  
  
          // =========================================
          // เพิ่ม tr ลง table
          // =========================================
  
          currentTable.appendChild(tr);

      });
  
  }

    //การปรับขนาดของฟอนต์
    const decreaseTableBtn = document.getElementById("decreaseSize");
    const increaseTableBtn = document.getElementById("increaseSize");
    const sizeInput = document.getElementById("sizeInput");
    
    const STORAGE_KEY = "musicFontSize";
    
    // ===== โหลดค่าจาก localStorage =====
    function loadSavedSize() {
      const savedSize = localStorage.getItem(STORAGE_KEY);
    
      if (savedSize) {
        applySize(parseInt(savedSize));
      } else {
        applySize(parseInt(sizeInput.value)); // ใช้ค่า default
      }
    }
    
    // ===== ใช้ CSS variable ควบคุมทั้งหมด =====
    function applySize(size) {
      document.documentElement.style.setProperty("--music-size", size + "px");
      sizeInput.value = size;
    
      // บันทึกลง localStorage
      localStorage.setItem(STORAGE_KEY, size);
    }
    
    // ===== ปุ่มเพิ่ม =====
    increaseTableBtn.addEventListener("click", () => {
      let size = parseInt(sizeInput.value);
      if (size < parseInt(sizeInput.max)) {
        applySize(size + 2);
      }
    });
    
    // ===== ปุ่มลด =====
    decreaseTableBtn.addEventListener("click", () => {
      let size = parseInt(sizeInput.value);
      if (size > parseInt(sizeInput.min)) {
        applySize(size - 2);
      }
    });
    
    // ===== พิมพ์เอง =====
    sizeInput.addEventListener("input", () => {
      let size = parseInt(sizeInput.value);
      if (!isNaN(size)) applySize(size);
    });
    
    // โหลดค่าทันทีเมื่อหน้าเปิด
    loadSavedSize();

    function loadSongKey() {
      let allText = textarea.value
      let match = allText.match(/\(([A-Za-z][#b]?)\)/);

    if (match) {
      selectKeyByText(match[1]);
    }
    
    }
    
    function selectKeyByText(letter) {
      let select = document.getElementById("key");
      let options = select.options;
    
      for (let i = 0; i < options.length; i++) {
        if (options[i].text.trim().startsWith(letter)) {
          select.selectedIndex = i;
          break;
        }
      }
    }

    loadSongKey()

    //เปลี่ยนข้อความข้อตัวบ่งชี้คีย์เพลง
    function changeKeyText() {
      //ดึงคีย์จาก select
      let select = document.getElementById("key");
      let keyText = select.options[select.selectedIndex].text;
      let key = keyText.split("/")[0];
      //ลบคีย์เดิมออก
      let textarea = document.getElementById("thm");
      let str = textarea.value.replace(/\((?!\d+\))[^)]*\)/g, "");
    
      if (str.match(/\(\d+\)\([A-G][#b]?\)/)) {
        // ดำเนินการเปลี่ยนคีย์
        str = str.replace(/\(\d+\)\([A-G][#b]?\)/, function(m){
          return m.replace(/\([A-G][#b]?\)/, "(" + key + ")");
        });
      } else {
        // หากไม่มีการใส่คีย์
        str = str.replace(/\(\d+\)/, "$&(" + key + ")");
      }
    
      textarea.value = str;
    }

//ฟังก์ชันสลับการแสดงผลตัวหนังสือของฟังก์ชันแปลงตัวเลขเป็นตัวโน้ตไทยและกลับกัน
/* ไม่ทำงาน??? */
function changeText() {

  const button = document.getElementById("manualNumChange");

  if (button.innerText === "1234=>ดรมฟ") {
      button.innerText = "1234=>1234";
      numberalNote()
  } else {
      button.innerText = "1234=>ดรมฟ";
      alphabetNote()
  }

}
    //ฟังก์ชันแปลงตัวเลขเป็นตัวโน้ตไทย
function alphabetNote() {
  var thmtext = document.getElementById('thm').value;
  let i = thmtext.split(':')
  note = i[1]

  note = note.replace(/1/g, 'ด');
  note = note.replace(/2/g, 'ร');
  note = note.replace(/3/g, 'ม');
  note = note.replace(/4/g, 'ฟ');
  note = note.replace(/5/g, 'ซ');
  note = note.replace(/6/g, 'ล');
  note = note.replace(/7/g, 'ท');
  note = note.replace(/8/g, 'ดํ');
  note = note.replace(/9/g, 'รํ');
  note = note.replace(/\*/g, 'ํ');
  note = note.replace(/\+/g, 'ํ');
  note = note.replace(/\./g, 'ฺ');

  document.getElementById('thm').value = i[0] + ":" + note;
}


//ฟังก์ชันแปลงตัวโน้ตไทยเป็นตัวเลข
function numberalNote() {
  var thmtext = document.getElementById('thm').value;
  let i = thmtext.split(':')
  note = i[1]
  //regex ไม่แปลงสตริงใด ๆ ในเครื่องหมาย ()
  // note = note.replace(/ *\([^)]*\) */g, /(\w*)/);

  note = note.replace(/ด/g, '1');
  note = note.replace(/ร/g, '2');
  note = note.replace(/ม/g, '3');
  note = note.replace(/ฟ/g, '4');
  note = note.replace(/ซ/g, '5');
  note = note.replace(/ล/g, '6');
  note = note.replace(/ท/g, '7');
  note = note.replace(/ํ/g, '*');
  note = note.replace(/ฺ/g, '.');

  document.getElementById('thm').value = i[0] + ":" + note;
}

//ฟังก์ชันอ่านไฟล์โน้ต
//Read file https://www.w3docs.com/learn-javascript/file-and-filereader.html
function readFile(input) {
  let file = input.files[0];
  let fileReader = new FileReader();
  fileReader.readAsText(file);
  fileReader.onload = function() {
    document.getElementById("thm").value = fileReader.result;
  };
  fileReader.onerror = function() {
    alert(fileReader.error);
  };
}
//Save file https://stackoverflow.com/a/30740104
function saveTextAsFile() {
  var textToWrite = document.getElementById("thm").value;
  var textFileAsBlob = new Blob([textToWrite], {
    type: "text/plain"
  });
  var splitedText = textToWrite.split(":");
  nameAndBPM = splitedText[0];
  onlyName = nameAndBPM.split("(")
  var fileNameToSaveAs = onlyName[0] + ".txt";

  var downloadLink = document.createElement("a");
  downloadLink.download = fileNameToSaveAs;
  downloadLink.innerHTML = "Download File";
  if (window.webkitURL != null) {
    // Chrome allows the link to be clicked
    // without actually adding it to the DOM.
    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
  } else {
    // Firefox requires the link to be added to the DOM
    // before it can be clicked.
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
  }
  downloadLink.click();
}
// var button = document.getElementById("save");
// button.addEventListener("onclick", saveTextAsFile);

  //แสดง/ซ่อนคีย์บอร๋ด
  function showKeyboard() {
    // console.log("k");
    let k = document.getElementById('keyboard');
    if (k.style.display === "none") {
        k.style.display = "block"
    } else {
        k.style.display = "none"
    }
}