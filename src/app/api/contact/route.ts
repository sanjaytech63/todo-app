import contactFormSchema from '@/app/lib/validations/contact';
import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/db/connect';
import Contact from '@/app/models/Contact';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    await dbConnect();

    await Contact.create(parsed.data);

    return NextResponse.json({ message: 'Message saved!' });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
