import dotenv from 'dotenv';
dotenv.config();

/**
 * Fetch available seats from the API
 * @returns {Promise<number|null>} Number of available seats or null if error
 */
export async function checkSeats() {
  try {

    // 👇 ADD THIS - REPLACES the old request body
    const filters = process.env.FILTER_DISABLE === '1'
      ? {}
      : { "Category Name": process.env.CATEGORY_NAME };

    const requestBody = {
      "NumberOfFieldsView": 50,
      filters,  // 👈 Uses the conditional filters
      "isDownload": false,
      "index": 1,
      "pgSize": parseInt(process.env.PAGE_SIZE),
      "templateID": parseInt(process.env.TEMPLATE_ID)
    };

    console.log("📤 Sending request with filters:", Object.keys(filters).length === 0 ? "DISABLED" : JSON.stringify(filters));

    const response = await fetch(process.env.API_URL, {
      method: "POST",
      body: JSON.stringify({
        "NumberOfFieldsView": 50,
        "filters": { "Category Name": process.env.CATEGORY_NAME },
        "isDownload": false,
        "index": 1,
        "pgSize": parseInt(process.env.PAGE_SIZE),
        "templateID": parseInt(process.env.TEMPLATE_ID)
      }),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        "Authorization-Token": process.env.AUTH_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Add this right after getting the data, around line 44
    const data = await response.json();
    console.log("📊 totalRecords:", data.response?.totalRecords);
    console.log("📊 filters:", data.response?.inputData?.filters);
    console.log("📊 templateID:", data.response?.inputData?.templateID);


    // 🔍 DEBUG: Log the actual response structure
    console.log("📊 API Response Debug:");
    console.log("  Has 'response' key:", !!data.response);
    console.log("  Has 'records' key:", !!data.response?.records);
    console.log("  Records count:", data.response?.records?.length);
    console.log("Api respone: ", data)

    // Validate response structure
    const records = data?.response?.records;
    if (!records || !Array.isArray(records)) {
      throw new Error("Invalid response structure - no records found");
    }

    // Find the specific BMC record
    const bmcRecord = records.find(record =>
      Array.isArray(record) && record.some(field =>
        field?.name === "Serial No" && field?.value === process.env.SERIAL_NO
      )
    );

    if (!bmcRecord) {
      throw new Error(`${process.env.SERIAL_NO} record not found in response`);
    }

    // Extract available seats
    const availableSeatsField = bmcRecord.find(field =>
      field?.name === "Available Seats"
    );

    if (!availableSeatsField) {
      throw new Error("Available Seats field not found in record");
    }

    const seats = availableSeatsField.value;
    console.log("✅ Available Seats:", seats);
    return seats;

  } catch (error) {
    console.error("❌ Error in checkSeats:", error.message);
    return null;
  }
}