const COP28 = {
  COP18: { kg: 6.12, bb: 20, d: "hộp" },
  COP20: { kg: 6.8, bb: 20, d: "túi" },
  COP21: { kg: 7.14, bb: 20, d: "hộp" },
  COP50: { kg: 8.5, bb: 10, d: "túi" },
};
const CFHT = {
  CFQUAN: { kg: 7.2, bb: 30, d: "hộp" },
  DTHT: { kg: 5.76, bb: 20, d: " hộp" },
  COL: { kg: 5.76, bb: 20, d: "hộp" },
};

function funcs() {
  let base = parseFloat(document.getElementById("nl").value);
  const checkbox = document.querySelectorAll(".dt-check:checked");
  let resultHTML = "";
  let totalBox = 0;
  let errHTML = "";
  let remain = base;

  for (let i = 0; i < checkbox.length; i++) {
    let COP = checkbox[i].value;
    let kg_COP = COP28[COP].kg;
    let bb_COP = COP28[COP].bb;
    let d_COP = COP28[COP].d;
    let txt_SL = document.getElementById("sl-" + COP);
    let txt_value = parseInt(txt_SL.value);

    if (!isNaN(txt_value)) {
      let powder = txt_value * kg_COP;
      if (powder <= remain) {
        remain -= powder;
        resultHTML += `<p><span class="nmd"><i class="bi bi-caret-right-fill"></i> ${COP}:</span> <span class="fw-medium">${txt_value} thùng </span> (dùng ${powder.toFixed(
          2
        )}kg, cần ${txt_value * bb_COP} ${d_COP} )<br/></p>`;
        totalBox += txt_value;
      } else {
        errHTML += `<p class="fw-medium">❌ Không đủ nguyên liệu cho ${txt_value} thùng ${COP} (Cần ${powder.toFixed(
          2
        )}kg, còn lại ${remain.toFixed(2)}kg)</p><br/>`;
      }
    } else {
      let sl = Math.floor(remain / kg_COP);
      let powder_used = sl * kg_COP;
      remain -= powder_used;
      resultHTML += `${COP}: ${sl} thùng (dùng ${powder_used.toFixed(
        2
      )}kg, cần ${sl * bb_COP} ${d_COP})<br/>`;
      totalBox += sl;
    }
  }

  let goiYHTML = "";
  if (remain > 0.01 && checkbox.length > 0) {
    goiYHTML += `<div class="suggest"><p>🔍 Với ${remain.toFixed(
      2
    )}kg còn lại, bạn có thể sản xuất thêm:</p><br/>`;
    for (let d in COP28) {
      let goiY = Math.floor(remain / COP28[d].kg);
      goiYHTML += `<p><span class="nmd"><i class="bi bi-caret-right-fill"></i> ${d}:</span> <span class="fw-medium">${goiY} thùng<span></p><br/>`;
    }
    goiYHTML += `</div>`;
  }

  //Xử lý nhóm cà phê bột
  const honey = 0.25;
  const hh = 0.34;

  let txt_honey = parseFloat(document.getElementById("kg-HONEY").value);
  let txt_hh = parseFloat(document.getElementById("kg-HH").value);

  let cf_bot = "";
  cf_bot = `<div class="result"><h4>Kết quả:</h4><br/>`;

  if (!isNaN(txt_honey) & (txt_honey > 0)) {
    let sl_bbhn = Math.floor(txt_honey / honey);
    cf_bot += `<p><span class="nmd"><i class="bi bi-caret-right-fill"></i> CF HONEY: </span><span class="fw-medium"> ${sl_bbhn} túi </span>`;
  }

  if (!isNaN(txt_hh) & (txt_hh > 0)) {
    let sl_bbhh = Math.floor(txt_hh / hh);
    cf_bot += `<p><span class="nmd"><i class="bi bi-caret-right-fill"></i> CF HOÀN HẢO: </span><span class="fw-medium"> ${sl_bbhh} túi </span>`;
  }

  cf_bot += `</div>`;
  //   Xử lý nhóm sản phẩm khác
  let otherProduct = "";
  for (let a in CFHT) {
    let kgInput = parseFloat(document.getElementById("kg-" + a).value);
    if (!isNaN(kgInput) && kgInput > 0) {
      otherProduct += `<div class="result"><h4>Kết quả:</h4><br/>`;
      let slThung = Math.floor(kgInput / CFHT[a].kg);
      let baoBi = slThung * CFHT[a].bb;
      let c = CFHT[a].d;
      let name = "";
      switch (a) {
        case "CFQUAN":
          name = "QUÁN";
          break;

        case "DTHT":
          name = "ĐTHT";
          break;

        case "COL":
          name = "COLLAGEN";
          break;
      }
      otherProduct += `<p><span class="nmd"><i class="bi bi-caret-right-fill"></i> ${name}:</span><span class="fw-medium"> ${slThung}thùng </span> (dùng ${
        slThung * CFHT[a].kg
      }kg, cần ${baoBi} ${c})</p><br/>`;
    }
  }
  otherProduct += `</div>`;

  let html = "";

  if (resultHTML !== "") {
    html += `<div class="result"><h4>Kết quả:</h4><br/>${resultHTML}<br/><p>👉 Nguyên liệu còn dư: ${remain.toFixed(
      2
    )} kg</p><br/><p>👉 Tổng số thùng: ${totalBox}</p</div>`;
  }

  if (errHTML !== "") {
    html += `<div class="error">${errHTML}</div>`;
  }

  html += goiYHTML + otherProduct + cf_bot;

  document.getElementById("result").innerHTML = html;
}
