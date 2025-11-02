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