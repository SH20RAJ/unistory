export function POST(req) {
  return new Response(JSON.stringify({
    message: 'This is a demo endpoint for referrals',
    status: 'success'
  }), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
//     }