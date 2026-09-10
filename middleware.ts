import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // حدد مسار الصفحة اللي بغيتي تحميها (مثلا /admin أو أي مسار آخر)
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const authHeader = req.headers.get('authorization');

    if (authHeader) {
      const authValue = authHeader.split(' ')[1];
      // فك تشفير الـ Base64 ديال اسم المستخدم وكلمة السر
      const [user, pwd] = atob(authValue).split(':');

      // حط هنا اسم المستخدم وكلمة السر اللي بغيتي
      const ADMIN_USER = "FLKWEBNET";
      const ADMIN_PASS = "Flkwebnet12!@";

      if (user === ADMIN_USER && pwd === ADMIN_PASS) {
        return NextResponse.next();
      }
    }

    // إيلا ما دخلش المعلومات ولا غلط فيهم، كيرجع ليه بوب الباسورد
    return new NextResponse('Auth Required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  return NextResponse.next();
}

// حدد الصفحات اللي كينطبق عليها هاد الميدلوير
export const config = {
  matcher: ['/admin/:path*'],
};