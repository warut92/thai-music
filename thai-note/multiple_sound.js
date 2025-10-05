function checkMultipleLine() {
    const textarea = document.querySelector('.thm');
    const button = document.querySelector('.playBtn');
  
    // Check if textarea content starts with [ฆ้องวงใหญ่]
    if (textarea.value.trim().startsWith('[ฆ้องวงใหญ่]')) {
      // Replace the onmousedown attribute
      button.setAttribute(
        'onclick',
        "convert();rtttlPlay.play(document.querySelector('.rtttl').value);rtttlPlay.play(document.querySelector('.rtttl1').value)"
      );
      document.getElementById('status').innerHTML = ": โน้ต 2 บรรทัด"
      console.log("เป็นโน้ต 2 บรรทัด");
    } else {
      // Optional: revert to default if not matched
      button.setAttribute(
        'onclick',
        "convert();rtttlPlay.play(document.querySelector('.rtttl').value)"
      );
      console.log("เป็นโน้ต 1 บรรทัด");
      document.getElementById('status').innerHTML = ": โน้ต 1 บรรทัด"
    }
  }