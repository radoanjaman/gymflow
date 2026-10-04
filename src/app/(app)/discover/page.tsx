'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Star,
  Flame,
  CheckCircle2,
  XCircle,
  Play,
  Dumbbell,
  Sparkles,
  Info,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap,
  Activity,
  Bell,
  SlidersHorizontal,
} from 'lucide-react';

interface GoogleExerciseGuide {
  id: string;
  name: string;
  category: string;
  targetMuscles: string[];
  equipment: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  exerciseCount?: number;
  badge?: string;
  summary: string;
  setup: string[];
  execution: string[];
  breathing: string;
  commonMistakes: string[];
  proTips: string[];
  videoSearchUrl: string;
}

const POPULAR_WORKOUTS = [
  {
    id: 'pop-1',
    title: 'Home Workout',
    exerciseCount: 12,
    rating: 4.9,
    category: 'Bodyweight & Calisthenics',
    gradient: 'from-rose-600/90 to-orange-500/90',
    icon: Flame,
    desc: 'No equipment needed. High calorie burn and core activation.',
  },
  {
    id: 'pop-2',
    title: 'Hand & Grip Exercise',
    exerciseCount: 12,
    rating: 4.9,
    category: 'Forearms & Wrist',
    gradient: 'from-zinc-900 to-zinc-950 border border-zinc-800',
    icon: Dumbbell,
    desc: 'Develop crushing grip strength and forearm vascularity.',
  },
  {
    id: 'pop-3',
    title: 'Full-Body Hypertrophy',
    exerciseCount: 16,
    rating: 4.8,
    category: 'Full Body Compound',
    gradient: 'from-emerald-900/80 to-zinc-900',
    icon: Zap,
    desc: 'Complete muscle breakdown and anabolic stimulus.',
  },
  {
    id: 'pop-4',
    title: 'Core & Abs Sculpt',
    exerciseCount: 10,
    rating: 4.9,
    category: 'Abdominals & Obliques',
    gradient: 'from-purple-900/80 to-zinc-900',
    icon: Activity,
    desc: 'Deep core stabilization and six-pack definition.',
  },
];

const OUR_COLLECTIONS = [
  {
    id: 'col-1',
    title: 'Chest & abdominal exercises',
    exerciseCount: 12,
    muscles: 'Pectoralis Major, Rectus Abdominis, Serratus',
    bgGradient: 'from-amber-950/60 via-zinc-900 to-zinc-950',
    border: 'border-amber-500/20',
    tag: 'Chest & Core',
  },
  {
    id: 'col-2',
    title: 'Back & shoulder exercises',
    exerciseCount: 12,
    muscles: 'Latissimus Dorsi, Rhomboids, Traps, Deltoids',
    bgGradient: 'from-indigo-950/60 via-zinc-900 to-zinc-950',
    border: 'border-indigo-500/20',
    tag: 'V-Taper',
  },
  {
    id: 'col-3',
    title: 'Legs & glutes power',
    exerciseCount: 10,
    muscles: 'Quadriceps, Hamstrings, Gluteus Maximus, Calves',
    bgGradient: 'from-rose-950/60 via-zinc-900 to-zinc-950',
    border: 'border-rose-500/20',
    tag: 'Lower Body',
  },
  {
    id: 'col-4',
    title: 'Arm & grip hypertrophy',
    exerciseCount: 10,
    muscles: 'Biceps Brachii, Triceps, Brachioradialis',
    bgGradient: 'from-cyan-950/60 via-zinc-900 to-zinc-950',
    border: 'border-cyan-500/20',
    tag: 'Arms',
  },
];

const GOOGLE_EXERCISES_DATABASE: GoogleExerciseGuide[] = [
  {
    id: 'ex-1',
    name: 'Barbell Bench Press',
    category: 'Chest',
    targetMuscles: ['Chest (Pectoralis)', 'Triceps', 'Anterior Deltoid'],
    equipment: 'Barbell & Bench',
    difficulty: 'Intermediate',
    rating: 4.9,
    summary:
      'The gold standard upper-body pressing exercise for raw strength and pectoral hypertrophy.',
    setup: [
      'Lie flat on the bench with eyes positioned directly under the barbell.',
      'Grip the bar slightly wider than shoulder-width with a firm, full thumb grip.',
      'Plant feet flat on the floor and retract shoulder blades tight into the bench.',
    ],
    execution: [
      'Unrack the bar and stabilize over your mid-chest with elbows locked.',
      'Lower the bar under control until it lightly touches your lower-to-mid sternum.',
      'Keep elbows tucked at a 45-to-75 degree angle (avoid flaring out at 90°).',
      'Drive aggressively upward through your chest and triceps to lockout.',
    ],
    breathing: 'Inhale deeply during lowering (eccentric); exhale forcefully while driving upward.',
    commonMistakes: [
      'Flaring elbows out at 90° (creates excessive rotator cuff impingement).',
      'Bouncing the barbell off the chest ribs.',
      'Lifting glutes off the bench during heavy attempts.',
    ],
    proTips: [
      'Keep shoulder blades pinched together throughout the entire set.',
      'Squeeze the barbell as hard as possible to maximize neural activation.',
    ],
    videoSearchUrl: 'https://www.youtube.com/results?search_query=how+to+bench+press+correct+form',
  },
  {
    id: 'ex-2',
    name: 'Barbell Back Squat',
    category: 'Legs',
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Core'],
    equipment: 'Barbell & Squat Rack',
    difficulty: 'Intermediate',
    rating: 5.0,
    summary:
      'The foundational lower-body compound movement for total athletic power and leg development.',
    setup: [
      'Step under bar, resting it across upper trapezius (high bar) or rear delts (low bar).',
      'Set feet shoulder-width apart with toes turned outward 15–30 degrees.',
      'Brace core 360 degrees using diaphragmatic breathing.',
    ],
    execution: [
      'Break simultaneously at hips and knees, sitting down between your thighs.',
      'Keep knees tracking inline with your second and third toes.',
      'Descend until the hip crease dips just below the top of the patella (parallel depth).',
      'Drive powerfully through mid-foot to stand tall, locking hips at the top.',
    ],
    breathing: 'Take a deep breath and brace abdominal wall at the top; exhale after passing the sticking point.',
    commonMistakes: [
      'Knees caving inward (valgus collapse) during the ascent.',
      'Rounding the lumbar spine (butt wink) at the bottom.',
      'Shifting weight onto toes and lifting heels off the ground.',
    ],
    proTips: [
      'Push the floor away with your feet like spreading a carpet.',
      'Keep chest tall and maintain a neutral cervical spine (look ahead, not at ceiling).',
    ],
    videoSearchUrl: 'https://www.youtube.com/results?search_query=how+to+squat+correct+form',
  },
  {
    id: 'ex-3',
    name: 'Conventional Deadlift',
    category: 'Back',
    targetMuscles: ['Erector Spinae', 'Glutes', 'Hamstrings', 'Lats', 'Traps'],
    equipment: 'Barbell & Weight Plates',
    difficulty: 'Advanced',
    rating: 4.9,
    summary:
      'The ultimate posterior chain exercise testing whole-body pulling power and spinal stability.',
    setup: [
      'Position feet hip-width apart with the barbell over the mid-foot (1 inch from shins).',
      'Hinge at hips, reach down and grip the bar just outside of your legs.',
      'Pull chest up, drop hips slightly, and pull the slack out of the barbell.',
    ],
    execution: [
      'Engage lats by picturing squeezing oranges under your armpits.',
      'Push the floor away with your legs while keeping the bar in contact with your shins.',
      'Once the bar clears knees, thrust hips forward to stand erect with neutral spine.',
      'Lower under control by hinging at the hips first, then bending knees once past kneecaps.',
    ],
    breathing: 'Brace tightly before initiating pull; exhale once standing tall.',
    commonMistakes: [
      'Rounding the lower back when pulling from the floor.',
      'Yanking the bar violently instead of pulling out the slack first.',
      'Hyperextending spine backward at lockout.',
    ],
    proTips: [
      'Think of the deadlift as pushing the world away rather than pulling the bar.',
      'Keep the barbell glued to your body across the entire trajectory.',
    ],
    videoSearchUrl: 'https://www.youtube.com/results?search_query=how+to+deadlift+correct+form',
  },
  {
    id: 'ex-4',
    name: 'Push-Up (Strict Form)',
    category: 'Chest',
    targetMuscles: ['Chest', 'Triceps', 'Anterior Deltoid', 'Core'],
    equipment: 'Bodyweight',
    difficulty: 'Beginner',
    rating: 4.8,
    summary:
      'The essential calisthenics movement for chest definition, shoulder health, and serratus strength.',
    setup: [
      'Place hands slightly wider than shoulder-width directly below shoulders.',
      'Form a rigid plank from head to heels with glutes and abs squeezed tight.',
    ],
    execution: [
      'Lower your chest toward the floor by bending elbows back at 45 degrees.',
      'Descend until your chest is approximately 1 inch off the ground.',
      'Press through full palms to return to the starting plank position.',
    ],
    breathing: 'Inhale on the descent; exhale firmly as you press up.',
    commonMistakes: [
      'Sagging hips or piking glutes up in the air.',
      'Flaring elbows perpendicular to torso (shoulder stress).',
      'Partial range of motion without reaching chest near floor.',
    ],
    proTips: [
      'Corkscrew your hands into the ground to externally rotate shoulders.',
      'Keep your gaze slightly forward to preserve a neutral neck.',
    ],
    videoSearchUrl: 'https://www.youtube.com/results?search_query=how+to+do+a+pushup+correct+form',
  },
  {
    id: 'ex-5',
    name: 'Overhead Barbell Shoulder Press',
    category: 'Shoulders',
    targetMuscles: ['Anterior & Lateral Deltoids', 'Triceps', 'Upper Chest', 'Core'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    rating: 4.8,
    summary:
      'Builds massive, 3D boulder shoulders and functional overhead locking strength.',
    setup: [
      'Stand tall with feet hip-width apart and grip bar just outside shoulders.',
      'Rest barbell across collarbones with elbows slightly in front of the bar.',
      'Squeeze glutes and brace core to prevent hyperextending lower back.',
    ],
    execution: [
      'Tilt head slightly back to clear the path for the barbell.',
      'Press the bar vertically in a straight path overhead.',
      'Once the bar clears forehead, shift head forward to neutral and lock out bar over shoulders.',
      'Lower bar smoothly back to collarbone rack position.',
    ],
    breathing: 'Inhale and brace at the bottom; exhale as the bar reaches full overhead lockout.',
    commonMistakes: [
      'Excessive backward lean into a pseudo-incline bench press.',
      'Pressing the bar in a wide looping forward arc.',
    ],
    proTips: [
      'Keep forearms strictly vertical under the bar at the start of every rep.',
      'Shrug upper traps slightly at the very top of lockout for joint stability.',
    ],
    videoSearchUrl: 'https://www.youtube.com/results?search_query=how+to+overhead+press+correct+form',
  },
  {
    id: 'ex-6',
    name: 'Pull-Up & Chin-Up',
    category: 'Back',
    targetMuscles: ['Latissimus Dorsi', 'Biceps', 'Rhomboids', 'Rear Delts'],
    equipment: 'Pull-Up Bar',
    difficulty: 'Intermediate',
    rating: 4.9,
    summary:
      'The benchmark bodyweight test for V-taper back width, lat activation, and grip resilience.',
    setup: [
      'Grip the bar overhand (Pull-up) or underhand (Chin-up) slightly wider than shoulders.',
      'Hang with arms fully extended into a dead hang with core engaged.',
    ],
    execution: [
      'Depress and retract scapulae (pull shoulder blades down and back).',
      'Drive elbows down toward your back pockets while pulling chest up to the bar.',
      'Continue pulling until chin clears the bar cleanly without craning your neck.',
      'Lower under strict 2-second eccentric control to a full stretch dead hang.',
    ],
    breathing: 'Exhale as you pull your chest to the bar; inhale steadily on the descent.',
    commonMistakes: [
      'Kicking legs or kipping body for momentum.',
      'Failing to reach full extension at the bottom of the rep.',
    ],
    proTips: [
      'Focus on pulling your elbows to your ribs rather than pulling with your forearms.',
      'Cross your ankles and squeeze glutes to eliminate swing.',
    ],
    videoSearchUrl: 'https://www.youtube.com/results?search_query=how+to+pull+up+correct+form',
  },
  {
    id: 'ex-7',
    name: 'Dumbbell Incline Bicep Curl',
    category: 'Arms',
    targetMuscles: ['Biceps Brachii (Long Head & Short Head)', 'Brachialis'],
    equipment: 'Dumbbells & Incline Bench',
    difficulty: 'Beginner',
    rating: 4.8,
    summary:
      'Places the long head of the biceps under deep stretch for unmatched bicep peak development.',
    setup: [
      'Set incline bench to 45–60 degrees and sit back with dumbbells hanging straight down.',
      'Palms face forward or neutral, keeping shoulders pinned against the pad.',
    ],
    execution: [
      'Curl dumbbells upward while supinating wrists (turn pinky fingers outward).',
      'Squeeze biceps hard at peak contraction without lifting elbows forward.',
      'Lower under a controlled 3-second eccentric to a full active stretch at the bottom.',
    ],
    breathing: 'Exhale during curl up; inhale smoothly on the controlled descent.',
    commonMistakes: [
      'Swinging shoulders forward to gain momentum.',
      'Cutting the bottom range of motion short.',
    ],
    proTips: [
      'Keep elbows stationary behind torso throughout the entire movement.',
    ],
    videoSearchUrl: 'https://www.youtube.com/results?search_query=how+to+incline+dumbbell+curl+form',
  },
  {
    id: 'ex-8',
    name: 'Bulgarian Split Squat',
    category: 'Legs',
    targetMuscles: ['Quadriceps', 'Gluteus Medius & Maximus', 'Hamstrings'],
    equipment: 'Bench & Dumbbells / Bodyweight',
    difficulty: 'Intermediate',
    rating: 4.9,
    summary:
      'The single most potent unilateral leg builder for fixing muscle imbalances and building quad sweep.',
    setup: [
      'Stand 2 feet in front of a bench and place the laces of one foot on the bench behind you.',
      'Front foot planted firmly on the floor with torso upright or slight forward lean.',
    ],
    execution: [
      'Lower rear knee down toward the floor until front thigh is parallel to ground.',
      'Ensure front knee remains tracking over toes without caving.',
      'Drive forcefully through the front heel and mid-foot to return to top position.',
    ],
    breathing: 'Inhale descending; exhale driving through front leg.',
    commonMistakes: [
      'Pushing too much weight onto rear foot instead of loading front working leg.',
      'Excessive arch in lower back.',
    ],
    proTips: [
      'Lean torso forward 15° to recruit more glute, or stay upright for quad focus.',
    ],
    videoSearchUrl: 'https://www.youtube.com/results?search_query=how+to+bulgarian+split+squat+form',
  },
];

const CATEGORIES = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Bodyweight'];

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalExercise, setActiveModalExercise] = useState<GoogleExerciseGuide | null>(null);

  const filteredExercises = useMemo(() => {
    return GOOGLE_EXERCISES_DATABASE.filter((ex) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        ex.category.toLowerCase() === selectedCategory.toLowerCase() ||
        (selectedCategory === 'Bodyweight' && ex.equipment.toLowerCase().includes('bodyweight'));
      const matchesSearch =
        ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.targetMuscles.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase())) ||
        ex.equipment.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20 animate-in fade-in duration-300">
      {/* 1. TOP HEADER */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
            Discover
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Popular workouts, muscle collections, and certified Google correct form guides.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-800 text-foreground">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-rose-500 text-[9px] font-black text-white">
              9+
            </span>
          </div>
        </div>
      </div>

      {/* 2. POPULAR EXERCISES SECTION (Matching Screen 2 of Reference) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-foreground">
            Popular Exercises
          </h2>
          <span className="text-xs font-semibold text-primary cursor-pointer hover:underline">
            See more →
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {POPULAR_WORKOUTS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedCategory(item.category.includes('Chest') ? 'Chest' : item.category.includes('Forearm') ? 'Arms' : 'All')}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.gradient} p-4 sm:p-5 text-white flex flex-col justify-between shadow-lg cursor-pointer transition-transform duration-200 hover:-translate-y-1`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md">
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full text-[11px] font-bold border border-white/10">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span>{item.rating}</span>
                  </div>
                </div>

                <div className="pt-8 space-y-1">
                  <h3 className="text-base sm:text-lg font-black tracking-tight leading-tight group-hover:text-amber-200 transition">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-white/80 font-medium">
                    {item.exerciseCount} Exercises
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. OUR COLLECTION SECTION (Matching Screen 2 of Reference) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-foreground">
            Our Collection
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {OUR_COLLECTIONS.map((col) => (
            <div
              key={col.id}
              onClick={() => setSelectedCategory(col.tag.includes('Chest') ? 'Chest' : col.tag.includes('V-Taper') ? 'Back' : col.tag.includes('Lower') ? 'Legs' : 'Arms')}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-r ${col.bgGradient} border ${col.border} p-5 text-white flex items-center justify-between shadow-md cursor-pointer transition hover:border-primary/50`}
            >
              <div className="space-y-1.5 max-w-[70%]">
                <Badge className="bg-white/10 text-white border-0 text-[10px] font-bold">
                  {col.tag}
                </Badge>
                <h3 className="text-base sm:text-lg font-black tracking-tight leading-snug">
                  {col.title}
                </h3>
                <p className="text-[11px] text-zinc-400 line-clamp-1">
                  {col.muscles}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary pt-1">
                  <Dumbbell className="h-3.5 w-3.5" />
                  <span>{col.exerciseCount} Exercises</span>
                </span>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800/80 border border-zinc-700 text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition">
                <ChevronRight className="h-5 w-5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. GOOGLE EXERCISE & CORRECT FORM DATABASE SECTION */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-foreground">
                Google Certified Form Guides
              </h2>
            </div>
            <p className="text-xs text-muted-foreground">
              Step-by-step biomechanical execution cues, breathing techniques, and common injury pitfalls.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search exercise, muscle..."
              className="pl-9 h-10 rounded-xl bg-zinc-900 border-zinc-800 text-xs text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
            />
          </div>
        </div>

        {/* Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
                  : 'bg-zinc-900 text-muted-foreground hover:bg-zinc-800 hover:text-foreground border border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Exercises Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredExercises.map((exercise) => (
            <Card
              key={exercise.id}
              className="rounded-2xl bg-zinc-900/90 border-zinc-800 hover:border-zinc-700 transition shadow-md overflow-hidden flex flex-col justify-between"
            >
              <CardHeader className="p-4 pb-2 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] font-bold border-primary/30 text-primary bg-primary/10">
                      {exercise.category}
                    </Badge>
                    <Badge variant="secondary" className="text-[10px] font-semibold text-muted-foreground">
                      {exercise.difficulty}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span>{exercise.rating}</span>
                  </div>
                </div>

                <CardTitle className="text-base font-extrabold text-foreground">
                  {exercise.name}
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground line-clamp-2">
                  {exercise.summary}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-4 pt-2 space-y-3">
                {/* Target Muscle Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {exercise.targetMuscles.map((muscle) => (
                    <span
                      key={muscle}
                      className="px-2 py-0.5 rounded-md bg-zinc-800 text-[10px] font-medium text-zinc-300"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>

                {/* Key Form Checkpoint Highlight */}
                <div className="rounded-xl bg-zinc-950/70 border border-zinc-800/80 p-2.5 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Correct Form Checkpoint:</span>
                  </div>
                  <p className="text-[11px] text-zinc-300 pl-5">
                    {exercise.execution[1] || exercise.execution[0]}
                  </p>
                </div>

                {/* Modal Trigger & YouTube Video Link */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <Button
                    onClick={() => setActiveModalExercise(exercise)}
                    size="sm"
                    className="flex-1 rounded-xl text-xs font-bold gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-foreground border border-zinc-700"
                  >
                    <Info className="h-3.5 w-3.5 text-primary" />
                    <span>View Correct Form</span>
                  </Button>

                  <a
                    href={exercise.videoSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/15 border border-rose-500/20 text-rose-400 hover:bg-rose-500/25 transition shrink-0"
                    title="Watch YouTube Form Demonstration"
                  >
                    <Play className="h-4 w-4 fill-current ml-0.5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 5. INTERACTIVE CORRECT FORM MODAL */}
      {activeModalExercise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-zinc-950 border border-zinc-800 p-6 shadow-2xl space-y-5 text-foreground">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary/20 text-primary border-primary/30 text-xs font-bold">
                    {activeModalExercise.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Equipment: {activeModalExercise.equipment}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-foreground">
                  {activeModalExercise.name}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalExercise(null)}
                aria-label="Close modal"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-muted-foreground hover:text-white transition"
              >
                ✕
              </button>
            </div>

            {/* Setup Instructions */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                <span>1. Setup & Starting Posture</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-zinc-300">
                {activeModalExercise.setup.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Execution Instructions */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>2. Lifting Execution & Range of Motion</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-zinc-300">
                {activeModalExercise.execution.map((e, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Breathing Technique */}
            <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-3.5 text-xs space-y-1">
              <span className="font-bold text-foreground block">Breathing Protocol</span>
              <p className="text-muted-foreground">{activeModalExercise.breathing}</p>
            </div>

            {/* Common Mistakes */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <XCircle className="h-3.5 w-3.5" />
                <span>3. Common Mistakes to Avoid (Google Form Check)</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-zinc-300">
                {activeModalExercise.commonMistakes.map((m, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-rose-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Video Button */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <a
                href={activeModalExercise.videoSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg transition"
              >
                <Play className="h-4 w-4 fill-current" />
                <span>Watch Certified Video Demonstration</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <Button
                onClick={() => setActiveModalExercise(null)}
                variant="outline"
                className="h-11 rounded-xl font-bold text-xs border-zinc-700"
              >
                Got It
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
