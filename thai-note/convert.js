function convert()
{
	let thaiNote = document.getElementById("thn").value;
			//สัญลักษณ์
			thaiNote = thaiNote.replace(/\//g,"");

			thaiNote = thaiNote.replace(/-{5,}/g,"7");

			thaiNote = thaiNote.replace(/-{4,}/g,"6");
			thaiNote = thaiNote.replace(/-{3,}/g,"4");
			thaiNote = thaiNote.replace(/-{2,}/g,"3");
			thaiNote = thaiNote.replace(/-/g,"2");

			//ตัวโน้ต เสียง1สูง
			thaiNote = thaiNote.replace(/ดํ/g,"c");
			thaiNote = thaiNote.replace(/รํ/g,"d");
			thaiNote = thaiNote.replace(/มํ/g,"e");
			thaiNote = thaiNote.replace(/ฟํ/g,"f");
			thaiNote = thaiNote.replace(/ซํ/g,"g");

			//ตัวโน้ต เสียงกลาง
			thaiNote = thaiNote.replace(/ด/g,"C");
			thaiNote = thaiNote.replace(/ร/g,"D");
			thaiNote = thaiNote.replace(/ม/g,"E");
			thaiNote = thaiNote.replace(/ฟ/g,"F");
			thaiNote = thaiNote.replace(/ซ/g,"G");
			thaiNote = thaiNote.replace(/ล/g,"A");
			thaiNote = thaiNote.replace(/ท/g,"B");

			thaiNote = thaiNote.replace(/พ1/g,"V:1");
			thaiNote = thaiNote.replace(/พ2/g,"V:2");

	document.getElementById("abc").innerHTML = "X: 1\n" + "T: ทดสอบ\n" + "M: C\n" + "L: 116\n" + "K: C\n" + thaiNote;
}
