const CSVToExcelConverter = () => {
    const handleCSVToExcel = () => {
        // Logic to convert CSV to Excel
        console.log("CSV to Excel conversion triggered");
    };

    return (
        <div>
            <h1>CSV to Excel Converter</h1>
            <button onClick={handleCSVToExcel}>Convert CSV to Excel</button>
        </div>
    );
}
export default CSVToExcelConverter;