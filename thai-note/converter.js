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
      toggleBtn.textContent = isEnabled ? "แปลงโน้ต Auto" : "ปิดการแปลง Auto";
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