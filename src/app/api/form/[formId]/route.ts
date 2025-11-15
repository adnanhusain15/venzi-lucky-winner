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
      `https://api.typeform.com/forms/${formId}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    // Fetch theme data if available
    if (response.data?.theme?.href) {
      const theme = await axios.get(response.data.theme.href, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
      response.data["theme"] = theme.data;
    }

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching Typeform data:", error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: "Error fetching data", details: error.response?.data },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
