
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

// Configure Cloudinary with your credentials
// These are server-side only and should not be prefixed with NEXT_PUBLIC_
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { paramsToSign } = body;

    // Check if server-side credentials are provided for signed uploads
    if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET || !process.env.CLOUDINARY_CLOUD_NAME) {
      // If not, we cannot generate a signature.
      // The Cloudinary widget will automatically attempt an unsigned upload.
      return new NextResponse(
        JSON.stringify({
            success: false,
            message: "Cloudinary credentials for signed uploads are not configured on the server.",
        }),
        { status: 400, headers: { 'content-type': 'application/json' } }
      );
    }

    // If credentials are provided, sign the request
    const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET);
    
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

    