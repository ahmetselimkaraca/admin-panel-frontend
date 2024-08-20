export const exportToCsv = (data, filename = "configurations.csv") => {
  if (!data || !data.length) {
    return;
  }

  const separator = ",";
  const keys = Object.keys(data[0]);

  const csvContent = [
    keys.join(separator),
    ...data.map((row) =>
      keys.map((key) => JSON.stringify(row[key], replacer)).join(separator)
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    console.error("File download not supported by this browser.");
  }
};

const replacer = (key, value) => (value === null ? "" : value);
