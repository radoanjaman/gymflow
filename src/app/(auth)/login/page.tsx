'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '@/lib/validations/auth.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GymFlowLogo } from '@/components/ui/GymFlowLogo';
import {
  ChevronLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  ShieldCheck,
  FileText,
  X,
} from 'lucide-react';

function GoogleIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
        fill="#4285F4"
      />
      <path
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
        fill="#34A853"
      />
      <path
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.97 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
        fill="#FBBC05"
      />
      <path
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
        fill="#EA4335"
      />
    </svg>
  );
}

function FacebookIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
        fill="#1877F2"
      />
    </svg>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<'google' | 'facebook' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<'terms' | 'privacy' | 'forgot' | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!res || res.error) {
        setErrorMessage(
          res?.error === 'CredentialsSignin'
            ? 'Invalid email or password. Please check your credentials.'
            : res?.error || 'Invalid email or password. Please try again.'
        );
        setIsLoading(false);
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error && err.message.includes('NEXT_REDIRECT')) {
        return;
      }
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Invalid email or password. Please check your credentials.'
      );
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    try {
      setSocialLoading(provider);
      setErrorMessage(null);
      await signIn(provider, { callbackUrl });
    } catch {
      setErrorMessage(`Unable to connect with ${provider}. Please try credentials login.`);
      setSocialLoading(null);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Outer Card / Glass Container with Black & Orange Aesthetic */}
      <div className="w-full rounded-3xl bg-zinc-950/90 backdrop-blur-xl border border-zinc-800/90 shadow-2xl shadow-black/90 overflow-hidden text-zinc-100 transition-all">
        
        {/* Top Header Section with Hero Graphic */}
        <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-black">
          <Image
            src="/images/login-hero.jpg"
            alt="Gym Lifter Focus"
            fill
            priority
            sizes="(max-width: 640px) 100vw, 448px"
            className="object-cover object-top filter contrast-125 brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
          
          {/* Top Bar Navigation Actions */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
            <button
              type="button"
              onClick={() => (window.history.length > 1 ? router.back() : router.push('/'))}
              aria-label="Go back"
              className="h-10 w-10 rounded-full bg-black/60 backdrop-blur-md border border-zinc-700/60 flex items-center justify-center text-zinc-200 hover:bg-zinc-900 hover:text-white transition-all shadow-md active:scale-95"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-zinc-700/60 shadow-md">
              <GymFlowLogo size="xs" accentColor="#FF5500" />
            </div>
          </div>

          <div className="absolute bottom-3 left-6 right-6">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Log in</h1>
            <p className="text-xs text-zinc-300 mt-1">
              By logging in, you agree to our{' '}
              <button
                type="button"
                onClick={() => setActiveModal('terms')}
                className="font-medium text-white underline underline-offset-2 hover:text-orange-400 transition-colors"
              >
                Terms of Use
              </button>
              .
            </p>
          </div>
        </div>

        {/* Card Body / Form Area */}
        <div className="p-6 pt-4 space-y-4">
          {errorMessage && (
            <div
              role="alert"
              className="flex items-center gap-2 rounded-xl border border-destructive/40 bg-destructive/15 p-3 text-xs sm:text-sm text-red-400 animate-in fade-in slide-in-from-top-1 duration-200"
            >
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
              <span className="flex-1">{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-medium text-zinc-300">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  autoComplete="email"
                  disabled={isLoading || socialLoading !== null}
                  {...register('email')}
                  className={`h-11 pl-10 bg-black/70 border-zinc-800 text-white placeholder:text-zinc-500 rounded-xl focus-visible:ring-orange-500/60 focus-visible:border-orange-500 ${
                    errors.email ? 'border-destructive focus-visible:ring-destructive' : ''
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-[11px] text-red-400 pl-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-medium text-zinc-300">
                  Password
                </Label>
                <button
                  type="button"
                  onClick={() => setActiveModal('forgot')}
                  className="text-xs text-zinc-400 hover:text-orange-400 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  disabled={isLoading || socialLoading !== null}
                  {...register('password')}
                  className={`h-11 pl-10 pr-10 bg-black/70 border-zinc-800 text-white placeholder:text-zinc-500 rounded-xl focus-visible:ring-orange-500/60 focus-visible:border-orange-500 ${
                    errors.password ? 'border-destructive focus-visible:ring-destructive' : ''
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[11px] text-red-400 pl-1">{errors.password.message}</p>
              )}
            </div>

            {/* Connect / Sign in Button in Black & Orange */}
            <Button
              type="submit"
              disabled={isLoading || socialLoading !== null}
              className="w-full h-11 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-extrabold text-sm tracking-wide shadow-lg shadow-orange-500/25 active:scale-[0.99] transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin text-black" />
                  Connecting...
                </>
              ) : (
                'Connect'
              )}
            </Button>
          </form>

          {/* Styled Or Divider */}
          <div className="relative my-4 flex items-center justify-center">
            <div className="w-full border-t border-zinc-800" />
            <span className="absolute bg-zinc-950 px-3 text-[11px] font-medium uppercase tracking-wider text-zinc-400">
              Or
            </span>
          </div>

          {/* Social Logins */}
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading || socialLoading !== null}
              className="w-full h-11 rounded-xl bg-black/70 hover:bg-zinc-900 border border-zinc-800 text-zinc-100 font-medium text-sm flex items-center justify-center gap-3 transition-all hover:border-zinc-600 active:scale-[0.99] disabled:opacity-50"
            >
              {socialLoading === 'google' ? (
                <Loader2 className="h-4 w-4 animate-spin text-zinc-300" />
              ) : (
                <>
                  <GoogleIcon className="h-4 w-4" />
                  <span>Sign in with google</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin('facebook')}
              disabled={isLoading || socialLoading !== null}
              className="w-full h-11 rounded-xl bg-black/70 hover:bg-zinc-900 border border-zinc-800 text-zinc-100 font-medium text-sm flex items-center justify-center gap-3 transition-all hover:border-zinc-600 active:scale-[0.99] disabled:opacity-50"
            >
              {socialLoading === 'facebook' ? (
                <Loader2 className="h-4 w-4 animate-spin text-zinc-300" />
              ) : (
                <>
                  <FacebookIcon className="h-4 w-4" />
                  <span>Sign in with Facebook</span>
                </>
              )}
            </button>
          </div>

          {/* Bottom Footnote & Register Link */}
          <div className="pt-2 text-center space-y-2">
            <p className="text-[11px] text-zinc-400">
              For more information, please see our{' '}
              <button
                type="button"
                onClick={() => setActiveModal('privacy')}
                className="font-medium text-zinc-200 underline underline-offset-2 hover:text-orange-400 transition-colors"
              >
                Privacy policy
              </button>
              .
            </p>

            <div className="text-xs text-zinc-400 pt-1">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="font-bold text-orange-400 hover:underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Modal for Terms / Privacy / Forgot Password */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150"
        >
          <div className="w-full max-w-sm rounded-2xl bg-zinc-950 border border-zinc-800 p-6 text-zinc-100 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                {activeModal === 'terms' && <FileText className="h-4 w-4 text-orange-400" />}
                {activeModal === 'privacy' && <ShieldCheck className="h-4 w-4 text-orange-400" />}
                {activeModal === 'forgot' && <Lock className="h-4 w-4 text-orange-400" />}
                <h3 className="font-bold text-base">
                  {activeModal === 'terms' && 'Terms of Use'}
                  {activeModal === 'privacy' && 'Privacy Policy'}
                  {activeModal === 'forgot' && 'Reset Password'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                aria-label="Close modal"
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="text-xs text-zinc-300 leading-relaxed max-h-56 overflow-y-auto space-y-2 pr-1">
              {activeModal === 'terms' && (
                <>
                  <p>
                    Welcome to GymFlow. By using our fitness tracking application, you agree to track your workouts responsibly and consult healthcare professionals before undertaking strenuous exercise programs.
                  </p>
                  <p>
                    All analytics, routine optimizations, and guidance are for tracking and motivational purposes.
                  </p>
                </>
              )}
              {activeModal === 'privacy' && (
                <>
                  <p>
                    Your privacy is protected with end-to-end security. We do not sell your personal health metrics, workout logs, or body metrics.
                  </p>
                  <p>
                    You maintain complete ownership of your data and can request GDPR exports or hard account deletion anytime in Settings.
                  </p>
                </>
              )}
              {activeModal === 'forgot' && (
                <>
                  <p>
                    To reset your password, please contact our support team or use your registered email with your OAuth provider (Google or Facebook) to sign in directly.
                  </p>
                  <p className="text-zinc-400">
                    Self-service email reset links can be requested via our support portal at support@gymflow.app.
                  </p>
                </>
              )}
            </div>

            <Button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-full h-9 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold"
            >
              Understood
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[300px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
