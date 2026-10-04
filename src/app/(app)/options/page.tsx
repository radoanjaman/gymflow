'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateProfileSchema, type UpdateProfileInput } from '@/lib/validations/profile.schema';
import type { UserProfileResponse } from '@/lib/services/profile.service';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  User,
  SlidersHorizontal,
  LogOut,
  Dumbbell,
  Calendar,
  LineChart,
  Target,
  Utensils,
  BookOpen,
  ChevronRight,
  ShieldCheck,
  Download,
  Flame,
  Scale,
  Activity,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Zap,
} from 'lucide-react';

const QUICK_HUBS = [
  {
    title: 'My Routines & Splits',
    desc: 'Customize routine days, exercise order, and set targets.',
    href: '/workout',
    icon: Dumbbell,
    color: 'text-primary bg-primary/10 border-primary/20',
  },
  {
    title: 'Workout Calendar & Logs',
    desc: 'View workout schedule, completed sessions, and log history.',
    href: '/calendar',
    icon: Calendar,
    color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  },
  {
    title: 'Progress, Charts & PRs',
    desc: 'Track volume load, 1RM progression, and personal records.',
    href: '/progress',
    icon: LineChart,
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  },
  {
    title: 'Goals & Targets',
    desc: 'Manage active weight, strength, and workout frequency goals.',
    href: '/goals',
    icon: Target,
    color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  },
  {
    title: 'Nutrition & Macro Calculator',
    desc: 'Track daily calorie intake, protein targets, and meal logs.',
    href: '/nutrition',
    icon: Utensils,
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    title: 'Exercise Library',
    desc: 'Browse complete database of barbell, dumbbell, and machine lifts.',
    href: '/exercises',
    icon: BookOpen,
    color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  },
];

export default function OptionsPage() {
  const [profileData, setProfileData] = useState<UserProfileResponse | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
  });

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch('/api/profile');
        if (res.ok) {
          const data: UserProfileResponse = await res.json();
          setProfileData(data);
          reset({
            name: data.name || '',
            dateOfBirth: data.profile?.dateOfBirth
              ? new Date(data.profile.dateOfBirth).toISOString().split('T')[0]
              : '',
            sex: data.profile?.sex || 'OTHER',
            heightCm: data.profile?.heightCm || undefined,
            currentWeightKg: data.metrics.currentWeightKg || undefined,
            activityLevel: data.profile?.activityLevel || 'MODERATELY_ACTIVE',
            experienceLevel: data.profile?.experienceLevel || 'BEGINNER',
            weightUnit: data.profile?.weightUnit || 'KG',
            notificationsEnabled: data.profile?.notificationsEnabled || false,
          });
        }
      } catch {
        setStatusMessage({ type: 'error', text: 'Failed to load profile data.' });
      } finally {
        setIsFetching(false);
      }
    }

    loadProfile();
  }, [reset]);

  const onSave = async (data: UpdateProfileInput) => {
    setIsSaving(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json();
        setStatusMessage({ type: 'error', text: json.message || 'Failed to update profile.' });
        setIsSaving(false);
        return;
      }

      const updated: UserProfileResponse = await res.json();
      setProfileData(updated);
      setStatusMessage({ type: 'success', text: 'Profile updated successfully!' });
      setIsSaving(false);
    } catch {
      setStatusMessage({ type: 'error', text: 'An unexpected error occurred.' });
      setIsSaving(false);
    }
  };

  const handleExportData = async () => {
    try {
      const res = await fetch('/api/profile/export');
      if (res.ok) {
        const data = await res.json();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `gymflow-export-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch {
      alert('Failed to export data.');
    }
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  const userName = profileData?.name || 'Nicolas Doflamingo';
  const userEmail = profileData?.email || 'user@gymflow.app';

  if (isFetching) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-20 animate-in fade-in duration-300">
      {/* 1. TOP HEADER */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-6 w-6 text-primary" />
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              Options & Settings
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Manage your account, biometric preferences, hubs, and privacy controls.
          </p>
        </div>
      </div>

      {statusMessage && (
        <div
          role="alert"
          className={`flex items-center gap-2 rounded-2xl border p-4 text-xs font-bold ${
            statusMessage.type === 'success'
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
              : 'border-destructive/30 bg-destructive/10 text-destructive'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4 shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* 2. USER PROFILE HERO CARD */}
      <div className="rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-primary/50 bg-zinc-800 flex items-center justify-center text-primary font-black text-2xl shadow-lg shrink-0">
            {profileData?.image ? (
              <Image
                src={profileData.image}
                alt={userName}
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            ) : (
              <span>{userName.charAt(0).toUpperCase()}</span>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-extrabold text-white">{userName}</h2>
              <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px] font-bold">
                {profileData?.profile?.experienceLevel || 'BEGINNER'}
              </Badge>
            </div>
            <p className="text-xs text-zinc-400">{userEmail}</p>
            <p className="text-[11px] text-emerald-400 font-medium flex items-center justify-center sm:justify-start gap-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>GymFlow Pro Member</span>
            </p>
          </div>
        </div>

        <Button
          onClick={handleLogout}
          variant="outline"
          className="rounded-xl text-xs font-bold gap-2 border-zinc-700 hover:bg-rose-500/15 hover:text-rose-400 hover:border-rose-500/30 transition"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </Button>
      </div>

      {/* 3. QUICK ACCESS HUBS */}
      <div className="space-y-3">
        <h2 className="text-lg font-extrabold tracking-tight text-foreground">
          Feature Hubs
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {QUICK_HUBS.map((hub) => {
            const Icon = hub.icon;
            return (
              <Link
                key={hub.href}
                href={hub.href}
                className="group flex flex-col justify-between p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 transition shadow-md hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between pb-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${hub.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition">
                    {hub.title}
                  </h3>
                  <p className="text-[11px] text-muted-foreground line-clamp-2">
                    {hub.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 4. BIOMETRIC TARGETS & STATS */}
      {profileData?.metrics && (
        <div className="space-y-3">
          <h2 className="text-lg font-extrabold tracking-tight text-foreground">
            Computed Biometrics
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Card className="rounded-2xl bg-zinc-900 border-zinc-800 p-4 space-y-1">
              <span className="text-[11px] text-muted-foreground font-semibold">Body Mass Index</span>
              <p className="text-xl font-black text-primary">{profileData.metrics.bmi ?? '--'}</p>
              <span className="text-[10px] text-emerald-400 font-bold block">{profileData.metrics.bmiCategory}</span>
            </Card>

            <Card className="rounded-2xl bg-zinc-900 border-zinc-800 p-4 space-y-1">
              <span className="text-[11px] text-muted-foreground font-semibold">Daily Calorie Target</span>
              <p className="text-xl font-black text-orange-400">{profileData.metrics.dailyCalorieTarget ?? '--'} kcal</p>
              <span className="text-[10px] text-muted-foreground block">TDEE: {profileData.metrics.tdee}</span>
            </Card>

            <Card className="rounded-2xl bg-zinc-900 border-zinc-800 p-4 space-y-1">
              <span className="text-[11px] text-muted-foreground font-semibold">Daily Protein Target</span>
              <p className="text-xl font-black text-emerald-400">{profileData.metrics.dailyProteinTargetG ?? '--'} g</p>
              <span className="text-[10px] text-muted-foreground block">Optimized for Muscle</span>
            </Card>

            <Card className="rounded-2xl bg-zinc-900 border-zinc-800 p-4 space-y-1">
              <span className="text-[11px] text-muted-foreground font-semibold">Logged Weight</span>
              <p className="text-xl font-black text-cyan-400">{profileData.metrics.currentWeightKg ?? '--'} kg</p>
              <span className="text-[10px] text-muted-foreground block">Height: {profileData.profile?.heightCm} cm</span>
            </Card>
          </div>
        </div>
      )}

      {/* 5. EDIT PROFILE FORM */}
      <Card className="rounded-3xl bg-zinc-900/90 border-zinc-800 p-6 space-y-5 shadow-lg">
        <div>
          <h2 className="text-lg font-extrabold text-foreground">Edit Profile & Target Units</h2>
          <p className="text-xs text-muted-foreground">
            Update personal height, weight, activity multiplier, and unit preferences.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSave)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs font-bold text-foreground">
                Display Name
              </Label>
              <Input
                id="name"
                {...register('name')}
                className="h-10 rounded-xl bg-zinc-950 border-zinc-800 text-xs"
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-bold text-foreground">
                Email Address
              </Label>
              <Input
                id="email"
                value={profileData?.email || ''}
                disabled
                className="h-10 rounded-xl bg-zinc-950/50 border-zinc-800 text-xs opacity-60"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="heightCm" className="text-xs font-bold text-foreground">
                Height (cm)
              </Label>
              <Input
                id="heightCm"
                type="number"
                {...register('heightCm', { valueAsNumber: true })}
                className="h-10 rounded-xl bg-zinc-950 border-zinc-800 text-xs"
              />
              {errors.heightCm && (
                <p className="text-xs text-destructive">{errors.heightCm.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="currentWeightKg" className="text-xs font-bold text-foreground">
                Log New Weight (kg)
              </Label>
              <Input
                id="currentWeightKg"
                type="number"
                step="0.1"
                {...register('currentWeightKg', { valueAsNumber: true })}
                className="h-10 rounded-xl bg-zinc-950 border-zinc-800 text-xs"
              />
              {errors.currentWeightKg && (
                <p className="text-xs text-destructive">{errors.currentWeightKg.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="activityLevel" className="text-xs font-bold text-foreground">
                Activity Level
              </Label>
              <select
                id="activityLevel"
                className="flex h-10 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-foreground"
                {...register('activityLevel')}
              >
                <option value="SEDENTARY">Sedentary (desk job)</option>
                <option value="LIGHTLY_ACTIVE">Lightly Active (1-2 days/wk)</option>
                <option value="MODERATELY_ACTIVE">Moderately Active (3-5 days/wk)</option>
                <option value="VERY_ACTIVE">Very Active (6-7 days/wk)</option>
                <option value="EXTRA_ACTIVE">Extra Active (athlete level)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="weightUnit" className="text-xs font-bold text-foreground">
                Weight Display Unit
              </Label>
              <select
                id="weightUnit"
                className="flex h-10 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-foreground"
                {...register('weightUnit')}
              >
                <option value="KG">Kilograms (kg)</option>
                <option value="LB">Pounds (lb)</option>
              </select>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSaving || !isDirty}
            className="h-10 rounded-xl px-5 font-bold text-xs gap-2"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              'Save Profile Changes'
            )}
          </Button>
        </form>
      </Card>

      {/* 6. PRIVACY, DATA EXPORT & GDPR */}
      <Card className="rounded-3xl bg-zinc-900/90 border-zinc-800 p-6 space-y-4">
        <h2 className="text-lg font-extrabold text-foreground">Data Export & Security</h2>
        <p className="text-xs text-muted-foreground">
          Download your complete fitness logs, workout history, and personal metrics as JSON.
        </p>

        <div className="flex flex-wrap gap-3">
          <Button
            onClick={handleExportData}
            variant="outline"
            className="rounded-xl text-xs font-bold gap-2 border-zinc-700 hover:bg-zinc-800"
          >
            <Download className="h-4 w-4" />
            <span>Export My Data (JSON)</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}
