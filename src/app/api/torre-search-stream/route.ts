import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('API route called: /api/torre-search-stream');

  try {
    const body = await request.json();
    console.log('Received body:', body);

    const { query, limit = 10, excludeContacts = true } = body;

    if (!query) {
      console.log('No query provided');
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    console.log('Making request to Torre.ai with:', {
      query,
      limit,
      excludeContacts,
    });

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
        'User-Agent': 'Torre-Search-App/1.0',
      },
      body: JSON.stringify({
        query,
        limit,
        excludeContacts,
      }),
    });

    console.log('Torre.ai response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Torre.ai error response:', errorText);
      throw new Error(`Torre.ai API responded with status: ${response.status}`);
    }

    const responseText = await response.text();
    console.log('Torre.ai raw response:', responseText);

    try {
      const data = JSON.parse(responseText);
      console.log('Torre.ai response data (JSON):', data);
      return NextResponse.json(data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    } catch {
      console.log('Failed to parse as JSON, trying NDJSON...');
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

      console.log('Torre.ai response data (NDJSON):', results);
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
