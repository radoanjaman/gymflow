import { NextResponse } from 'next/server';
import { AuthService } from '@/lib/services/auth.service';
import { z } from 'zod';

const demoSchema = z.object({
  provider: z.enum(['google', 'facebook', 'athlete']).default('google'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const parsed = demoSchema.safeParse(body);
    const provider = parsed.success ? parsed.data.provider : 'google';

    const user = await AuthService.getOrCreateDemoUser(provider);

    return NextResponse.json({
      success: true,
      email: user.email,
      password: 'GymFlowDemo123!',
      user,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[Demo Auth Error]:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Could not initialize demo authentication.',
      },
      { status: 500 }
    );
  }
}
