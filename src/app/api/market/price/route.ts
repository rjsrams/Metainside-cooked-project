import { NextRequest, NextResponse } from 'next/server';

const UNIBLOCK_API_KEY = process.env.UNIBLOCK_API_KEY;
const UNIBLOCK_BASE_URL = 'https://api.uniblock.dev/uni/v1';

export async function GET(request: NextRequest) {
  if (!UNIBLOCK_API_KEY) {
    return NextResponse.json(
      { error: 'Uniblock API key not configured' },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');
  const chainId = searchParams.get('chainId') || '1';

  if (!address) {
    return NextResponse.json(
      { error: 'Token address is required' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${UNIBLOCK_BASE_URL}/token/price?chainId=${chainId}&contractAddress=${address}`,
      {
        headers: {
          'X-API-KEY': UNIBLOCK_API_KEY,
          'accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Uniblock API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching token price:', error);
    return NextResponse.json(
      { error: 'Failed to fetch token price' },
      { status: 500 }
    );
  }
}
