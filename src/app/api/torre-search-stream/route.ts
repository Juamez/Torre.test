import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received body:', body);

    const { query, limit = 10, excludeContacts = true } = body;

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    const apiUrl = process.env.API_URL_SEARCH;
    if (!apiUrl) {
      console.error('API_URL_SEARCH environment variable is not defined');
      return NextResponse.json(
        { error: 'API_URL_SEARCH environment variable is not defined' },
        { status: 500 }
      );
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        limit,
        excludeContacts,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Torre.ai error response:', errorText);
      throw new Error(`Torre.ai API responded with status: ${response.status}`);
    }

    const responseText = await response.text();

    try {
      const data = JSON.parse(responseText);

      return NextResponse.json(data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    } catch {
      const lines = responseText.trim().split('\n');
      const results: unknown[] = [];

      for (const line of lines) {
        if (line.trim()) {
          try {
            const parsed = JSON.parse(line);
            results.push(parsed);
          } catch (lineError) {
            console.error('Failed to parse line:', line, lineError);
          }
        }
      }

      return NextResponse.json(results, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }
  } catch (error) {
    console.error('Torre search API error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to search Torre API';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
