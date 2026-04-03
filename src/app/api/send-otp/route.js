import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { mobile, otp } = await req.json();

    if (!mobile || !otp) {
      return NextResponse.json(
        { error: "Mobile number and OTP are required" },
        { status: 400 }
      );
    }

    const url = "https://api.messagebot.in/api/v1/sms/send";

    const payload = {
      mobile: mobile,                 // 10 digit number
      sender: process.env.MESSAGEBOT_SENDER_ID,
      message: `Your OTP is ${otp}. Do not share it with anyone.`,
      template_id: process.env.MESSAGEBOT_TEMPLATE_ID,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MESSAGEBOT_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "SMS sending failed", details: result },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
      result,
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 }
    );
  }
}