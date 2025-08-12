import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { parse } from "csv-parse/sync";
dotenv.config();

const CACHE_FILE = path.join(process.cwd(), "notifications-cache.json");
const CSV_URL = `https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEET_ID}/export?format=csv`;

let lastFetched = 0;
let cacheData: any = [];

// Helper: parse CSV into JSON
function parseCSV(csvText: string) {
    return parse(csvText, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
    });
}

// Fetch from Google Sheets
async function fetchFromGoogle() {
    const res = await fetch(CSV_URL, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch Google Sheet");
    const text = await res.text();
    return parseCSV(text);
}

export async function GET() {
    const now = Date.now();

    // Check if cache exists in memory
    if (now - lastFetched > 5 * 60 * 1000) {
        try {
            // Fetch new data from Google
            const data = await fetchFromGoogle();
            cacheData = data;
            lastFetched = now;

            // Write to file for persistence (in case server restarts)
            fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2));
            console.log("Refreshed notifications from Google Sheets");
        } catch (err) {
            console.error("Error fetching from Google:", err);
            // Fallback to file if fetch fails
            if (fs.existsSync(CACHE_FILE)) {
                cacheData = JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"));
            }
        }
    } else if (cacheData.length === 0 && fs.existsSync(CACHE_FILE)) {
        // Load from file if in-memory cache is empty (after restart)
        cacheData = JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"));
    }

    return new Response(JSON.stringify(cacheData), {
        headers: { "Content-Type": "application/json" },
    });
}
