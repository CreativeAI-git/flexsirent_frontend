import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { curSym } from "./pip";
import { StatusDefinitions } from "./data";

const PDF_STATUS_COLORS = {
  Upcoming:  [52, 152, 219],   // blue
  Completed: [46, 204, 113],   // green
  Ongoing:   [241, 196, 15],   // yellow
  Cancelled: [231, 76, 60],    // red
};


// Convert image URL → Base64
const getBase64Image = (imgUrl) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imgUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };

    img.onerror = () => resolve(null);
  });
};

export const generateInvoice = async (data) => {
  const doc = new jsPDF({ unit: "pt" });

  /** --------------------------------------------
   *  HEADER + INVOICE TITLE
   * -------------------------------------------- */
  doc.setFontSize(22);
  doc.text("Booking Invoice", 40, 40);

  // Pick correct status based on logic
  const statusKey =
    data.is_canceled === "No" ? data.current_status : "Cancelled";
  const statusValue =
    StatusDefinitions.propertyBookingStatus[statusKey]?.value || statusKey;

  // Pick PDF color
  const statusColor = PDF_STATUS_COLORS[statusKey] || [46, 204, 113]; // fallback green

  // STATUS badge
  doc.setFillColor(...statusColor);
  doc.roundedRect(420, 25, 100, 25, 6, 6, "F");

  doc.setTextColor("#FFFFFF");
  doc.setFontSize(12);
  doc.text(statusValue, 450, 42);

  doc.setTextColor("#000000"); // reset color

  doc.setFontSize(11);
  doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`, 40, 65);
  doc.text(`Booking ID: ${data.booking_id}`, 40, 80);

  /** --------------------------------------------
   * PROPERTY SECTION (Image + Details)
   * -------------------------------------------- */
  const firstImage = data?.propertyImage?.[0]?.image;
  let y = 110;

  // Property Image
  if (firstImage) {
    const base64 = await getBase64Image(firstImage);
    if (base64) {
      doc.addImage(base64, "PNG", 40, y, 150, 120);
    }
  }

  // Property Details next to Image
  doc.setFontSize(16);
  doc.text("Property Details", 220, y);

  doc.setFontSize(12);
  doc.text(`Title: ${data.property_title}`, 220, y + 20);
  doc.text(`Address: ${data.address}`, 220, y + 40);
  doc.text(`Host: ${data.host_first_name} ${data.host_last_name}`, 220, y + 60);

  y += 160; // Move down after image+block

  /** --------------------------------------------
   * PAYMENT SUMMARY (Right Side Style)
   * -------------------------------------------- */
  doc.setFontSize(16);
  doc.text("Payment Details", 40, y);

  doc.setFontSize(12);
  const currency = data.payment_details?.[0]?.currency || curSym;

  doc.text(`Security Deposit: ${currency}${data.security_deposit}`, 40, y + 20);
  doc.text(`Monthly Rent: ${currency}${data.monthly_rent}`, 40, y + 40);

  const totalAmount = data.payment_details.reduce(
    (sum, p) => sum + p.total_amount,
    0
  );
  doc.text(`Total Amount: ${currency}${totalAmount}`, 40, y + 60);

  y += 100;

  /** --------------------------------------------
   * TRANSACTION TABLE
   * -------------------------------------------- */
  
  doc.setFontSize(16);
  doc.text("Transaction Details", 40, y - 10);

  const tableRows = data.payment_details.map((p, i) => [
    i + 1,
    `${new Date(p.start_date).toLocaleDateString()} - ${new Date(
      p.end_date
    ).toLocaleDateString()}`,
    `${currency}${p.total_amount}`,
    new Date(p.created_at).toLocaleDateString(),
    p.payment_method,
    p.payment_status,
  ]);

  autoTable(doc, {
    startY: y,
    head: [["S.No", "Duration", "Amount", "Payment Date", "Method", "Status"]],
    body: tableRows,
    theme: "grid",
    styles: { fontSize: 11, cellPadding: 6 },
    // headStyles: { fillColor: [240, 248, 255] },
    headStyles: {
      fillColor: [28, 40, 51], // dark navy blue
      textColor: [255, 255, 255], // white text
      fontSize: 12,
      halign: "center",
    },
  });

 /** --------------------------------------------
 * CANCELLATION REASON (ONLY IF CANCELLED)
 * -------------------------------------------- */
let footerY = doc.lastAutoTable.finalY + 30;

if (data.is_canceled !== "No") {
  doc.setFontSize(14);
  doc.setTextColor(231, 76, 60); // red title
  doc.text("Cancellation Reason", 40, footerY);

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0); // reset
  doc.text(data.cancel_reason || "#N/A", 40, footerY + 20);

  footerY += 60; // push footer down
} else {
  footerY += 10;
}

/** --------------------------------------------
 * FOOTER
 * -------------------------------------------- */
doc.setFontSize(11);
doc.text(
  "Thank you for your stay! If you have any questions, contact support.",
  40,
  footerY
);
  doc.save(`Invoice-${data.booking_id}.pdf`);
};
