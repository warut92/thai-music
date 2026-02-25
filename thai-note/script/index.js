function addRowTextarea() {
    var lines = document.querySelector("textarea").value.split(/\r\n|\r|\n/).length;
    document.getElementById("thm").rows = lines;
}

//สร้างลิงก์สำหรับการแชร์
function getSongHash() {
    //สร้างตัวแปรสำหรับการสร้างลิงก์ใหม่ โดยการกดปุ่มเพื่อรันฟังก์ชัน
    let song = document.getElementById('thm').value;
    song = song.replace(/\n/g, "%0A")
    location.hash = song
    navigator.clipboard.writeText("https://music.warut.net/thai-note/"+ location.hash)
    alert("คัดลอกลิงก์ URL แล้ว");
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
          textarea.value = noteData + ` (${numberTempo})`;
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
        updateTempoInText(current + 1);
      }
    });
    
    deBtn.addEventListener("click", () => {
      let current = parseInt(tempoInput.value) || 100;
      let min = parseInt(tempoInput.min);
      if (current > min) {
        updateTempoInText(current - 1);
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
      console.log(settingArea.style.display);
      const textarea = document.getElementById("thm");
      const output = document.getElementById("output");
    
      output.innerHTML = "";
    
      const text = textarea.value.trim();
      if (!text) return;
    
      const lines = text.split(/\n/g);
    
      let currentTable = null;
    
      lines.forEach((line, index) => {
    
        line = line.trim();
        if (!line) return;
    
        // ===== เพลง + tempo =====
        if (index === 0 && line.includes(":")) {
    
          const titlePart = line.split(":")[0];
    
          const name = titlePart.replace(/\(\d+\)/, "").trim();
          const tempoMatch = titlePart.match(/\((\d+)\)/);
          const tempo = tempoMatch ? tempoMatch[1] : "";
    
          const hTitle = document.createElement("h2");
          hTitle.textContent = name;
    
          const hTempo = document.createElement("h3");
          // hTempo.textContent = tempo ? "Tempo: " + tempo : "";
    
          output.appendChild(hTitle);
          output.appendChild(hTempo);
    
          return;
        }
    
        // ===== ท่อน =====
        if (/^\(.*\)$/.test(line)) {
    
          const section = document.createElement("h");
          section.textContent = line.replace(/[()]/g, "");
          output.appendChild(section);
    
          // เริ่ม table ใหม่สำหรับแต่ละท่อน
          currentTable = document.createElement("table");
          currentTable.border = "1";
          // currentTable.style.width = "100%";
          currentTable.style.borderCollapse = "collapse";
          output.appendChild(currentTable);
    
          return;
        }
    
        // ===== บรรทัดโน้ต =====
        if (!currentTable) {
          currentTable = document.createElement("table");
          currentTable.border = "1";
          // currentTable.style.width = "100%";
          currentTable.style.borderCollapse = "collapse";
          output.appendChild(currentTable);
        }
    
        const tr = document.createElement("tr");
    
        const columns = line.split(/\s+/);
    
        columns.forEach(col => {
          const td = document.createElement("td");
          td.textContent = col;
          td.style.padding = "6px";
          tr.appendChild(td);
        });
    
        currentTable.appendChild(tr);
      });
    }

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