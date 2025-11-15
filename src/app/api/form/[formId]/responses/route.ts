import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(
  req: NextRequest,
  { params }: { params: { formId: string } }
) {
  const formId = params.formId;
  const apiKey = process.env.TYPEFORM_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "TYPEFORM_API_KEY is not configured" },
      { status: 500 }
    );
  }

  try {
    const response = await axios.get(
      `https://api.typeform.com/forms/${formId}/responses`,
      {
        params: {
          page_size: 1000,
        },
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching Typeform responses:", error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: "Error fetching responses", details: error.response?.data },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { error: "Error fetching responses" },
      { status: 500 }
    );
  }
}
