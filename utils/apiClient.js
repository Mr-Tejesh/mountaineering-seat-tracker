import dotenv from 'dotenv';
dotenv.config();

/**
 * Fetch available seats from the API
 * @returns {Promise<number|null>} Number of available seats or null if error
 */
export async function checkSeats() {
  try {

        // Debug: Check if environment variables are set (without exposing values)
    console.log("🔍 Environment Check:");
    console.log("  API_URL exists:", !!process.env.API_URL);
    console.log("  NOTIFICATION_URL exists:", !!process.env.NOTIFICATION_URL);
    console.log("  TEMPLATE_ID:", !!process.env.TEMPLATE_ID);
    console.log("  CATEGORY_NAME:", !!process.env.CATEGORY_NAME);
    console.log("  SERIAL_NO:", !!process.env.SERIAL_NO);
    console.log("  PAGE_SIZE:", !!process.env.PAGE_SIZE);
    console.log("  AUTH_KEY:", !!process.env.AUTH_KEY);

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

    const data = await response.json();

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