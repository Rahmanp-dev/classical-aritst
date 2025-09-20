
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

// Note: CLOUDINARY_CLOUD_NAME is used here, NOT the one with NEXT_PUBLIC_
// This is because this is a server-side route.
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

export async function POST(request: Request) {
  // Check if server-side credentials are provided for signed uploads
  if (!apiKey || !apiSecret || !cloudName) {
    return new NextResponse(
      JSON.stringify({
          success: false,
          message: "Cloudinary credentials for signed uploads are not configured on the server. Unsigned uploads will be attempted.",
      }),
      { status: 400, headers: { 'content-type': 'application/json' } }
    );
  }

  // If credentials are provided, proceed with signing
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });

  try {
    const body = await request.json();
    const { paramsToSign } = body;

    const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret);
    
    return NextResponse.json({ signature });

  } catch (error) {
    console.error("Error signing Cloudinary params:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return new NextResponse(
        JSON.stringify({
            success: false,
            message: "Failed to sign Cloudinary parameters",
            error: errorMessage,
        }),
        { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
}
