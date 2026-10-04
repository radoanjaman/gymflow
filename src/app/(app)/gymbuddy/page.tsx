'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Users2,
  UserPlus,
  Flame,
  Target,
  Trophy,
  Copy,
  Check,
  Send,
  Zap,
  Dumbbell,
  ShieldCheck,
  Clock,
  Heart,
  TrendingUp,
  Award,
  Bell,
} from 'lucide-react';

interface GymBuddy {
  id: string;
  name: string;
  username: string;
  avatar: string;
  streak: number;
  status: 'online' | 'in_workout' | 'offline';
  lastActive: string;
  currentGoal: {
    title: string;
    current: number;
    target: number;
    unit: string;
    progressPct: number;
  };
  recentWorkout: {
    title: string;
    timeAgo: string;
    volumeKg: number;
    exercisesCount: number;
  };
}

const INITIAL_BUDDIES: GymBuddy[] = [
  {
    id: 'buddy-1',
    name: 'Marcus Cole',
    username: '@marcus_iron',
    avatar: 'M',
    streak: 18,
    status: 'in_workout',
    lastActive: 'Currently in workout',
    currentGoal: {
      title: 'Barbell Bench Press 1RM',
      current: 95,
      target: 105,
      unit: 'kg',
      progressPct: 90,
    },
    recentWorkout: {
      title: 'Chest & Tricep Hypertrophy',
      timeAgo: 'Just now',
      volumeKg: 14200,
      exercisesCount: 5,
    },
  },
  {
    id: 'buddy-2',
    name: 'Sarah Chen',
    username: '@sarah_fit',
    avatar: 'S',
    streak: 12,
    status: 'online',
    lastActive: 'Active 15m ago',
    currentGoal: {
      title: 'Weekly Workout Frequency (5x/week)',
      current: 4,
      target: 5,
      unit: 'sessions',
      progressPct: 80,
    },
    recentWorkout: {
      title: 'Leg Day & Glute Power',
      timeAgo: '2 hours ago',
      volumeKg: 18450,
      exercisesCount: 6,
    },
  },
  {
    id: 'buddy-3',
    name: 'Alex Rivera',
    username: '@alex_lifts',
    avatar: 'A',
    streak: 7,
    status: 'offline',
    lastActive: 'Yesterday',
    currentGoal: {
      title: 'Target Body Weight',
      current: 78.5,
      target: 75.0,
      unit: 'kg',
      progressPct: 65,
    },
    recentWorkout: {
      title: 'Deadlift & Pull Strength',
      timeAgo: '1 day ago',
      volumeKg: 11800,
      exercisesCount: 4,
    },
  },
];

export default function GymBuddyPage() {
  const [buddies, setBuddies] = useState<GymBuddy[]>(INITIAL_BUDDIES);
  const [buddyCodeInput, setBuddyCodeInput] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [cheerMessage, setCheerMessage] = useState<string | null>(null);
  const [addSuccess, setAddSuccess] = useState<string | null>(null);
  const [shareWorkouts, setShareWorkouts] = useState(true);
  const [shareGoals, setShareGoals] = useState(true);

  const myBuddyCode = 'GF-8842';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(myBuddyCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleAddBuddy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buddyCodeInput.trim()) return;

    const newBuddy: GymBuddy = {
      id: `buddy-${Date.now()}`,
      name: buddyCodeInput.startsWith('@') ? buddyCodeInput.slice(1) : buddyCodeInput,
      username: buddyCodeInput.startsWith('@') ? buddyCodeInput : `@${buddyCodeInput.toLowerCase()}`,
      avatar: buddyCodeInput.charAt(0).toUpperCase(),
      streak: 1,
      status: 'online',
      lastActive: 'Just connected',
      currentGoal: {
        title: 'Workout Consistency',
        current: 3,
        target: 4,
        unit: 'workouts',
        progressPct: 75,
      },
      recentWorkout: {
        title: 'Full Body Conditioning',
        timeAgo: 'Today',
        volumeKg: 8500,
        exercisesCount: 4,
      },
    };

    setBuddies((prev) => [newBuddy, ...prev]);
    setAddSuccess(`Connected with ${newBuddy.name} successfully! 🎉`);
    setBuddyCodeInput('');
    setTimeout(() => setAddSuccess(null), 4000);
  };

  const sendCheer = (buddyName: string, action: string) => {
    setCheerMessage(`Sent ${action} to ${buddyName}! 🔥`);
    setTimeout(() => setCheerMessage(null), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-20 animate-in fade-in duration-300">
      {/* 1. TOP HEADER */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <div className="flex items-center gap-2">
            <Users2 className="h-6 w-6 text-primary" />
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              GymBuddy
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Share workout progress, track each other&apos;s goals, and stay accountable together.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge className="bg-primary/15 text-primary border-primary/20 text-xs font-bold px-3 py-1">
            {buddies.length} Buddies Active
          </Badge>
        </div>
      </div>

      {/* Cheer Notification Toast */}
      {cheerMessage && (
        <div className="rounded-2xl bg-primary/15 border border-primary/30 p-3.5 text-xs text-primary font-bold flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <span>{cheerMessage}</span>
          <Check className="h-4 w-4" />
        </div>
      )}

      {/* Add Success Toast */}
      {addSuccess && (
        <div className="rounded-2xl bg-emerald-500/15 border border-emerald-500/30 p-3.5 text-xs text-emerald-400 font-bold flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <span>{addSuccess}</span>
          <Check className="h-4 w-4" />
        </div>
      )}

      {/* 2. SHARE CODE & ADD BUDDY CARD */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Your Shareable Code */}
        <Card className="rounded-2xl bg-zinc-900/90 border-zinc-800 p-5 flex flex-col justify-between space-y-3 shadow-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>Your GymBuddy Code</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Give this code to a friend so they can track your workouts and goals.
            </p>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800">
            <span className="text-xl font-black font-mono tracking-widest text-primary">
              {myBuddyCode}
            </span>
            <Button
              onClick={handleCopyCode}
              size="sm"
              variant="outline"
              className="rounded-lg text-xs font-bold gap-1.5 border-zinc-700 hover:bg-zinc-800"
            >
              {copiedCode ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
            </Button>
          </div>
        </Card>

        {/* Add a GymBuddy Form */}
        <Card className="rounded-2xl bg-zinc-900/90 border-zinc-800 p-5 flex flex-col justify-between space-y-3 shadow-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
              <UserPlus className="h-4 w-4 text-primary" />
              <span>Add a GymBuddy</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Enter a friend&apos;s Buddy Code, username, or email address.
            </p>
          </div>

          <form onSubmit={handleAddBuddy} className="flex gap-2">
            <Input
              value={buddyCodeInput}
              onChange={(e) => setBuddyCodeInput(e.target.value)}
              placeholder="e.g. GF-9120 or @sarah"
              className="h-11 rounded-xl bg-zinc-950 border-zinc-800 text-xs text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
            />
            <Button type="submit" className="h-11 rounded-xl px-4 font-bold text-xs shrink-0 gap-1.5 shadow-md">
              <Send className="h-3.5 w-3.5" />
              <span>Add</span>
            </Button>
          </form>
        </Card>
      </div>

      {/* 3. WEEKLY BUDDY DUEL HIGHLIGHT */}
      <div className="rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 p-5 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-400" />
            <h3 className="text-base sm:text-lg font-black text-foreground">
              Weekly Volume Duel: You vs Marcus
            </h3>
          </div>
          <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/20 text-[10px] font-bold">
            Live Duel
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 text-center">
          <div className="p-3 rounded-2xl bg-zinc-900/80 border border-primary/20 space-y-1">
            <span className="text-xs text-muted-foreground font-semibold">You</span>
            <p className="text-xl sm:text-2xl font-black text-primary">24,500 kg</p>
            <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              5 of 5 Workouts
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1">
            <span className="text-xs text-muted-foreground font-semibold">Marcus Cole</span>
            <p className="text-xl sm:text-2xl font-black text-foreground">21,200 kg</p>
            <span className="text-[11px] font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full">
              4 of 5 Workouts
            </span>
          </div>
        </div>
      </div>

      {/* 4. ACTIVE BUDDY CARDS & GOAL TRACKING */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-foreground">
          Connected GymBuddies ({buddies.length})
        </h2>

        <div className="space-y-4">
          {buddies.map((buddy) => (
            <Card
              key={buddy.id}
              className="rounded-3xl bg-zinc-900/90 border-zinc-800 p-5 sm:p-6 space-y-5 shadow-lg overflow-hidden"
            >
              {/* Top Buddy Info */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-12 w-12 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-primary font-black text-lg">
                      {buddy.avatar}
                    </div>
                    <span
                      className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-background ${
                        buddy.status === 'in_workout'
                          ? 'bg-amber-400 animate-pulse'
                          : buddy.status === 'online'
                          ? 'bg-emerald-400'
                          : 'bg-zinc-600'
                      }`}
                    />
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-foreground">{buddy.name}</h3>
                    <p className="text-xs text-muted-foreground font-mono">{buddy.username}</p>
                    <span className="text-[11px] text-zinc-400 block pt-0.5">
                      {buddy.lastActive}
                    </span>
                  </div>
                </div>

                {/* Streak Badge */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/20 text-orange-400 text-xs font-bold">
                  <Flame className="h-4 w-4 fill-current" />
                  <span>{buddy.streak} Day Streak</span>
                </div>
              </div>

              {/* Goal Progress Section (Track Buddy Goal) */}
              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    <span className="text-xs font-bold text-foreground">
                      Tracking Goal: {buddy.currentGoal.title}
                    </span>
                  </div>
                  <span className="text-xs font-black text-primary">
                    {buddy.currentGoal.progressPct}%
                  </span>
                </div>

                <Progress value={buddy.currentGoal.progressPct} className="h-2 rounded-full" />

                <div className="flex justify-between text-[11px] text-muted-foreground font-medium">
                  <span>
                    Current: {buddy.currentGoal.current} {buddy.currentGoal.unit}
                  </span>
                  <span>
                    Target: {buddy.currentGoal.target} {buddy.currentGoal.unit}
                  </span>
                </div>
              </div>

              {/* Recent Workout Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted-foreground pt-1">
                <div className="flex items-center gap-2">
                  <Dumbbell className="h-4 w-4 text-zinc-400" />
                  <span>
                    Last: <strong className="text-foreground">{buddy.recentWorkout.title}</strong> (
                    {buddy.recentWorkout.volumeKg.toLocaleString()} kg •{' '}
                    {buddy.recentWorkout.exercisesCount} exercises)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => sendCheer(buddy.name, 'a High Five ✋')}
                    size="sm"
                    variant="outline"
                    className="rounded-xl text-xs font-bold border-zinc-700 hover:bg-zinc-800"
                  >
                    ✋ High Five
                  </Button>
                  <Button
                    onClick={() => sendCheer(buddy.name, 'a Nudge ⏰')}
                    size="sm"
                    variant="outline"
                    className="rounded-xl text-xs font-bold border-zinc-700 hover:bg-zinc-800"
                  >
                    ⏰ Nudge
                  </Button>
                  <Button
                    onClick={() => sendCheer(buddy.name, 'Cheer 🔥')}
                    size="sm"
                    className="rounded-xl text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                  >
                    🔥 Cheer
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 5. PRIVACY & SHARING CONTROLS */}
      <Card className="rounded-3xl bg-zinc-900/90 border-zinc-800 p-5 sm:p-6 space-y-4">
        <h3 className="text-base font-extrabold text-foreground">GymBuddy Privacy Controls</h3>
        <div className="space-y-3 text-xs">
          <label className="flex items-center justify-between p-2 rounded-xl bg-zinc-950 border border-zinc-800 cursor-pointer">
            <span className="text-foreground font-medium">
              Allow connected GymBuddies to view my workout activity
            </span>
            <input
              type="checkbox"
              checked={shareWorkouts}
              onChange={(e) => setShareWorkouts(e.target.checked)}
              className="h-4 w-4 accent-primary rounded"
            />
          </label>
          <label className="flex items-center justify-between p-2 rounded-xl bg-zinc-950 border border-zinc-800 cursor-pointer">
            <span className="text-foreground font-medium">
              Allow GymBuddies to track my active fitness goals
            </span>
            <input
              type="checkbox"
              checked={shareGoals}
              onChange={(e) => setShareGoals(e.target.checked)}
              className="h-4 w-4 accent-primary rounded"
            />
          </label>
        </div>
      </Card>
    </div>
  );
}
