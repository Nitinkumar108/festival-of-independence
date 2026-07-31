const ExcelJS = require("exceljs");

/**
 * Streams an Excel workbook of the given rows straight to the HTTP response.
 * columns: [{ header: "Full Name", key: "fullName", width: 25 }, ...]
 */
async function exportToExcel(res, { sheetName, columns, rows, fileName }) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(sheetName);

  sheet.columns = columns;
  sheet.getRow(1).font = { bold: true };
  rows.forEach((row) => sheet.addRow(row));

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);

  await workbook.xlsx.write(res);
  res.end();
}

module.exports = exportToExcel;
